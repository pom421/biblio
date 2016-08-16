import {Component} from '@angular/core';
import {Constants} from '../../constants';
import {Alert, Loading, NavController, Toast} from 'ionic-angular';
import {BarcodeScanner, Connection, Network} from 'ionic-native';
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

    // mauvais pattern pour de l'asynchrone
    // this.book = this.bookService.searchBook(this.isbn);

    // version avec callback
    // this.bookService.searchBook(this.isbn, book => this.book = book);

    // version avec promesse
    this.bookService.searchBook(this.isbn).then(book => {
        loading.dismiss();

        if (!book) {
          const alert = Alert.create({
            title: 'Barcode non reconnu',
            subTitle: 'Ce barcode ne semble pas correspondre à un livre disponible sur Google Book.',
            buttons: ['OK']
          });
          this.nav.present(alert);
        }
        else{
          this.book = Book.load(book);
        }
      }).catch(err => {
        loading.dismiss();
        console.error(err);
      });
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
    // tag par défaut, pourra être changé plus tard par l'utilisateur
    book.tag = 'possede';
    this.bookPersistance.add(book).then(res => {
      console.log('Résultat de l\'ajout du livre', res);
      const toast = Toast.create({
      message: 'Livre ajouté à votre bibliothèque',
      duration: 1500
    })

    this.nav.present(toast);

    }).catch(err => console.error);
  }

  private getBooks(){

  }
}