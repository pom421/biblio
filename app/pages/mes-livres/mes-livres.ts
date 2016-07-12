import {Component} from '@angular/core';
import {NavController, NavParams, Toast} from 'ionic-angular';
import {LivreDetailsPage} from '../livre-details/livre-details';
import {Constants} from '../../constants'

@Component({
  templateUrl: 'build/pages/mes-livres/mes-livres.html',
  providers: [Constants]
})
export class MesLivresPage {
  items: Array<{title: string, author: string, date: string, imageUrl: string, favorite: boolean, tag: string}>;
  // la requête dans le moteur de recherche
  query: string;
  // le filtre éventuellement sélectionné
  selectedFilter: string;
  // les options de la fenêtre d'alerte 
  filterOptionsAlert: any;
  // le filtre sur les favoris uniquement
  favoritesOnly: boolean;

  constructor(private nav: NavController, navParams: NavParams, private constants: Constants) {
    this.initializeItems();
    this.filterOptionsAlert = {
      title: "Catégorie",
    }
    this.favoritesOnly = false;
  }

  // données de test
  private initializeItems(): void{
    this.items = [
      {
        title: "Jazz piano concepts & techniques",
        author: "John Valerio",
        date: "1998",
        imageUrl: "https://images-eu.ssl-images-amazon.com/images/I/51pHa%2BiqZGL._SS100_.jpg",
        favorite: false,
        tag: "idee-cadeau"
      }, 
      {
        title: "La confrérie des éveillés",
        author: "Jacques Attali",
        date: "2006",
        imageUrl: "https://images-eu.ssl-images-amazon.com/images/I/517y9kwvOeL._SS100_.jpg",
        favorite: false,
        tag: "a-vendre"
      },
      {
        title: "Orage d'acier",
        author: "Ernst Jünger",
        date: "2002",
        imageUrl: "https://images-eu.ssl-images-amazon.com/images/I/41KLqOoG4cL._SS100_.jpg",
        favorite: true,
        tag: "possede"
      },
      {
        title: "Bienvenue au club",
        author: "Johnatan Coe",
        date: "2004",
        imageUrl: "https://images-eu.ssl-images-amazon.com/images/I/51nClspGIEL._SS100_.jpg",
        favorite: false,
        tag: "possede"
      },
      {
        title: "Ça",
        author: "Stephen King",
        date: "2002",
        imageUrl: "https://images-eu.ssl-images-amazon.com/images/I/51Gn%2Be0uAVL._SS100_.jpg",
        favorite: true,
        tag: "a-vendre"
      }, 
      {
        title: "Le jour des triffides",
        author: "John Wyndham",
        date: "2007",
        imageUrl: "https://images-eu.ssl-images-amazon.com/images/I/51GKAuci--L._SS100_.jpg",
        favorite: true,
        tag: "possede"
      },
      {
        title: "Le troisième chimpanzé: Essai sur l'évolution et l'avenir de l'animal humain",
        author: "Jared Diamond",
        date: "2011",
        imageUrl: "https://images-eu.ssl-images-amazon.com/images/I/51k7n-PEvCL._SS100_.jpg",
        favorite: false,
        tag: "idee-cadeau"
      },
      {
        title: "Cujo",
        author: "Stephen King",
        date: "1983",
        imageUrl: "https://images-eu.ssl-images-amazon.com/images/I/519yvrnYP2L._SS100_.jpg",
        favorite: false,
        tag: "a-vendre"
      },
    ];
  }

  // fonction de filtre en fonction du filtre catégorie, de l'affichage uniquement des favoris et de l'éventuel requête
  private filterFunction(item): boolean{
    const query = this.query ? this.query : "";
    return item.tag === (this.selectedFilter ? this.selectedFilter : item.tag) &&
        item.favorite === (this.favoritesOnly ? true : item.favorite) &&
        item.title.toLowerCase().indexOf(query.toLowerCase()) > -1;
  }

  // filtre à partir du moteur de recherche
  private getItems(event): void{
    this.initializeItems();

    this.query = event.target.value;

    // if the value is an empty string don't filter the items
    //if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return this.filterFunction(item);
      })
    //}
  }

  // navigation sur la page des détails
  private itemTapped(event, item): void{
    this.nav.push(LivreDetailsPage, {
      item: item
    });
  }

  // permet de récupérer l'url d'une grande image d'Amazon à partir d'une petite
  private getUrl(url): string{
    return url.replace(/_SS100_\.jpg$/, '_SX350_BO1,204,203,200_.jpg')
  }

  // méthode d'affichage avec filtres éventuels
  private filter(): void{
    this.initializeItems();
    this.items = this.items.filter((item) => {
        return this.filterFunction(item);
    })
  }

  private clickTag(tag: string): void{
      this.selectedFilter = tag;
      this.filter();
  }

  private resetFilters(): void{
    this.selectedFilter = undefined;
    this.filter();
  }

  private resetFavoritesOnly(): void{
    this.favoritesOnly = undefined;
    this.filter();
  }

  // mise en favori ou inversement (attention : cette modification n'est pas persistée pour l'instant 
  // affichage d'un toast pour l'exemple
  private toggleFavorite(item): void{
    item.favorite = !item.favorite;

    const msg = item.favorite ? 'Vous avez ajouté un favori' : 'Vous avez supprimé un favori';

    const toast = Toast.create({
      message : msg,
      duration: 1500
    })

    this.nav.present(toast);
  }
}
