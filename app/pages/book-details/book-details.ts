import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Constants} from '../../constants'

@Component({
  templateUrl: 'build/pages/book-details/book-details.html',
  providers: [Constants]
})
export class BookDetailsPage {
  selectedItem: any;

  constructor(private nav: NavController, navParams: NavParams, private constants: Constants) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
  }

  urlLargerImg(item){
    return item.imageUrl.replace(/_SS100_\.jpg$/, '_SX350_BO1,204,203,200_.jpg');
  }

}
