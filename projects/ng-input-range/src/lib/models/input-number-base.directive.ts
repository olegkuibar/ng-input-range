import {Directive, Input} from "@angular/core";

@Directive()
export abstract class InputNumberBase {
  @Input() min: number;
  @Input() max: number;
  @Input() minLength: number;
  @Input() maxLength: number;
  @Input() size: number;
  @Input() step: number;
}
