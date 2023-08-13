import { Component, OnInit } from '@angular/core';
import { Book } from 'src/types/interfaces/Book';
import { BooksService } from './books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: Book[] = [];


  constructor(private booksService: BooksService) {
    console.log('Constructor')
   }

  card:Book[] = [];

  isDisabled: boolean = false;
  isShowing: boolean = true;



  ngOnInit(): void {
    console.log('On In It')
    this.books = this.booksService.getBooks();
  }

    handleClick() {
      alert('helo');
    }

    myName: string = '';

    toggleBooks(){
      this.isShowing = !this.isShowing;
    }

    addToCart(book:Book){
      console.log(book);
    }


}
