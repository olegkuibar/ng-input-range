import { Component, ViewChild } from '@angular/core';
import { NgInputRangeComponent } from 'ng-input-range';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(NgInputRangeComponent) inputRange: NgInputRangeComponent;

  title = 'ng-input-range-showcase';
  autoTicks = false;
  disabled = false;
  max = 100;
  min = 0;
  step = 1;
  value = 0;
  appearance: 'fill' | 'outline' = 'outline';

  form = new FormGroup({
    inputRange: new FormControl({ value: 96, disabled: this.disabled }),
  });

  eventCount = 0;

  increaseEventCount(): void {
    this.eventCount++;
  }
}
