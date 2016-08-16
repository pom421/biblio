import {Component} from '@angular/core';
import {NavController, NavParams, Platform, Toast} from 'ionic-angular';
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

  constructor(private nav: NavController,
    private navParams: NavParams,
    private constants: Constants,
    private platform: Platform,
    private bookService: BookService,
    private bookPersistance: BookPersistance) {
      console.log('dans mes livres page')
      this.refreshListItems();
      this.filterOptionsAlert = {
        title: "Catégorie",
      }
      this.favoritesOnly = false;
  }

  // données de test
  private refreshListItems(): void {
    console.log('au début de refreshListItems')
    this.bookPersistance.getAll(docs => {
      this.items = docs;
    })
    /*
    if (this.bookPersistance.getAll()) {
      console.log('dans le if de refreshListItems')
      this.items = this.bookPersistance.getAll().rows;
    }
    else {
      console.log('dans le else de refreshListItems')
      this.items = [
        {
          doc: {
            title: "Jazz piano concepts & techniques",
            authors: ["John Valerio"],
            date: "1998",
            smallThumbnail: "https://images-eu.ssl-images-amazon.com/images/I/51pHa%2BiqZGL._SS100_.jpg",
            favorite: false,
            tag: "idee-cadeau"
          }
        },
        {
          doc: {
            title: "La confrérie des éveillés",
            authors: ["Jacques Attali"],
            date: "2006",
            smallThumbnail: "https://images-eu.ssl-images-amazon.com/images/I/517y9kwvOeL._SS100_.jpg",
            favorite: false,
            tag: "a-vendre"
          }
        },
        {
          doc: {
            title: "Orage d'acier",
            authors: ["Ernst Jünger"],
            date: "2002",
            smallThumbnail: "https://images-eu.ssl-images-amazon.com/images/I/41KLqOoG4cL._SS100_.jpg",
            favorite: true,
            tag: "possede"
          }
        },
        {
          doc: {
            title: "Bienvenue au club",
            authors: ["Johnatan Coe"],
            date: "2004",
            smallThumbnail: "https://images-eu.ssl-images-amazon.com/images/I/51nClspGIEL._SS100_.jpg",
            favorite: false,
            tag: "possede"
          }
        },
        {
          doc: {
            title: "Ça",
            authors: ["Stephen King"],
            date: "2002",
            smallThumbnail: "https://images-eu.ssl-images-amazon.com/images/I/51Gn%2Be0uAVL._SS100_.jpg",
            favorite: true,
            tag: "a-vendre"
          }
        },
        {
          doc: {
            title: "Le jour des triffides",
            authors: ["John Wyndham"],
            date: "2007",
            smallThumbnail: "https://images-eu.ssl-images-amazon.com/images/I/51GKAuci--L._SS100_.jpg",
            favorite: true,
            tag: "possede"
          }
        },
        {
          doc: {
            title: "Le troisième chimpanzé: Essai sur l'évolution et l'avenir de l'animal humain",
            authors: ["Jared Diamond"],
            date: "2011",
            smallThumbnail: "https://images-eu.ssl-images-amazon.com/images/I/51k7n-PEvCL._SS100_.jpg",
            favorite: false,
            tag: "idee-cadeau"
          }
        },
        {
          doc: {
            title: "Cujo",
            authors: ["Stephen King"],
            date: "1983",
            smallThumbnail: "https://images-eu.ssl-images-amazon.com/images/I/519yvrnYP2L._SS100_.jpg",
            favorite: false,
            tag: "a-vendre"
          }
        },
      ];
    }*/
  }

  // fonction de filtre en fonction du filtre catégorie, de l'affichage uniquement des favoris et de l'éventuel requête
  private filterFunction(item): boolean {
    const query = this.query ? this.query : "";
    return item.doc.tag === (this.selectedFilter ? this.selectedFilter : item.doc.tag) &&
      item.doc.favorite === (this.favoritesOnly ? true : item.doc.favorite) &&
      item.doc.title.toLowerCase().indexOf(query.toLowerCase()) > -1;
  }

  // filtre à partir du moteur de recherche
  private getItems(event): void {
    this.refreshListItems();

    this.query = event.target.value;

    // if the value is an empty string don't filter the items
    //if (val && val.trim() != '') {
    this.items = this.items.filter((item) => {
      return this.filterFunction(item);
    })
    //}
  }

  // navigation sur la page des détails
  private itemTapped(event, item): void {
    this.nav.push(LivreDetailsPage, {
      item: item
    });
  }

  // permet de récupérer l'url d'une grande image d'Amazon à partir d'une petite
  private getUrl(url): string {
    return url.replace(/_SS100_\.jpg$/, '_SX350_BO1,204,203,200_.jpg')
  }

  // méthode d'affichage avec filtres éventuels
  private filter(): void {
    this.refreshListItems();
    this.items = this.items.filter((item) => {
      return this.filterFunction(item);
    })
  }

  private clickTag(tag: string): void {
    this.selectedFilter = tag;
    this.filter();
  }

  private resetFilters(): void {
    this.selectedFilter = null;
    this.filter();
  }

  private resetFavoritesOnly(): void {
    this.favoritesOnly = null;
    this.filter();
  }

  // mise en favori ou inversement (attention : cette modification n'est pas persistée pour l'instant 
  // affichage d'un toast pour l'exemple
  private toggleFavorite(item): void {
    item.doc.favorite = !item.favorite;

    const msg = item.favorite ? 'Vous avez ajouté un favori' : 'Vous avez supprimé un favori';

    const toast = Toast.create({
      message: msg,
      duration: 1500
    })

    this.nav.present(toast);
  }
}
