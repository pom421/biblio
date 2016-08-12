import {Injectable} from '@angular/core';
//import 'pouchdb';
import PouchDB = require('pouchdb');

// PouchDB et getAllBooks sont mis dans la portée globale pour permettre le debug
// function getAllBooks() {
//   return BookPersistance.db.allDocs({ include_docs: true }).then(docs => {
//     console.log(docs);
//   })
// }

// window["PouchDB"] = PouchDB;
// window["getAllBooks"] = getAllBooks;


@Injectable()
export class BookPersistance {
  static db;
  books: any;

  constructor() {
    console.log('dans le constructeur de BookPersistance')
  }

  initDB() {
    if (!BookPersistance.db) {
      BookPersistance.db = new PouchDB('books', { adapter: 'websql' });
      console.log('Base de donnée PouchDB chargée', BookPersistance.db);
      //http://stackoverflow.com/questions/27980987/pouchdb-not-detecting-sqlite-plugin-using-cordova
      console.log('Information sur la base PouchDB');
      BookPersistance.db.info().then(console.log.bind(console));
    }
    else {
      console.log('Base de donnée PouchDB déjà instanciée');
    }
  }

  add(book) {
    return BookPersistance.db.post(book);
  }

  getAll() {
    if (!this.books) {
      BookPersistance.db.allDocs({ include_docs: true }).then(docs => {
        this.books = docs;
      });

      return this.books;

    } else {
      return this.books;
    }
  }

}
