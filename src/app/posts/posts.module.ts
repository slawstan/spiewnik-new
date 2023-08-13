import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostsComponent } from './posts.component';
import { PostsService } from './posts.service';

@NgModule({
  declarations: [PostsComponent],
  providers: [PostsService],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [PostsComponent]
})
export class PostsModule { }
