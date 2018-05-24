import {Directive} from "@angular/core";
import {AbstractControl, NG_VALIDATORS, Validator} from "@angular/forms";
/**
 * Created by liufeng on 2018/5/24.
 */
@Directive({
  selector: '[unique]',
  providers: [{provide: NG_VALIDATORS, useExisting: GISDirective, multi: true}]
})
export class GISDirective implements Validator {

  validate(control: AbstractControl): { [key: string]: any } {
    return verifyUserName(control);
  }
}

function verifyUserName(control: AbstractControl) {
  return control.value === 'liufeng' ? {'unique': {value: control.value}} : null;
}


