# NgInputRange

![publish-to-npm](https://github.com/olegkuibar/ng-input-range/workflows/publish-to-npm/badge.svg?branch=main) ![github-pages](https://github.com/olegkuibar/ng-input-range/workflows/github-pages/badge.svg) ![unit-tests](https://github.com/olegkuibar/ng-input-range/workflows/unit-tests/badge.svg?branch=main)

`ng-input-range` introduces combined `<input type="number">` and `<input type="range">` as single component, allows user
to set value or select from a range of values by moving the slider thumb benith input.

Links:
* [Demo (GitHub Pages)](https://olegkuibar.github.io/ng-input-range/)
* [Demo (StackBlitz)](https://ng-input-range.stackblitz.io/)
* [NPM package](https://www.npmjs.com/package/ng-input-range)

Component implements `ControlValueAccessor`, `MatFormFieldControl` therefore supports usage of Reactive Forms and
can/should be used inside `mat-form-field` component
of [MatFormFieldModule](https://material.angular.io/components/form-field/overview)

## Install

`npm i ng-input-range`

Update your Module dependencies with `NgInputRangeModule`

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

## Usage

### Using `ng-input-range` with `FormControl`

```typescript
// my-component.component.ts

formGroup: new FormGroup({
  inputWithRange: new FormControl({ value: 0, disabled: false }),
});
```

```angular2html
<!-- my-component.component.html-->

<mat-form-field>
  <ng-input-range
    min="0"
    max="256"
    appearence="outline"
    formControlName="inputWithRange"
  ></ng-input-range>
</mat-form-field>
```

### Using `ng-input-range` with data binding `[value]="inputWithRangeValue"`

```typescript
// my-component.component.ts

public inputWithRangeValue = 128;
```

```angular2html
<!-- my-component.component.html-->

<mat-form-field>
  <ng-input-range
    min="0"
    max="256"
    appearence="outline"
    [value]="inputWithRangeValue"
  ></ng-input-range>
</mat-form-field>
```

## API references for Angular Material Input with Range component

| Name                           | Description                                                                          |
| :----------------------------- | :----------------------------------------------------------------------------------- |
| `@Input() color: ThemePalette` | Theme color palette for the component. Supports `"primary"`, `"accent"` and `"warn"` |
| `@Input() disabled: boolean`   | Whether the component is disabled.                                                   |
| `@Input() max: number`         | The maximum value that the slider can have.                                          |
| `@Input() min: number`         | The minimum value that the slider can have.                                          |
| `@Input() step: number`        | The values at which the thumb will snap.                                             |
| `@Input() value: number`       | Value of the input.                                                                  |
| `@Output() change: Event`      | Emits `value` on input number/range change                                           |
