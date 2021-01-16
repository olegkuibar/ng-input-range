# NgInputRange

(BETA v0.1.2)

Repository contains two projects:

1. library -> component publish on [npm as "ng-input-range"](https://www.npmjs.com/package/ng-input-range)
2. showcase -> example of usage of the library

## About

`ng-input-range` introduces combined `<input type="number">` and `<input type="range">` as single component, allows user
to set value or select from a range of values by moving the slider thumb benith input.

Component implements `ControlValueAccessor`, `MatFormFieldControl` therefore supports usage of Reactive Forms and
can/should be used inside `mat-form-field` component
of [MatFormFieldModule](https://material.angular.io/components/form-field/overview)

## Install

`npm i ng-input-range`

## Usage

### Example:

Update your Module dependencies with

```typescript
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgInputRangeModule} from "./ng-input-range.module";

@NgModule({
  declarations: [MyComponent],
  imports: [
    FormsModule, // required if using "FormControl" and/or "FormGroup"
    ReactiveFormsModule, // required if using "FormControl" and/or "FormGroup"
    MatFormFieldModule,
    NgInputRangeModule,
  ],
  providers: [],
  bootstrap: [MyComponent],
})
```

1. **Using `ng-input-range` with `FormControl`**

```typescript
// my-component.component.ts

formGroup: new FormGroup({
  inputWithRange: new FormControl({value: 0, disabled: false}),
});
```

HTML file

```angular2html
<!-- my-component.component.html-->

<mat-form-field>
  <ng-input-range
    min="0"
    max="256"
    color="primary"
    appearence="outline"
    formControlName="inputWithRange"
  ></ng-input-range>
</mat-form-field>
```

2. **Using `ng-input-range` with data binding `[value]="inputWithRangeValue"`**

TS file

```typescript
// my-component.component.ts

public inputWithRangeValue = 128;
public theme: 'primary' | 'accent' | 'warn';
```

HTML

```angular2html
<!-- my-component.component.html-->

<mat-form-field>
  <ng-input-range
    min="0"
    max="256"
    appearence="outline"
    [color]="theme"
    [value]="inputWithRangeValue"
  ></ng-input-range>
</mat-form-field>
```

## API references for Angular Material Input with Range component

| Name                           | Description                                 |
| :----------------------------- | :------------------------------------------ |
| `@Input() color: ThemePalette` | Theme color palette for the component.      |
| `@Input() disabled: boolean`   | Whether the component is disabled.          |
| `@Input() max: number`         | The maximum value that the slider can have. |
| `@Input() min: number`         | The minimum value that the slider can have. |
| `@Input() step: number`        | The values at which the thumb will snap.    |
| `@Input() value: number`       | Value of the input.
| `@Output() change: Event`      | Emits `value` on input number/range change
