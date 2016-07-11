// Toutes les constantes de l'application
export class Constants {
  // les filtres par catégorie
  categories: any;
  // Clé d'API pour le WS Google Book API
  static APIKEY = 'AIzaSyCGFRV46y5dGqtjNCDEAigGX725UU-Cy8s';

  constructor(){
    this.categories = {
      "possede": "Possède",
      "a-vendre": "À vendre",
      "idee-cadeau": "Idée cadeau"
    }
  }

}

