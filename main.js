(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!************************************************************!*\
  !*** multi ./projects/ng-input-range-showcase/src/main.ts ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/olegkuibar/projects/github/ng-input-range/projects/ng-input-range-showcase/src/main.ts */"Gz/w");


/***/ }),

/***/ "8bCD":
/*!*********************************************************************!*\
  !*** ./projects/ng-input-range/src/lib/ng-input-range.component.ts ***!
  \*********************************************************************/
/*! exports provided: NgInputRangeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgInputRangeComponent", function() { return NgInputRangeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/core */ "FKr1");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/a11y */ "u47x");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "ofXK");











class NgInputRangeBase {
    constructor(_parentFormGroup, _parentForm, _elementRef, ngControl) {
        this._parentFormGroup = _parentFormGroup;
        this._parentForm = _parentForm;
        this._elementRef = _elementRef;
        this.ngControl = ngControl;
    }
}
const _NgInputRangeMixinBase = Object(_angular_material_core__WEBPACK_IMPORTED_MODULE_1__["mixinColor"])(Object(_angular_material_core__WEBPACK_IMPORTED_MODULE_1__["mixinDisabled"])(NgInputRangeBase));
class NgInputRangeComponent extends _NgInputRangeMixinBase {
    constructor(fm, fb, elementRef, ngControl, _parentForm, _parentFormGroup) {
        super(_parentFormGroup, _parentForm, elementRef, ngControl);
        this.fm = fm;
        this.fb = fb;
        this.ngControl = ngControl;
        this.id = `ng-input-range-id-${NgInputRangeComponent.nextId++}`;
        this.describedBy = '';
        this.controlType = 'ng-input-range';
        this.stateChanges = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.onChange = (value) => { };
        this.onTouch = () => { };
        if (this.ngControl != null) {
            this.ngControl.valueAccessor = this;
        }
        this.form = fb.group({
            input: fb.control({ value: 0, disabled: this.disabled }),
            range: fb.control({ value: 0, disabled: this.disabled }),
        });
        this.formControl = fb.control({ value: 0, disabled: this.disabled });
    }
    set disabled(value) {
        value ? this.form.disable() : this.form.enable();
        value ? this.formControl.disable() : this.formControl.enable();
    }
    get disabled() {
        var _a, _b;
        return (_b = (_a = this.form) === null || _a === void 0 ? void 0 : _a.disabled) !== null && _b !== void 0 ? _b : false;
    }
    get value() {
        const val = this.formControl.value;
        if (val) {
            return val;
        }
        return null;
    }
    set value(value) {
        if (!this.disabled) {
            this.writeValue(value);
            this.stateChanges.next();
        }
    }
    get empty() {
        return !this.value;
    }
    get shouldLabelFloat() {
        return true;
    }
    writeValue(value) {
        if (!this.disabled) {
            this.form.setValue({ input: value, range: value });
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouch = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this.form.disable();
        this.stateChanges.next();
    }
    setDescribedByIds(ids) {
        this.describedBy = ids.join(' ');
    }
    onContainerClick() {
        this.fm.focusVia(this.input, 'program');
    }
    ngOnInit() {
        this.fm.monitor(this.input).subscribe((focused) => {
            this.focused = !!focused;
            this.stateChanges.next();
        });
        this.fm
            .monitor(this.input)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1))
            .subscribe(() => {
            this.onTouch();
        });
        this.form.valueChanges
            .pipe(
        // tslint check value for 'null' and warns that `startWith(null)` was deprecated;
        // however we always have a value in the form that is why we are asserting `form.value` type to `{ input; range }`
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["startWith"])(this.form.value), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["pairwise"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(([oldValue, newValue]) => {
            var _a, _b;
            if (!this.disabled) {
                if (oldValue.range !== newValue.range) {
                    this.formControl.setValue((_a = newValue.range) !== null && _a !== void 0 ? _a : this.min);
                    return { input: newValue.range, range: newValue.range };
                }
                else if (oldValue.input !== newValue.input) {
                    this.formControl.setValue((_b = newValue.input) !== null && _b !== void 0 ? _b : this.min);
                    return { input: newValue.input, range: newValue.input };
                }
            }
        }))
            .subscribe(() => this.onChange(this.formControl.value));
    }
    ngOnDestroy() {
        this.fm.stopMonitoring(this.input);
        this.stateChanges.complete();
    }
    ngDoCheck() { }
}
NgInputRangeComponent.nextId = 0;
NgInputRangeComponent.ɵfac = function NgInputRangeComponent_Factory(t) { return new (t || NgInputRangeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_6__["FocusMonitor"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormBuilder"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgControl"], 10), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgForm"], 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormGroupDirective"], 8)); };
NgInputRangeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: NgInputRangeComponent, selectors: [["ng-input-range"]], viewQuery: function NgInputRangeComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstaticViewQuery"](_angular_material_input__WEBPACK_IMPORTED_MODULE_4__["MatInput"], true, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.input = _t.first);
    } }, hostAttrs: [1, "ng-input-range", "ng-input-range-focus-indicator"], hostVars: 7, hostBindings: function NgInputRangeComponent_HostBindings(rf, ctx) { if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵhostProperty"]("id", ctx.id);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("disabled", ctx.disabled || null)("aria-describedby", ctx.describedBy);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("ng-input-range-disabled", ctx.disabled)("floated", ctx.shouldLabelFloat);
    } }, inputs: { disabled: "disabled", color: "color", min: "min", max: "max", size: "size", step: "step", required: "required", value: "value" }, exportAs: ["ngInputRange"], features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([
            {
                provide: _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__["MatFormFieldControl"],
                useExisting: NgInputRangeComponent,
            },
        ]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]], decls: 5, vars: 13, consts: [[3, "formGroup"], ["matInput", "", "type", "number", "formControlName", "input", 3, "step", "min", "max", "value"], ["type", "range", "formControlName", "range", 1, "pr-0", 3, "step", "min", "max", "value"]], template: function NgInputRangeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0, 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "input", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](4, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx.form);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("step", ctx.step)("min", ctx.min)("max", ctx.max)("value", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 9, ctx.formControl.valueChanges));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("step", ctx.step)("min", ctx.min)("max", ctx.max)("value", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](4, 11, ctx.formControl.valueChanges));
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormGroupDirective"], _angular_material_input__WEBPACK_IMPORTED_MODULE_4__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NumberValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControlName"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["RangeValueAccessor"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_8__["AsyncPipe"]], styles: ["/**\n * You can't comma-separate the browser specific selectors, therefore we use a mixin.\n */\n/**\n * Cross browser \"<input type=\"range\" />\" reset\n * Source: https://css-tricks.com/styling-cross-browser-compatible-range-inputs-css/\n */\ninput[type=range] {\n  position: absolute;\n  bottom: -0.35rem;\n  left: 0;\n  margin: 0;\n  height: 0.75rem;\n  background: transparent;\n}\ninput[type=range] {\n  -webkit-appearance: none;\n  /* Hides the slider so that custom slider can be made */\n  width: 100%;\n  /* Specific width is required for Firefox. */\n}\ninput[type=range]::-webkit-slider-thumb {\n  -webkit-appearance: none;\n}\ninput[type=range]:focus {\n  outline: none;\n  /* Removes the blue border. */\n}\ninput[type=range]::-ms-track {\n  width: 100%;\n  cursor: pointer;\n  background: transparent;\n  /* Hides the slider so custom styles can be added */\n  border-color: transparent;\n  color: transparent;\n}\n::ng-deep .mat-form-field-flex:hover input[type=range], ::ng-deep .mat-form-field-flex:focus input[type=range] {\n  background: transparent;\n}\n::ng-deep .mat-form-field-flex:hover input[type=range]::-webkit-slider-runnable-track, ::ng-deep .mat-form-field-flex:focus input[type=range]::-webkit-slider-runnable-track {\n  height: 1px;\n  margin: 0.875rem 0;\n  background: rgba(0, 0, 0, 0.01);\n  border: none;\n}\n::ng-deep .mat-form-field-flex:hover input[type=range]::-moz-range-track, ::ng-deep .mat-form-field-flex:focus input[type=range]::-moz-range-track {\n  height: 1px;\n  margin: 0.875rem 0;\n  background: rgba(0, 0, 0, 0.01);\n  border: none;\n}\n::ng-deep .mat-form-field-flex:hover input[type=range]::-ms-track, ::ng-deep .mat-form-field-flex:focus input[type=range]::-ms-track {\n  height: 1px;\n  margin: 0.875rem 0;\n  background: rgba(0, 0, 0, 0.01);\n  border: none;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL19yYW5nZVRyYWNrU3R5bGVzLnNjc3MiLCIuLi8uLi8uLi8uLi9uZy1pbnB1dC1yYW5nZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7RUFBQTtBQ0VBOzs7RUFBQTtBQUtBO0VBQ0Usa0JBQUE7RUFDQSxnQkFBQTtFQUNBLE9BQUE7RUFDQSxTQUFBO0VBQ0EsZUFBQTtFQUNBLHVCQUFBO0FBQ0Y7QUFFQTtFQUNFLHdCQUFBO0VBQTBCLHVEQUFBO0VBQzFCLFdBQUE7RUFBYSw0Q0FBQTtBQUdmO0FBRkU7RUFDRSx3QkFBQTtBQUlKO0FBREU7RUFDRSxhQUFBO0VBQWUsNkJBQUE7QUFJbkI7QUFERTtFQUNFLFdBQUE7RUFDQSxlQUFBO0VBQ0EsdUJBQUE7RUFBeUIsbURBQUE7RUFDekIseUJBQUE7RUFDQSxrQkFBQTtBQUlKO0FBSU07RUFNRSx1QkFBQTtBQU5SO0FEcENFO0VBQ0UsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsK0JBQUE7RUFDQSxZQUFBO0FDc0NKO0FEMUNFO0VBQ0UsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsK0JBQUE7RUFDQSxZQUFBO0FDNENKO0FEaERFO0VBQ0UsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsK0JBQUE7RUFDQSxZQUFBO0FDa0RKIiwiZmlsZSI6Im5nLWlucHV0LXJhbmdlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBZb3UgY2FuJ3QgY29tbWEtc2VwYXJhdGUgdGhlIGJyb3dzZXIgc3BlY2lmaWMgc2VsZWN0b3JzLCB0aGVyZWZvcmUgd2UgdXNlIGEgbWl4aW4uXG4gKi9cbkBtaXhpbiBnZXRUcmFja1N0eWxlcygkYnJvd3Nlcikge1xuICAmOjojeyRicm93c2VyfSB7XG4gICAgaGVpZ2h0OiAxcHg7XG4gICAgbWFyZ2luOiAwLjg3NXJlbSAwOyAvLyAoMnJlbSAtIC4yNXJlbSkgLyAyXG4gICAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjAxKTsgLy8gc2xpZGVyIHJhaWwgY29sb3JcbiAgICBib3JkZXI6IG5vbmU7XG4gIH1cbn1cbiIsIkBpbXBvcnQgJ3JhbmdlVHJhY2tTdHlsZXMnO1xuXG4vKipcbiAqIENyb3NzIGJyb3dzZXIgXCI8aW5wdXQgdHlwZT1cInJhbmdlXCIgLz5cIiByZXNldFxuICogU291cmNlOiBodHRwczovL2Nzcy10cmlja3MuY29tL3N0eWxpbmctY3Jvc3MtYnJvd3Nlci1jb21wYXRpYmxlLXJhbmdlLWlucHV0cy1jc3MvXG4gKi9cblxuaW5wdXRbdHlwZT0ncmFuZ2UnXSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiAtMC4zNXJlbTtcbiAgbGVmdDogMDtcbiAgbWFyZ2luOiAwO1xuICBoZWlnaHQ6IDAuNzVyZW07XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xufVxuXG5pbnB1dFt0eXBlPSdyYW5nZSddIHtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lOyAvKiBIaWRlcyB0aGUgc2xpZGVyIHNvIHRoYXQgY3VzdG9tIHNsaWRlciBjYW4gYmUgbWFkZSAqL1xuICB3aWR0aDogMTAwJTsgLyogU3BlY2lmaWMgd2lkdGggaXMgcmVxdWlyZWQgZm9yIEZpcmVmb3guICovXG4gICY6Oi13ZWJraXQtc2xpZGVyLXRodW1iIHtcbiAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gIH1cblxuICAmOmZvY3VzIHtcbiAgICBvdXRsaW5lOiBub25lOyAvKiBSZW1vdmVzIHRoZSBibHVlIGJvcmRlci4gKi9cbiAgfVxuXG4gICY6Oi1tcy10cmFjayB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50OyAvKiBIaWRlcyB0aGUgc2xpZGVyIHNvIGN1c3RvbSBzdHlsZXMgY2FuIGJlIGFkZGVkICovXG4gICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICBjb2xvcjogdHJhbnNwYXJlbnQ7XG4gIH1cbn1cblxuOjpuZy1kZWVwIHtcbiAgLm1hdC1mb3JtLWZpZWxkLWZsZXgge1xuICAgICY6aG92ZXIsXG4gICAgJjpmb2N1cyB7XG4gICAgICBpbnB1dFt0eXBlPSdyYW5nZSddIHtcbiAgICAgICAgQGluY2x1ZGUgZ2V0VHJhY2tTdHlsZXMoJy13ZWJraXQtc2xpZGVyLXJ1bm5hYmxlLXRyYWNrJyk7XG4gICAgICAgIEBpbmNsdWRlIGdldFRyYWNrU3R5bGVzKCctbW96LXJhbmdlLXRyYWNrJyk7XG5cbiAgICAgICAgQGluY2x1ZGUgZ2V0VHJhY2tTdHlsZXMoJy1tcy10cmFjaycpO1xuXG4gICAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19 */"], encapsulation: 2, changeDetection: 0 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NgInputRangeComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
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
                changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush,
                encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
                providers: [
                    {
                        provide: _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__["MatFormFieldControl"],
                        useExisting: NgInputRangeComponent,
                    },
                ],
            }]
    }], function () { return [{ type: _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_6__["FocusMonitor"] }, { type: _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormBuilder"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }] }, { type: _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgControl"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Self"]
            }] }, { type: _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgForm"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }] }, { type: _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormGroupDirective"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }] }]; }, { input: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: [_angular_material_input__WEBPACK_IMPORTED_MODULE_4__["MatInput"], { read: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], static: true }]
        }], min: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], max: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], size: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], step: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], required: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], disabled: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], id: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"]
        }], describedBy: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"],
            args: ['attr.aria-describedby']
        }], value: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], shouldLabelFloat: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"],
            args: ['class.floated']
        }] }); })();


/***/ }),

/***/ "Gz/w":
/*!******************************************************!*\
  !*** ./projects/ng-input-range-showcase/src/main.ts ***!
  \******************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "oAQa");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "yT8z");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch((err) => console.error(err));


/***/ }),

/***/ "V7ei":
/*!***************************************************************************************!*\
  !*** ./projects/ng-input-range-showcase/$$_lazy_route_resource lazy namespace object ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "V7ei";

/***/ }),

/***/ "WLc8":
/*!*********************************************************************!*\
  !*** ./projects/ng-input-range-showcase/src/app/material.module.ts ***!
  \*********************************************************************/
/*! exports provided: DemoMaterialModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DemoMaterialModule", function() { return DemoMaterialModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/a11y */ "u47x");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/checkbox */ "bSwM");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/select */ "d3UM");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/input */ "qFsG");







class DemoMaterialModule {
}
DemoMaterialModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: DemoMaterialModule });
DemoMaterialModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function DemoMaterialModule_Factory(t) { return new (t || DemoMaterialModule)(); }, imports: [_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_1__["A11yModule"], _angular_material_card__WEBPACK_IMPORTED_MODULE_4__["MatCardModule"], _angular_material_input__WEBPACK_IMPORTED_MODULE_5__["MatInputModule"], _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_2__["MatCheckboxModule"], _angular_material_select__WEBPACK_IMPORTED_MODULE_3__["MatSelectModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](DemoMaterialModule, { exports: [_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_1__["A11yModule"], _angular_material_card__WEBPACK_IMPORTED_MODULE_4__["MatCardModule"], _angular_material_input__WEBPACK_IMPORTED_MODULE_5__["MatInputModule"], _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_2__["MatCheckboxModule"], _angular_material_select__WEBPACK_IMPORTED_MODULE_3__["MatSelectModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DemoMaterialModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                exports: [_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_1__["A11yModule"], _angular_material_card__WEBPACK_IMPORTED_MODULE_4__["MatCardModule"], _angular_material_input__WEBPACK_IMPORTED_MODULE_5__["MatInputModule"], _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_2__["MatCheckboxModule"], _angular_material_select__WEBPACK_IMPORTED_MODULE_3__["MatSelectModule"]],
            }]
    }], null, null); })();


/***/ }),

/***/ "mFjb":
/*!*******************************************************************!*\
  !*** ./projects/ng-input-range-showcase/src/app/app.component.ts ***!
  \*******************************************************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ng_input_range_src_lib_ng_input_range_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../ng-input-range/src/lib/ng-input-range.component */ "8bCD");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/checkbox */ "bSwM");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/select */ "d3UM");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/core */ "FKr1");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "ofXK");













function AppComponent_div_59_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const range_r1 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Form Control Value: ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 1, range_r1.valueChanges) || range_r1.value, "");
} }
class AppComponent {
    constructor() {
        this.title = 'ng-input-range-showcase';
        this.autoTicks = false;
        this.disabled = false;
        this.max = 100;
        this.min = 0;
        this.step = 1;
        this.appearance = 'outline';
        this.theme = 'primary';
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            inputRange: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]({ value: 96, disabled: this.disabled }),
        });
        this.eventCount = 0;
        this._value = 0;
    }
    get value() {
        // eslint-disable-next-line no-underscore-dangle
        return this._value;
    }
    set value(value) {
        // eslint-disable-next-line no-underscore-dangle
        this._value = value;
        this.form.setValue({ inputRange: value });
    }
    increaseEventCount() {
        this.eventCount++;
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], viewQuery: function AppComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_ng_input_range_src_lib_ng_input_range_component__WEBPACK_IMPORTED_MODULE_2__["NgInputRangeComponent"], true);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.inputRange = _t.first);
    } }, decls: 60, vars: 24, consts: [[1, "example-result-card"], ["matCardTitle", ""], ["matCardContent", ""], [1, "example-section"], [1, "example-margin"], ["matInput", "", "type", "number", 3, "ngModel", "ngModelChange"], [1, "example-margin", 3, "ngModel", "ngModelChange"], [3, "appearance"], [3, "value", "valueChange"], ["value", "fill"], ["value", "outline"], ["appearance", "outline"], ["value", "primary"], ["value", "accent"], ["value", "warn"], [3, "value", "min", "max", "step", "disabled", "color", "change"], [3, "formGroup"], ["formControlName", "inputRange", 3, "min", "max", "step", "disabled", "color"], [4, "ngIf"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-card", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Settings:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "section", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "mat-form-field", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Value");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "input", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function AppComponent_Template_input_ngModelChange_8_listener($event) { return ctx.value = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "mat-form-field", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Min value");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "input", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function AppComponent_Template_input_ngModelChange_12_listener($event) { return ctx.min = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "mat-form-field", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Max value");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "input", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function AppComponent_Template_input_ngModelChange_16_listener($event) { return ctx.max = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "mat-form-field", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "Step size");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "input", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function AppComponent_Template_input_ngModelChange_20_listener($event) { return ctx.step = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "section", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "mat-checkbox", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function AppComponent_Template_mat_checkbox_ngModelChange_22_listener($event) { return ctx.disabled = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "Disabled");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "section", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "mat-form-field", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "Change Appearance");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "mat-select", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("valueChange", function AppComponent_Template_mat_select_valueChange_28_listener($event) { return ctx.appearance = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "mat-option", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, "Fill");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "mat-option", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32, "Outline");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "section", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "mat-form-field", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](36, "Theme");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "mat-select", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("valueChange", function AppComponent_Template_mat_select_valueChange_37_listener($event) { return ctx.theme = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "mat-option", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](39, "Primary");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "mat-option", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](41, "Accent");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "mat-option", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](43, "Warn");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "mat-card", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "span", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](46, " Using data binding");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "mat-card-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "mat-form-field", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "ng-input-range", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function AppComponent_Template_ng_input_range_change_49_listener() { return ctx.increaseEventCount(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](51);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "mat-card", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "span", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](54, "Using FormControl");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "mat-card-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](56, 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "mat-form-field", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](58, "ng-input-range", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](59, AppComponent_div_59_Template, 3, 3, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.value);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.min);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.max);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.step);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.disabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("appearance", ctx.appearance);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", ctx.appearance);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", ctx.theme);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("appearance", ctx.appearance);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", ctx.value)("min", ctx.min)("max", ctx.max)("step", ctx.step)("disabled", ctx.disabled)("color", ctx.theme);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Event emitted: ", ctx.eventCount, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx.form);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("appearance", ctx.appearance);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("min", ctx.min)("max", ctx.max)("step", ctx.step)("disabled", ctx.disabled)("color", ctx.theme);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.form.get("inputRange"));
    } }, directives: [_angular_material_card__WEBPACK_IMPORTED_MODULE_3__["MatCard"], _angular_material_card__WEBPACK_IMPORTED_MODULE_3__["MatCardTitle"], _angular_material_card__WEBPACK_IMPORTED_MODULE_3__["MatCardContent"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__["MatFormField"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__["MatLabel"], _angular_material_input__WEBPACK_IMPORTED_MODULE_5__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NumberValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgModel"], _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_6__["MatCheckbox"], _angular_material_select__WEBPACK_IMPORTED_MODULE_7__["MatSelect"], _angular_material_core__WEBPACK_IMPORTED_MODULE_8__["MatOption"], _ng_input_range_src_lib_ng_input_range_component__WEBPACK_IMPORTED_MODULE_2__["NgInputRangeComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroupDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControlName"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgIf"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_9__["AsyncPipe"]], styles: [".example-section[_ngcontent-%COMP%] {\n  display: flex;\n  align-content: center;\n  align-items: center;\n  height: 60px;\n}\n\n.example-margin[_ngcontent-%COMP%] {\n  margin: 8px;\n}\n\n.mat-slider-horizontal[_ngcontent-%COMP%] {\n  width: 300px;\n}\n\n.mat-slider-vertical[_ngcontent-%COMP%] {\n  height: 300px;\n}\n\n.mat-card[_ngcontent-%COMP%]    + .mat-card[_ngcontent-%COMP%] {\n  margin-top: 8px;\n}\n\n.example-result-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 8px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2FwcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7RUFDQSxxQkFBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtBQUNGOztBQUVBO0VBQ0UsV0FBQTtBQUNGOztBQUVBO0VBQ0UsWUFBQTtBQUNGOztBQUVBO0VBQ0UsYUFBQTtBQUNGOztBQUVBO0VBQ0UsZUFBQTtBQUNGOztBQUVBO0VBQ0UsYUFBQTtBQUNGIiwiZmlsZSI6ImFwcC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5leGFtcGxlLXNlY3Rpb24ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGhlaWdodDogNjBweDtcbn1cblxuLmV4YW1wbGUtbWFyZ2luIHtcbiAgbWFyZ2luOiA4cHg7XG59XG5cbi5tYXQtc2xpZGVyLWhvcml6b250YWwge1xuICB3aWR0aDogMzAwcHg7XG59XG5cbi5tYXQtc2xpZGVyLXZlcnRpY2FsIHtcbiAgaGVpZ2h0OiAzMDBweDtcbn1cblxuLm1hdC1jYXJkICsgLm1hdC1jYXJkIHtcbiAgbWFyZ2luLXRvcDogOHB4O1xufVxuXG4uZXhhbXBsZS1yZXN1bHQtY2FyZCBoMiB7XG4gIG1hcmdpbjogMCA4cHg7XG59XG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.scss'],
            }]
    }], null, { inputRange: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: [_ng_input_range_src_lib_ng_input_range_component__WEBPACK_IMPORTED_MODULE_2__["NgInputRangeComponent"]]
        }] }); })();


/***/ }),

/***/ "oAQa":
/*!**************************************************************************!*\
  !*** ./projects/ng-input-range-showcase/src/environments/environment.ts ***!
  \**************************************************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "tUT9":
/*!******************************************************************!*\
  !*** ./projects/ng-input-range/src/lib/ng-input-range.module.ts ***!
  \******************************************************************/
/*! exports provided: NgInputRangeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgInputRangeModule", function() { return NgInputRangeModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _ng_input_range_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ng-input-range.component */ "8bCD");







class NgInputRangeModule {
}
NgInputRangeModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: NgInputRangeModule });
NgInputRangeModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function NgInputRangeModule_Factory(t) { return new (t || NgInputRangeModule)(); }, imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"], _angular_material_input__WEBPACK_IMPORTED_MODULE_4__["MatInputModule"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__["MatFormFieldModule"]]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](NgInputRangeModule, { declarations: [_ng_input_range_component__WEBPACK_IMPORTED_MODULE_5__["NgInputRangeComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"], _angular_material_input__WEBPACK_IMPORTED_MODULE_4__["MatInputModule"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__["MatFormFieldModule"]], exports: [_ng_input_range_component__WEBPACK_IMPORTED_MODULE_5__["NgInputRangeComponent"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NgInputRangeModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [_ng_input_range_component__WEBPACK_IMPORTED_MODULE_5__["NgInputRangeComponent"]],
                imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"], _angular_material_input__WEBPACK_IMPORTED_MODULE_4__["MatInputModule"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__["MatFormFieldModule"]],
                exports: [_ng_input_range_component__WEBPACK_IMPORTED_MODULE_5__["NgInputRangeComponent"]],
            }]
    }], null, null); })();


/***/ }),

/***/ "yT8z":
/*!****************************************************************!*\
  !*** ./projects/ng-input-range-showcase/src/app/app.module.ts ***!
  \****************************************************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "mFjb");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var _material_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./material.module */ "WLc8");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _ng_input_range_src_lib_ng_input_range_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../ng-input-range/src/lib/ng-input-range.module */ "tUT9");









class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__["BrowserAnimationsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientModule"],
            _material_module__WEBPACK_IMPORTED_MODULE_4__["DemoMaterialModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
            _ng_input_range_src_lib_ng_input_range_module__WEBPACK_IMPORTED_MODULE_7__["NgInputRangeModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__["BrowserAnimationsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientModule"],
        _material_module__WEBPACK_IMPORTED_MODULE_4__["DemoMaterialModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
        _ng_input_range_src_lib_ng_input_range_module__WEBPACK_IMPORTED_MODULE_7__["NgInputRangeModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__["BrowserAnimationsModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                    _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientModule"],
                    _material_module__WEBPACK_IMPORTED_MODULE_4__["DemoMaterialModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
                    _ng_input_range_src_lib_ng_input_range_module__WEBPACK_IMPORTED_MODULE_7__["NgInputRangeModule"],
                ],
                providers: [],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]],
            }]
    }], null, null); })();


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map