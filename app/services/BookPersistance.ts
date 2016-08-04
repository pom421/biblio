import {Injectable} from '@angular/core';
//import 'pouchdb';
import PouchDB = require('pouchdb');

// PouchDB et getAllBooks sont mis dans la portée globale pour permettre le debug
function getAllBooks() {
  return BookPersistance._db.allDocs({ include_docs: true }).then(docs => {
    return docs.rows.map(row => {
      row.doc.Date = new Date(row.doc.date);
      return row.doc;
    });
  });
}

window["PouchDB"] = PouchDB;
window["getAllBooks"] = getAllBooks;


@Injectable()
export class BookPersistance {
  static _db;
  private _books;

  constructor() {
    console.log('dans le constructeur de BookPersistance')
  }

  initDB() {
    if (!BookPersistance._db) {
      BookPersistance._db = new PouchDB('books', { adapter: 'websql' });
      console.log('Base de donnée PouchDB chargée', BookPersistance._db);
      //http://stackoverflow.com/questions/27980987/pouchdb-not-detecting-sqlite-plugin-using-cordova
      console.log('Information sur la base PouchDB');
      BookPersistance._db.info().then(console.log.bind(console));
    }
    else {
      console.log('Base de donnée PouchDB déjà instanciée');
    }
  }

  add(book) {
    return BookPersistance._db.post(book);
  }

  getAll() {
    if (!this._books) {
      return BookPersistance._db.allDocs({ include_docs: true }).then(docs => {
        this._books = docs.rows.map(row => {
          row.doc.Date = new Date(row.doc.date);
          return row.doc;
        })
      });
    } else {
      return Promise.resolve(this._books);
    }
  }

}
