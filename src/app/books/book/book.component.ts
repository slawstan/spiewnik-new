import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from 'src/app/cart/cart.service';
import { Book } from 'src/types/interfaces/Book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  @Input() book: Book = {} as Book;
  @Input() i:number = 0;
  @Output() bookEmitter = new EventEmitter<Book>();
  isInCart:boolean = false;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  addToCart() {
    console.log(this.book);
    //this.card[] =
    this.isInCart = true;
    this.bookEmitter.emit(this.book);
    this.cartService.add(this.book);
  }

 removeFromCart() {
    this.isInCart = false;
    this.cartService.remove(this.book);
  }


}
