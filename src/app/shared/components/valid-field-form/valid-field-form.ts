import { ChangeDetectionStrategy, Component, effect, Input, input, OnInit, signal } from '@angular/core';
import { FormUtils } from '../../../utils/form-utils';
import { AbstractControl, FormGroup } from '@angular/forms';
import { NgIf } from '@angular/common';
import { merge, Subscription } from 'rxjs';

@Component({
  selector: 'app-valid-field-form',
  imports: [],
  templateUrl: './valid-field-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidFieldForm {
    //! revisar imp
    //! utilizar inputs clasicos en lugar de signals

  formUtils = FormUtils;
  @Input() fieldName !: string;
  @Input() myForm!: FormGroup;



  showError = signal(false);
  errorMessage = signal<string | null>(null);

  ngOnInit() {
  const control = this.myForm.get(this.fieldName);
  if (control) {
    merge(control.valueChanges, control.statusChanges).subscribe(() => {
      this.showError.set(!!(control.touched && control.errors));
      this.errorMessage.set(FormUtils.getFieldError(this.myForm, this.fieldName));
    });
  }
}





}
