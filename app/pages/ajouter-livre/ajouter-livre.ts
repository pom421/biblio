import {Component} from '@angular/core';
import {Constants} from '../../constants';
import {NavController} from 'ionic-angular';
import {BarcodeScanner} from 'ionic-native';
import {BookService} from '../../services/BookService';

@Component({
  templateUrl: 'build/pages/ajouter-livre/ajouter-livre.html',
  providers: [Constants, BookService]
})
export class AjouterLivrePage{
  book: any;

  constructor(private navController: NavController, private constants: Constants, private bookService: BookService){
  }

  scan(){
    BarcodeScanner.scan().then((barcodeData) => {
      console.log('on trouve ', barcodeData)
      this.bookService.searchBook(barcodeData.text).subscribe(
                data => {
                    this.book = data.results; 
                    console.log(data);

                    if (data.totalItems > 0){
/*                      authors = data.items[0].volumeInfo.authors;
                      title = data.items[0].volumeInfo.title;
                      subtitle = data.items[0].volumeInfo.subtitle;
                      description = data.items[0].volumeInfo.description;
                      date = data.items[0].volumeInfo.publishedDate;
                      isbn-10 = data.items[0].volumeInfo.industryIdentifiers[0].identifier // if data.items[0].volumeInfo.industryIdentifiers[0].type === "ISBN_10"
                      isbn-13 = data.items[0].volumeInfo.industryIdentifiers[1].identifier // if data.items[0].volumeInfo.industryIdentifiers[0].type === "ISBN_13"
*/
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