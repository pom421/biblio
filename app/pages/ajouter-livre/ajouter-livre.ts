import {Component} from '@angular/core';
import {Constants} from '../../constants';
import {NavController, Loading, Alert} from 'ionic-angular';
import {BarcodeScanner} from 'ionic-native';
import {BookService} from '../../services/BookService';
import {Book} from '../../models/Book.ts'

@Component({
  templateUrl: 'build/pages/ajouter-livre/ajouter-livre.html',
  providers: [Constants, BookService]
})
export class AjouterLivrePage {
  book: Book;
  // spinner
  loading: any;

  constructor(private nav: NavController, private constants: Constants, private bookService: BookService) {
  }

  spinner(){
    let loading = Loading.create({
      content: 'Chargement...',
      duration: 3000
    });

    this.nav.present(loading);

  }

  scan() {
    // on remet le titre à undefined pour que l'affichage précédent disparaisse
    this.book = undefined;

    let loading = Loading.create({
      content: 'Chargement...',
      duration: 5000
    });
    
    this.nav.present(loading);

    let alert = Alert.create({
      title: 'Barcode non reconnu',
      subTitle: 'Ce barcode ne semble pas correspondre à un livre disponible sur Google Book.',
      buttons: ['OK']
    });

    BarcodeScanner.scan().then((barcodeData) => {
      console.log('on trouve ', barcodeData)
      this.bookService.searchBook(barcodeData.text).subscribe(
        data => {
          loading.dismiss();
          this.book = data;

          console.log('on trouv epour this.book', this.book)

          if (data.totalItems == 0) {
            this.book = undefined;
            this.nav.present(alert);
          }
          else {
            //http://www.gajotres.net/ionic-2-making-rest-http-requests-like-a-pro/
            this.book.authors = data.items[0].volumeInfo.authors;
            this.book.publisher = data.items[0].volumeInfo.publisher;
            this.book.title = data.items[0].volumeInfo.title;
            this.book.description = data.items[0].volumeInfo.description;
            this.book.date = data.items[0].volumeInfo.publishedDate;
            if (data.items[0].volumeInfo.industryIdentifiers.length > 0) {
              for (let temp of data.items[0].volumeInfo.industryIdentifiers) {
                if (temp.type === "ISBN_13") {
                  this.book['isbn-13'] = data.items[0].volumeInfo.industryIdentifiers[1].identifier // if data.items[0].volumeInfo.industryIdentifiers[0].type === "ISBN_13"
                }
                else if (temp.type === "ISBN_10") {
                  this.book['isbn-10'] = data.items[0].volumeInfo.industryIdentifiers[0].identifier // if data.items[0].volumeInfo.industryIdentifiers[0].type === "ISBN_10"
                }
              }
            }
            if (data.items[0].volumeInfo.imageLinks) {
              this.book.smallThumbnail = data.items[0].volumeInfo.imageLinks.smallThumbnail
              this.book.thumbnail = data.items[0].volumeInfo.imageLinks.thumbnail
            }
            this.book.pageCount = data.items[0].volumeInfo.pageCount
          }
        },
        err => {
          console.log(err);
        },
        () => console.log('Book Search Complete')
      );
    }, (err) => {
      console.error('une erreur est interceptée', err)
    });
  }

}