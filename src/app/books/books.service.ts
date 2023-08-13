import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor() { }

  getBooks(){
    return [
      {
        name: 'Clean code',
        author: 'Robert C Martin',
        image: 'https://m.media-amazon.com/images/I/41xShlnTZTL._SX376_BO1,204,203,200_.jpg',
        amount: 700,
      },
      {
        name: 'Friends, Lovers, and the Big Terrible Thing',
        author: 'Matthew Perry',
        image: 'https://m.media-amazon.com/images/I/413MbCa36bL._SX327_BO1,204,203,200_.jpg',
        amount: 23.45,
      },
      {
        name: 'Diper Överlöde',
        author: 'Jeff Kinney',
        image: 'https://m.media-amazon.com/images/I/61ZvgQihlkL._SX440_BO1,204,203,200_.jpg',
        amount: 156.15,
      },
      {
        name: 'Interesting Facts For Curious Minds',
        author: 'Jordan Moore',
        image: 'https://m.media-amazon.com/images/I/518z5dvykPL._SX348_BO1,204,203,200_.jpg',
        amount: 321.21,
      },
    ]
  }
}
