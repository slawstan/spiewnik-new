import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SvgIconComponent } from './svg-icon.component';

@NgModule({
  declarations: [SvgIconComponent],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [SvgIconComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
  ],
})
export class SvgIconModule { }
