/**
 * Classe modèle représentant un livre 
 */
export class Book{
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
}