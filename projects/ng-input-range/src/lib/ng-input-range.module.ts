import {NgModule} from '@angular/core';
import {NgInputRangeComponent} from './ng-input-range.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";


@NgModule({
  declarations: [NgInputRangeComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule],
  exports: [NgInputRangeComponent]
})
export class NgInputRangeModule {
}
