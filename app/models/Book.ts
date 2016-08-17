/**
 * Classe modèle représentant un livre 
 */
export class Book {
  authors: Array<string>;
  publisher: string;
  title: string;
  description: string;
  date: string;
  "isbn-10": string;
  "isbn-13": string;
  smallThumbnail: string;
  thumbnail: string;
  pageCount: number;
  favorite: boolean;
  tag: string;

  // remplit un Book à partir des données issues de Google Book API
  static load(data): Book {
    let book = new Book();

    if (!data.items[0]){
      console.error('L\'objet data de l\'API Google Book ne contient pas un livre');
      console.error(data);
    }
    else{
      book.authors = data.items[0].volumeInfo.authors;
      book.publisher = data.items[0].volumeInfo.publisher;
      book.title = data.items[0].volumeInfo.title;
      book.description = data.items[0].volumeInfo.description;
      book.date = data.items[0].volumeInfo.publishedDate;
      if (data.items[0].volumeInfo.industryIdentifiers.length > 0) {
        for (let temp of data.items[0].volumeInfo.industryIdentifiers) {
          if (temp.type === "ISBN_13") {
            book['isbn-13'] = data.items[0].volumeInfo.industryIdentifiers[1].identifier // if data.items[0].volumeInfo.industryIdentifiers[0].type === "ISBN_13"
          }
          else if (temp.type === "ISBN_10") {
            book['isbn-10'] = data.items[0].volumeInfo.industryIdentifiers[0].identifier // if data.items[0].volumeInfo.industryIdentifiers[0].type === "ISBN_10"
          }
        }
      }
      if (data.items[0].volumeInfo.imageLinks) {
        if (!data.items[0].volumeInfo.imageLinks.thumbnail){
          book.thumbnail = '../../resources/empty-thumbnail.png';
          book.smallThumbnail = '../../resources/empty-thumbnail.png';
        }
        else {
          book.thumbnail = data.items[0].volumeInfo.imageLinks.thumbnail;
          book.smallThumbnail = data.items[0].volumeInfo.imageLinks.smallThumbnail;
        }
      }
      book.pageCount = data.items[0].volumeInfo.pageCount;
      book.favorite = false;
    }

    return book;
  }
}