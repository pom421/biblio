import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import {BookPersistance} from '../../services/BookPersistance';

/*
  Generated class for the SupprimerLivresPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/supprimer-livres/supprimer-livres.html',
})
export class SupprimerLivresPage {

  constructor(private nav: NavController, 
    private bookPersistance: BookPersistance,
    private toastController: ToastController) {

  }

  deleteBooks(){
    console.log('Attention : vous voulez supprimer tous les livres!!')
    this.bookPersistance.deleteAll()

    const toast = this.toastController.create({
      message: "Vos livres ont bien été supprimés",
      duration: 2000
    });

    toast.present();
  }

}
