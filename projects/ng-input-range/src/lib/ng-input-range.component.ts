import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgControl,
  NgForm,
} from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Self,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  CanColor,
  CanColorCtor,
  CanDisable,
  CanDisableCtor,
  mixinColor,
  mixinDisabled,
  ThemePalette,
} from '@angular/material/core';
import { Subject } from 'rxjs';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FocusMonitor } from '@angular/cdk/a11y';
import { map, pairwise, startWith, take } from 'rxjs/operators';

// const _NgInputRangeMixinBase: CanColorCtor & typeof NgInputRangeBase = mixinColor(NgInputRangeBase);

export interface INgInputRange {
  input: number;
  range: number;
}

class NgInputRangeBase {
  constructor(
    public _parentFormGroup: FormGroupDirective,
    public _parentForm: NgForm,
    public _elementRef: ElementRef,
    public ngControl: NgControl
  ) {}
}

const _NgInputRangeMixinBase: CanColorCtor & CanDisableCtor & typeof NgInputRangeBase = mixinColor(
  mixinDisabled(NgInputRangeBase)
);

@Component({
  selector: 'ng-input-range',
  exportAs: 'ngInputRange',
  host: {
    '[attr.disabled]': 'disabled || null',
    // Add a class for disabled input styling instead of the using attribute
    // selector or pseudo-selector.  This allows users to create focusable
    // disabled buttons without recreating the styles.
    '[class.ng-input-range-disabled]': 'disabled',
    class: 'ng-input-range ng-input-range-focus-indicator',
  },
  inputs: ['disabled', 'color'],
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
  styleUrls: ['ng-input-range.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: NgInputRangeComponent,
    },
  ],
})
export class NgInputRangeComponent
  extends _NgInputRangeMixinBase
  implements OnInit, DoCheck, OnDestroy, ControlValueAccessor, MatFormFieldControl<number>, CanDisable, CanColor {
  private static nextId = 0;
  @ViewChild(MatInput, { read: ElementRef, static: true })
  input: ElementRef;

  @Input() min: number;
  @Input() max: number;
  @Input() size: number;
  @Input() step: number;
  @Input() required: boolean;
  @Input() set disabled(value: boolean) {
    value ? this.form.disable() : this.form.enable();
    value ? this.formControl.disable() : this.formControl.enable();
  }
  get disabled(): boolean {
    return this.form?.disabled ?? false;
  }

  @HostBinding()
  id = `ng-input-range-id-${NgInputRangeComponent.nextId++}`;
  @HostBinding('attr.aria-describedby') describedBy = '';
  focused: boolean;

  readonly controlType = 'ng-input-range';
  readonly autofilled: boolean;
  readonly errorState: boolean;
  readonly placeholder: string;
  readonly stateChanges: Subject<any> = new Subject();
  readonly userAriaDescribedBy: string;

  color: ThemePalette;
  defaultColor: ThemePalette;
  form: FormGroup;
  formControl: FormControl;

  constructor(
    private fm: FocusMonitor,
    private fb: FormBuilder,
    @Optional() elementRef: ElementRef,
    @Optional() @Self() public ngControl: NgControl,
    @Optional() _parentForm: NgForm,
    @Optional() _parentFormGroup: FormGroupDirective
  ) {
    super(_parentFormGroup, _parentForm, elementRef, ngControl);

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    this.form = fb.group({
      input: fb.control({ value: 0, disabled: this.disabled }),
      range: fb.control({ value: 0, disabled: this.disabled }),
    });

    this.formControl = fb.control({ value: 0, disabled: this.disabled });
  }

  get value(): number | null {
    const val = this.formControl.value;
    if (val) {
      return val;
    }
    return null;
  }

  @Input()
  set value(value: number | null) {
    if (!this.disabled) {
      this.writeValue(value);
      this.stateChanges.next();
    }
  }

  get empty(): boolean {
    return !this.value;
  }

  @HostBinding('class.floated')
  get shouldLabelFloat(): boolean {
    return true;
  }

  onChange = (value: number) => {};

  onTouch = () => {};

  writeValue(value: number): void {
    if (!this.disabled) {
      this.form.setValue({ input: value, range: value });
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.form.disable();
    this.stateChanges.next();
  }

  setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(): void {
    this.fm.focusVia(this.input, 'program');
  }

  ngOnInit(): void {
    this.fm.monitor(this.input).subscribe((focused) => {
      this.focused = !!focused;
      this.stateChanges.next();
    });
    this.fm
      .monitor(this.input)
      .pipe(take(1))
      .subscribe(() => {
        this.onTouch();
      });
    this.form.valueChanges
      .pipe(
        // tslint check value for 'null' and warns that `startWith(null)` was deprecated;
        // however we always have a value in the form that is why we are asserting `form.value` type to `{ input; range }`
        startWith(this.form.value as { input; range }),
        pairwise(),
        map(([oldValue, newValue]) => {
          if (!this.disabled) {
            if (oldValue.range !== newValue.range) {
              this.formControl.setValue(newValue.range ?? this.min);

              return { input: newValue.range, range: newValue.range };
            } else if (oldValue.input !== newValue.input) {
              this.formControl.setValue(newValue.input ?? this.min);

              return { input: newValue.input, range: newValue.input };
            }
          }
        })
      )
      .subscribe(() => this.onChange(this.formControl.value));
  }

  ngOnDestroy() {
    this.fm.stopMonitoring(this.input);
    this.stateChanges.complete();
  }

  ngDoCheck(): void {}
}
