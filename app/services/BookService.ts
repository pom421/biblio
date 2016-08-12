import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Constants} from '../constants';
import {Book} from '../models/Book'
  
/**
 * Classe d'appel du WS Google Book API
 */
@Injectable()
export class BookService {
    // cache des livres
    private books;

    static get parameters() {
        return [[Http]];
    }
  
    constructor(private http:Http) { }
  
    searchBook(isbn): Book {
        //var url = 'http://api.themoviedb.org/3/search/movie?query=&query=' + encodeURI(movieName) + '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
        var url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${ encodeURI(isbn) }&key=${ Constants.APIKEY }`;
        console.log(`URL Google Book API utilisée ${ url }`);

        let res;

        this.http.get(url)
            .toPromise()
            .then(response => res = response.json().data as Book)
            .catch(this.handleError);
            
        return res;
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}