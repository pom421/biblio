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
    
    // récupération du selectedItem de la page précédente MesLivresPage
    this.selectedItem = navParams.get('item');
    this.filterOptionsAlert = {
      title: "Catégorie",
    }

    console.log('item', this.selectedItem)
    console.log('index LivreDetailsPage', this.viewController.index);
  }

  // récupération d'une image plus grande à partir de la petite image (à priori plus utilisé depuis l'utilisation de Google Book API)
  urlLargerImg(item) {
    return (item.smallThumbnail ? item.smallThumbnail.replace(/_SS100_\.jpg$/, '_SX350_BO1,204,203,200_.jpg') : '');
  }

  // modification du favori du livre en base
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

  // modification du livre
  private upd(item) {
    this.bookPersistance.upd(item);
  }

}
