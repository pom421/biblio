import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {BookPersistance} from '../../services/BookPersistance'
import {Book} from '../../models/Book'
import {DebugDetailsPage} from '../debug-details/debug-details'

/*
  Generated class for the DebugPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/debug/debug.html',
})
export class DebugPage {
  items: Array<any>;

  constructor(private nav: NavController,
    private bookPersistance: BookPersistance) {

      bookPersistance.getAll(books => {
        this.items = books
      });
  }

  selectItem(item){
   this.nav.push(DebugDetailsPage, {
     item: item
   }) 
  }

}
