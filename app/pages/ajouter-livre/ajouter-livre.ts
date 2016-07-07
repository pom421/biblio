import {Component} from '@angular/core';
import {Constants} from '../../constants';
import {NavController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/ajouter-livre/ajouter-livre.html',
  providers: [Constants]
})
export class AjouterLivrePage{

  constructor(private navController: NavController, private constants: Constants){

  }

}