import {Component} from '@angular/core';
import {Constants} from '../../constants';
import {NavController, Loading, Alert} from 'ionic-angular';
import {BarcodeScanner, Network, Connection} from 'ionic-native';
import {BookService} from '../../services/BookService';
import {Book} from '../../models/Book.ts'

@Component({
  templateUrl: 'build/pages/ajouter-livre/ajouter-livre.html',
  providers: [Constants, BookService]
})
export class AjouterLivrePage {
  book: Book;
  isbn: string;

  constructor(private nav: NavController, private constants: Constants, private bookService: BookService) { }

  searchBook() {
    // on efface le book pour que l'affichage précédent disparaisse
    this.book = undefined;

    this.bookService.searchBook(this.isbn).subscribe(
      data => {
        console.log('book = ', this.book)

        if (data.totalItems == 0) {
          let alert = Alert.create({
            title: 'Barcode non reconnu',
            subTitle: 'Ce barcode ne semble pas correspondre à un livre disponible sur Google Book.',
            buttons: ['OK']
          });
          this.nav.present(alert);
        }
        else {
          this.book = data;
          this.book = Book.load(data);
        }
      },
      err => {
        console.log(err);
      },
      () => console.log('Recherche du livre complétée')
    );
  }

  private checkNetwork() {
    if (Constants.NETWORK_OK.indexOf(Network.connection) === -1) {
      let alert = Alert.create({
        title: 'Connexion réseau impossible',
        subTitle: 'Vous devez être connecté au réseau pour pouvoir scanner un barcode.',
        buttons: ['OK']
      });
      this.nav.present(alert);
      return false;
    }
    return true;
  }

  scan() {
    if (!this.checkNetwork()) {
      return;
    }

    let loading = Loading.create({
      content: 'Chargement...',
    });

    this.nav.present(loading);

    BarcodeScanner.scan().then((barcodeData) => {
      loading.dismiss();
      this.isbn = barcodeData.text;
      this.searchBook();

    }, (err) => {
      loading.dismiss();
      console.error('une erreur est interceptée', err)
    });
  }

}