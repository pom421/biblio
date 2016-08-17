import {Component} from '@angular/core';
import {NavController, NavParams, Toast} from 'ionic-angular';
import {Constants} from '../../constants'
import {BookPersistance} from '../../services/BookPersistance'

@Component({
  templateUrl: 'build/pages/livre-details/livre-details.html',
  providers: [Constants]
})
export class LivreDetailsPage {
  selectedItem: any;
  filterOptionsAlert: any;

  constructor(private nav: NavController, 
    navParams: NavParams, 
    private constants: Constants,
    private bookPersistance: BookPersistance) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.filterOptionsAlert = {
      title: "Catégorie",
    }

    console.log('item', this.selectedItem)
  }

  urlLargerImg(item) {
    return (item.doc.smallThumbnail ? item.doc.smallThumbnail.replace(/_SS100_\.jpg$/, '_SX350_BO1,204,203,200_.jpg') : '');
  }

  private toggleFavorite(item): void {
    item.doc.favorite = !item.doc.favorite;

    this.bookPersistance.upd(item);

    const msg = item.doc.favorite ? 'Vous avez ajouté un favori' : 'Vous avez supprimé un favori';

    const toast = Toast.create({
      message: msg,
      duration: 1500
    })

    this.nav.present(toast);
  }

}
