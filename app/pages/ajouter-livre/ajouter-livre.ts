import {Component} from '@angular/core';
import {Constants} from '../../constants';
import {NavController} from 'ionic-angular';
import {BarcodeScanner} from 'ionic-native';

@Component({
  templateUrl: 'build/pages/ajouter-livre/ajouter-livre.html',
  providers: [Constants]
})
export class AjouterLivrePage{

  constructor(private navController: NavController, private constants: Constants){

  }

  scan(){
    BarcodeScanner.scan().then((barcodeData) => {
      console.log('on trouve ', barcodeData)
    }, (err) => {
      console.error('une erreur est interceptée', err)
    });
  }

}