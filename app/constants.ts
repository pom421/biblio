import {Injectable} from '@angular/core';
import {Connection} from 'ionic-native';

// Toutes les constantes de l'application
@Injectable()
export class Constants {
  // les filtres par catégorie
  categories: any;
  // Clé d'API pour le WS Google Book API
  static APIKEY = 'AIzaSyCGFRV46y5dGqtjNCDEAigGX725UU-Cy8s';
  static NETWORK_OK: Array<Connection> =  [Connection.ETHERNET, Connection.WIFI, Connection.CELL, Connection.CELL_2G, Connection.CELL_3G, Connection.CELL_4G];

  constructor(){
    this.categories = {
      "possede": "Possède",
      "a-vendre": "À vendre",
      "idee-cadeau": "Idée cadeau"
    }
  }

}

