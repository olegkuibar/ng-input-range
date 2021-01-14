import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { NgInputRangeComponent } from './ng-input-range.component';

@NgModule({
  declarations: [NgInputRangeComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule],
  exports: [NgInputRangeComponent],
})
export class NgInputRangeModule {}
