import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Constants} from '../constants'
  
/**
 * Classe d'appel du WS Google Book API
 */
@Injectable()
export class BookService {  
    static get parameters() {
        return [[Http]];
    }
  
    constructor(private http:Http, private constants: Constants) { }
  
    searchBook(isbn) {
        //var url = 'http://api.themoviedb.org/3/search/movie?query=&query=' + encodeURI(movieName) + '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
        var url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${ encodeURI(isbn) }&key=${ Constants.APIKEY }`;
        console.log(`URL Google Book API utilisée ${ url }`);
        return this.http.get(url).map(res => res.json());
    }
}