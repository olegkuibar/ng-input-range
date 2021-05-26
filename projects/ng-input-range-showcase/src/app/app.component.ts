import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgInputRangeComponent } from '../../../ng-input-range/src/lib/ng-input-range.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(NgInputRangeComponent, { static: true }) inputRange!: NgInputRangeComponent;
  title = 'ng-input-range-showcase';
  autoTicks = false;
  disabled = false;
  max = 100;
  min = 0;
  step = 1;
  appearance: 'fill' | 'outline' = 'outline';
  theme: 'primary' | 'accent' = 'primary';
  form = new FormGroup({
    inputRange: new FormControl({ value: 96, disabled: this.disabled }),
  });
  eventCount = 0;

  private _value = 0;

  get value(): number {
    // eslint-disable-next-line no-underscore-dangle
    return this._value;
  }

  set value(value: number) {
    // eslint-disable-next-line no-underscore-dangle
    this._value = value;
    this.form.setValue({ inputRange: value });
  }

  increaseEventCount(): void {
    this.eventCount++;
  }
}
