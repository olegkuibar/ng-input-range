import {ControlValueAccessor, FormBuilder, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Component, ElementRef, forwardRef, HostBinding, Input, OnInit} from "@angular/core";
import {Subject, Subscription} from "rxjs";
import {InputNumberBase} from "./models/input-number-base.directive";
import {MatFormFieldControl} from "@angular/material/form-field";
import {FocusMonitor} from "@angular/cdk/a11y";
import {coerceBooleanProperty} from "@angular/cdk/coercion";

@Component({
  selector: 'lib-ng-input-range',
  template: `
    <input
      #inputRef
      matInput
      type="number"
      [step]="step"
      [min]="min"
      [max]="max"
      [formControl]="formControl"
      [value]="rangeRef.value"
    />
    <input
      #rangeRef
      class="pr-0"
      type="range"
      [step]="step"
      [min]="min"
      [max]="max"
      [formControl]="formControl"
      [value]="inputRef.value"
    />

  `,
  styles: [],
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
  extends InputNumberBase
  implements OnInit, ControlValueAccessor, MatFormFieldControl<number> {
  static nextId = 0;
  readonly autofilled: boolean;
  readonly empty: boolean;
  readonly shouldLabelFloat: boolean;
  readonly stateChanges: Subject<void> = new Subject<void>();
  readonly userAriaDescribedBy: string;
  readonly formControl = new FormControl('');
  ngControl = null;
  focused = false;
  errorState = false;
  controlType = 'product-team-input';
  @HostBinding() id = `${this.controlType}-${NgInputRangeComponent.nextId++}`;
  @HostBinding('attr.aria-describedby') describedBy = '';
  private subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private fm: FocusMonitor,
    private elRef: ElementRef
  ) {
    super();
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
      this.elRef.nativeElement.querySelector('input').focus();
    }
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  ngOnInit() {
    this.subscription = this.formControl.valueChanges.subscribe((v) =>
      this.onChange(v)
    );
  }

  // Function to call when the rating changes.
  onChange = (value: number) => {
  };
  // Function to call when the input is touched (when a star is clicked).
  onTouched = () => {
  };

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
