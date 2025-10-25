import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicPage {

  private fb = inject(FormBuilder);
  formUtils = FormUtils;


  myForm:FormGroup = this.fb.group({
    name: ['' , /**validadores sincronos */[Validators.required, Validators.minLength(3)],  /**validadores asincronos */[]],
    price: [0, [Validators.required, Validators.min(10)]],
    inStorage: [0, [Validators.required, Validators.min(0)]]
  })




  onSave () {
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return
    }

    this.myForm.reset();

  }


  //! podria usarse tambien creando e inyectando un servicio

  // isValidField(fieldName:string):boolean|null{

    //retorna la existencia del objeto como valor booleano
    //si existe se niega con false y se vuelve a negar para retornar true
    //indicando la existencia del campo
  //   return (
  //         this.myForm.controls[fieldName].errors &&
  //         this.myForm.controls[fieldName].touched
  //   )


  // }

  // getFieldError(fieldName:string):string|null{


  //   if(!this.myForm.controls[fieldName])return null;

  //   const errors = this.myForm.controls[fieldName].errors ?? {};


  //   for(const key of Object.keys(errors)){
  //     switch(key){
  //       case 'required':
  //           return 'Este campo es requerido';
  //       case 'minlength':
  //           return `El campo requiere al menos ${errors[key].requiredLength} caracteres`;
  //       case 'min':
  //           return `Se necesita un valor de al menos: ${errors[key].min}`
  //     }
  //   }

  //   return null;


  // }


  // ! Form group form
  // myForm = new FormGroup({
  //   name: new FormControl<string>(''),
  //   price: new FormControl<number>(0),
  //   inStorage: new FormControl<number>(0),
  // })


 }
