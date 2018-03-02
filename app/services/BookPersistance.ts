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
    console.log('dans le constructeur de BookPersistance');
    this.initDB();
  }

  // création ou récupération de la base de données
  initDB() {
    if (!BookPersistance.db) {
      BookPersistance.db = new PouchDB('books', { adapter: 'websql' });
      console.log('Base de donnée PouchDB chargée', BookPersistance.db);
      //http://stackoverflow.com/questions/27980987/pouchdb-not-detecting-sqlite-plugin-using-cordova
      console.log('Information sur la base PouchDB');
      BookPersistance.db.info().then(console.log.bind(console));
    }
    else {
      console.log('Base de données PouchDB déjà instanciée');
    }
  }

  // ajout d'un livre à la base
  add(book): Promise<Object> {
    return BookPersistance.db.post(book).then(res => {
      console.log('Résultat de l\'ajout', res);
      return res;
    }).catch(err => {
      console.error('Erreur lors de l\'ajout', err);
      return err;
    });
  }

  // mise à jour d'un livre dans la base
  upd(book): Promise<Object> {
    //return BookPersistance.db.put(book, {_id: book.doc._id, _rev : book.doc._rev});
    return BookPersistance.db.put(book).then(res => {
      console.log('Résultat de la maj', res);
      return res;
    }).catch(err => {
      console.error('Erreur lors de la maj', err);
      return err;
    })
  }

  // bon car générique. Chaque appelant pourra mettre le traitement qu'il souhaite via le callback
  getAll(): Promise<any> {
    return BookPersistance.db.allDocs({  include_docs: true })
      .then(result => {
        let data = [];
        result.rows.map(row => {
          data.push(row.doc);
        })
        return data;
      })
      .catch(err => {
        console.error(err);
        return err;
      });
  }

  // Suppression de tous les livres dans la base
  deleteAll() {
    BookPersistance.db.allDocs({ include_docs: true }).then(docs => {
      console.log(docs);
      docs.rows.forEach(row => {
        console.log('on va supprimer ', row.id, '(', row.doc.title, ')')
        BookPersistance.db.remove(row.doc)
      })
    })
  }
}
