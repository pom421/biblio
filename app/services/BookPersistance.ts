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

  add(book) {
    return BookPersistance.db.post(book).then(res => {
      console.log('Résultat de l\'ajout', res);
      return res;
    }).catch(err => {
      console.error('Erreur lors de l\'ajout', err);
      return err;
    });
  }

  upd(book): Promise<any>{
    //return BookPersistance.db.put(book, {_id: book.doc._id, _rev : book.doc._rev});
    return BookPersistance.db.put(book).then(res => {
      console.log('Résultat de la maj', res);
      return res;
    }).catch(err => {
      console.error('Erreur lors de la maj', err);
      return err;
    })
  }

  // faux car il faut imbriquer un callback pour exécuter le traitement de remplissage de this.items (de MesLivresPage) seulement quand le then est lancé
  getAllOld() {
    if (!this.books) {
      console.log('avant db.allDocs')
      BookPersistance.db.allDocs({ include_docs: true }).then(docs => {
        console.log('on rend les books dans getAll')
        this.books = docs;
        return this.books;
      });
      console.log('après db.allDocs')
    } else {
      console.log('books déjà chargés dans getAll');
      return this.books;
    }
  }

  // bon car générique. Chaque appelant pourra mettre le traitement qu'il souhaite via le callback
  getAll(callback){
    let data = [];
    BookPersistance.db.allDocs({ include_docs: true})
      .then(result => {
        result.rows.map(row => {
          data.push(row.doc);
        })
        callback(data);
      })
      .catch(err => console.error);
  }

  deleteAll(){
    BookPersistance.db.allDocs({ include_docs: true }).then(docs => {
      console.log(docs);
      docs.rows.forEach(row => {
        console.log('on va supprimer ', row.id, '(', row.doc.title, ')')
        BookPersistance.db.remove(row.doc)
      })
    })
  }
}
