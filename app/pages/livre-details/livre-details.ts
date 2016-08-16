import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Constants} from '../../constants'

@Component({
  templateUrl: 'build/pages/livre-details/livre-details.html',
  providers: [Constants]
})
export class LivreDetailsPage {
  selectedItem: any;

  constructor(private nav: NavController, navParams: NavParams, private constants: Constants) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    console.log('item', this.selectedItem)
  }

  urlLargerImg(item){
    return (item.smallThumbnail ? item.smallThumbnail.replace(/_SS100_\.jpg$/, '_SX350_BO1,204,203,200_.jpg') : '');
  }

}
