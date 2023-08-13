import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostsService } from './posts.service';
import { PostComponent } from './post/post.component';
import { SvgIconModule } from "../svg-icon/svg-icon.module";

@NgModule({
    declarations: [PostComponent],
    providers: [PostsService],
    exports: [PostComponent],
    imports: [
        CommonModule,
        FormsModule,
        SvgIconModule
    ],
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA,
      NO_ERRORS_SCHEMA
    ],
})
export class PostModule { }
