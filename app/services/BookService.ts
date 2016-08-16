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

    static get parameters() {
        return [[Http]];
    }

    constructor(private http: Http) { }

    searchBook(isbn): Promise<Book> {
        var url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${encodeURI(isbn)}&key=${Constants.APIKEY}`;
        console.log(`URL Google Book API utilisée ${url}`);

        return this.http.get(url)
            .toPromise()
            .then(res => {
                console.log('Informations livre scanné', res.json());
                return res.json()})
            .catch(this.handleError);
    }

    private handleError(error: any){
        console.error('Scan erreur', error);
        return Promise.reject(error.message || error);
    }

}