import {Component} from '@angular/core';
import {NavController, NavParams, Platform, ToastController, ViewController} from 'ionic-angular';
import {LivreDetailsPage} from '../livre-details/livre-details';
import {Constants} from '../../constants'
import {BookService} from '../../services/BookService'
import {BookPersistance} from '../../services/BookPersistance'
import {Book} from '../../models/Book'

@Component({
  templateUrl: 'build/pages/mes-livres/mes-livres.html',
  providers: [Constants]
})
export class MesLivresPage {
  //items: Array<{ title: string, authors: Array<string>, date: string, smallThumbnail: string, favorite: boolean, tag: string }>;
  items: Array<any>;

  // la requête dans le moteur de recherche
  query: string;
  // le filtre éventuellement sélectionné
  selectedFilter: string;
  // les options de la fenêtre d'alerte 
  filterOptionsAlert: any;
  // le filtre sur les favoris uniquement
  favoritesOnly: boolean;
  // affichage ou non du panneau des filtres
  displayFilters: boolean = false;

  constructor(private nav: NavController,
    private navParams: NavParams,
    private constants: Constants,
    private platform: Platform,
    private bookService: BookService,
    private bookPersistance: BookPersistance,
    private toastController: ToastController,
    private viewController: ViewController) {
      console.log('Dans MesLivresPage')
      // appel de la fonction de filtre sans rien de renseigner => renvoie tous les livres de la base au démarrage, c'est ce qu'on veut
      this.filter();
      this.filterOptionsAlert = {
        title: "Catégorie",
      }
      this.favoritesOnly = false;
      //console.log('index MesLivresPages', this.viewController.index);
  }

  // fonction de filtre en fonction du filtre catégorie, de l'affichage uniquement des favoris et de l'éventuel requête
  private filterFunction(item): boolean {
    const query = this.query ? this.query : "";
    return item.tag === (this.selectedFilter ? this.selectedFilter : item.tag) &&
      item.favorite === (this.favoritesOnly ? true : item.favorite) &&
      item.title.toLowerCase().indexOf(query.toLowerCase()) > -1;
  }

  // filtre à partir du moteur de recherche
  private getItems(event): void {
    this.query = event.target.value;
    this.bookPersistance.getAll().then(docs => {
      this.items = docs.filter((item) => {
        return this.filterFunction(item);
      });
    })
  }

  // navigation sur la page des détails
  private itemTapped(event, item): void {
    this.nav.push(LivreDetailsPage, {
      item: item
    })
  }

  // permet de récupérer l'url d'une grande image d'Amazon à partir d'une petite
  private getUrl(url): string {
    return url.replace(/_SS100_\.jpg$/, '_SX350_BO1,204,203,200_.jpg')
  }

  // méthode d'affichage avec filtres éventuels
  private filter(): void {
    this.bookPersistance.getAll().then(docs => {
      this.items = docs.filter((item) => {
        return this.filterFunction(item);
      })
    });

    console.log('on trouve pour this.items')
    this.items.forEach(item => {
      console.log(item)
    })
  }

  // quand on clique sur une catégorie, une recherche se fait sur les livres de cette catégorie (raccourci équivalent à un filtre sur les catégories)
  private clickTag(tag: string): void {
    console.log('dans clickTag', tag)
    this.selectedFilter = tag;
    this.displayFilters = true;
    this.filter();
  }

  // pour supprimer les filtres éventuels
  private resetFilters(): void {
    this.selectedFilter = null;
    this.displayFilters = false;
    this.filter();
  }

  // pour supprimer la recherche des favoris
  private resetFavoritesOnly(): void {
    this.favoritesOnly = null;
    this.filter();
  }

  // quand on clique sur l'icône de filtre en haut à droite
  private toggleDisplayFilters(): void {
    console.log('dans displayFilters', this.displayFilters)
    this.selectedFilter = null;
    this.favoritesOnly = null;
    this.displayFilters = !this.displayFilters;
    this.filter();
  }
}
