import {Component} from '@angular/core';
import {Constants} from '../../constants';
import {NavController, Loading, Alert} from 'ionic-angular';
import {BarcodeScanner, Network, Connection} from 'ionic-native';
import {BookService} from '../../services/BookService';
import {BookPersistance} from '../../services/BookPersistance';
import {Book} from '../../models/Book.ts';

@Component({
  templateUrl: 'build/pages/ajouter-livre/ajouter-livre.html',
  providers: [Constants]
})
export class AjouterLivrePage {
  book: Book;
  isbn: string;

  constructor(private nav: NavController, 
    private constants: Constants, 
    private bookService: BookService,
    private bookPersistance: BookPersistance) { }

  private searchBook() {
    if (!this.checkNetwork()) {
      return;
    }

    // on efface le book pour que l'affichage précédent disparaisse
    this.book = null;

    const loading = Loading.create({
      content: 'Chargement...',
    });
    this.nav.present(loading);

    this.book = this.bookService.searchBook(this.isbn);

/*
    this.bookService.searchBook(this.isbn).subscribe(
      data => {
        loading.dismiss();

        console.log('book = ', this.book)

        if (data.totalItems == 0) {
          const alert = Alert.create({
            title: 'Barcode non reconnu',
            subTitle: 'Ce barcode ne semble pas correspondre à un livre disponible sur Google Book.',
            buttons: ['OK']
          });
          this.nav.present(alert);
        }
        else {
          //this.book = data;
          this.book = Book.load(data);
        }
      },
      err => {
        loading.dismiss();
        console.log(err);
      },
      () => console.log('Recherche du livre complétée')
    );
  */
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

  private scan() {
    BarcodeScanner.scan().then((barcodeData) => {
      this.isbn = barcodeData.text;
      this.searchBook();
    }, (err) => {
      console.error('une erreur est interceptée', err)
    });
  }

  private addBook(book){
    book.doc.tag = 'possede';
    let res = this.bookPersistance.add(book);
    console.log('Résultat de l\'ajout du livre', res);
  }

  private getBooks(){

  }
}