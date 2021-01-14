import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { MatFormFieldControl } from '@angular/material/form-field';
import { FocusableOption, FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CanColor, CanColorCtor, CanDisable, mixinColor, ThemePalette } from '@angular/material/core';
import { map, pairwise, startWith } from 'rxjs/operators';

// Boilerplate for applying mixins to NgInputRange.
/** @docs-private */
class NgInputRangeBase {
  constructor(public _elementRef: ElementRef) {}
}

const _NgInputRangeMixinBase: CanColorCtor & typeof NgInputRangeBase = mixinColor(NgInputRangeBase);

@Component({
  selector: 'ng-input-range',
  template: `
    <ng-container [formGroup]="form">
      <input
        matInput
        type="number"
        formControlName="input"
        [step]="step"
        [min]="min"
        [max]="max"
        [value]="formControl.valueChanges | async"
      />
      <input
        class="pr-0"
        type="range"
        formControlName="range"
        [step]="step"
        [min]="min"
        [max]="max"
        [value]="formControl.valueChanges | async"
      />
    </ng-container>
  `,
  styleUrls: ['ng-input-range.component.scss', '_ng-input-range-theme.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => NgInputRangeComponent),
    },
    {
      provide: MatFormFieldControl,
      useExisting: NgInputRangeComponent,
    },
  ],
})
export class NgInputRangeComponent
  extends _NgInputRangeMixinBase
  implements
    OnInit,
    ControlValueAccessor,
    MatFormFieldControl<number>,
    AfterViewInit,
    OnDestroy,
    CanDisable,
    CanColor,
    FocusableOption {
  static nextId = 0;
  @Input() min: number;
  @Input() max: number;
  @Input() minLength: number;
  @Input() maxLength: number;
  @Input() size: number;
  @Input() step: number;
  @Input() color: ThemePalette = 'accent';

  focused = false;
  errorState = false;

  readonly ngControl = null;
  readonly controlType = 'ng-input-range';
  readonly autofilled: boolean;
  readonly empty: boolean;
  readonly stateChanges: Subject<void> = new Subject<void>();
  readonly userAriaDescribedBy: string;

  readonly form = new FormGroup({
    input: new FormControl({ value: 0, disabled: this.disabled }),
    range: new FormControl({ value: 0, disabled: this.disabled }),
  });
  readonly formControl = new FormControl(0);

  @HostBinding() id = `${this.controlType}-${NgInputRangeComponent.nextId++}`;
  @HostBinding('attr.aria-describedby') describedBy = '';
  private subscription: Subscription;

  constructor(_elementRef: ElementRef, protected fm: FocusMonitor) {
    super(_elementRef);
  }

  get shouldLabelFloat(): boolean {
    return this.focused || !this.empty;
  }

  @Input() set readonly(val: boolean) {
    if (!!val) {
      val ? this.formControl.disable() : this.formControl.enable();
    }
  }

  private _disabled = false;

  @Input()
  get disabled() {
    return this._disabled;
  }

  set disabled(dis) {
    this._disabled = coerceBooleanProperty(dis);
    this.stateChanges.next();
  }

  private _required = false;

  @Input()
  get required() {
    return this._required;
  }

  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }

  private _placeholder: string;

  @Input()
  get placeholder() {
    return this._placeholder;
  }

  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }

  @Input()
  get value(): number | null {
    const val = this.formControl.value;
    if (val) {
      return val;
    }
    return null;
  }

  set value(value: number | null) {
    this.writeValue(value);
    this.stateChanges.next();
  }

  @HostBinding('class.floating')
  get shouldPlaceholderFloat() {
    return this.focused || !this.empty;
  }

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() !== 'input') {
      ((this._elementRef.nativeElement as HTMLInputElement).firstElementChild as HTMLInputElement).focus();
    }
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  ngOnInit() {
    this.subscription = this.form.valueChanges
      .pipe(
        startWith<{ input: number; range: number }>(this.form.value),
        pairwise(),
        map(([oldValue, newValue]) => {
          if (oldValue.range !== newValue.range) {
            this.formControl.setValue(newValue.range ?? this.min);

            return { input: newValue.range, range: newValue.range };
          } else if (oldValue.input !== newValue.input) {
            this.formControl.setValue(newValue.input ?? this.min);

            return { input: newValue.input, range: newValue.input };
          }
        })
      )
      .subscribe(() => this.onChange(this.formControl.value));
  }

  ngAfterViewInit() {
    this.fm.monitor((this._elementRef.nativeElement as HTMLInputElement).firstElementChild as HTMLInputElement, true);
  }

  ngOnDestroy() {
    this.fm.stopMonitoring((this._elementRef.nativeElement as HTMLInputElement).firstElementChild as HTMLInputElement);
  }

  focus(origin?: FocusOrigin, options?: FocusOptions): void {
    if (origin) {
      this.fm.focusVia(this._getHostElement(), origin, options);
    } else {
      this._getHostElement().focus(options);
    }
  }

  _getHostElement() {
    return (this._elementRef.nativeElement as HTMLInputElement).firstElementChild as HTMLInputElement;
  }

  // Function to call when the rating changes.
  onChange = (value: number) => {};
  // Function to call when the input is touched (when a star is clicked).
  onTouched = () => {};

  // Allows Angular to update the model (rating).
  // Update the model and changes needed for the view here.
  writeValue(value: number): void {
    this.formControl.setValue(value);
  }

  // Allows Angular to register a function to call when the model (rating) changes.
  // Save the function as a property to call later here.
  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  // Allows Angular to register a function to call when the input has been touched.
  // Save the function as a property to call later here.
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Allows Angular to disable the input.
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
