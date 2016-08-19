import {Component} from '@angular/core';
import {NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
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
    private bookPersistance: BookPersistance,
    private toastController: ToastController,
    private viewController: ViewController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.filterOptionsAlert = {
      title: "Catégorie",
    }

    console.log('item', this.selectedItem)
    console.log('index LivreDetailsPage', this.viewController.index);
    
  }

  urlLargerImg(item) {
    return (item.smallThumbnail ? item.smallThumbnail.replace(/_SS100_\.jpg$/, '_SX350_BO1,204,203,200_.jpg') : '');
  }

  private toggleFavorite(item): void {
    item.favorite = !item.favorite;
    const msg = item.favorite ? 'Vous avez ajouté un favori' : 'Vous avez supprimé un favori';

    this.bookPersistance.upd(item).then(res => {
      const toast = this.toastController.create({
        message: msg,
        duration: 1500
      });
      toast.present();
    }).catch(err => {
      const toast = this.toastController.create({
        message: "Erreur technique, désolé...",
        duration: 1500
      });
    });

  }
}
