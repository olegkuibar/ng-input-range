import { Component, ViewChild } from '@angular/core';
import { NgInputRangeComponent } from 'ng-input-range';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  get value(): number {
    return this._value;
  }

  set value(value: number) {
    this._value = value;
    this.form.setValue({ inputRange: value });
  }
  @ViewChild(NgInputRangeComponent) inputRange: NgInputRangeComponent;

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

  increaseEventCount(): void {
    this.eventCount++;
  }
}
