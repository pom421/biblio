import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the DebugDetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/debug-details/debug-details.html',
})
export class DebugDetailsPage {
  item: any;

  constructor(private nav: NavController,
    private navParams: NavParams) {
      this.item = navParams.get('item');
  }

  showSrc(){
    const alert = AlertController.create({
      title: 'Source du thumbnail',
      subTitle: this.item.doc.thumbnail,
      buttons: ['OK']
    });

    alert.present();
  }

}