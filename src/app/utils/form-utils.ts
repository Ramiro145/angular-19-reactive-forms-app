import { FormArray, FormGroup, ValidationErrors } from '@angular/forms';





export class FormUtils {

  // Expresiones regulares

  static getErrors (errors:ValidationErrors) {


    for(const key of Object.keys(errors)){
      switch(key){
        case 'required':
            return 'Este campo es requerido';
        case 'minlength':
            return `Se requieren al menos ${errors[key].requiredLength} campos`;
        case 'min':
            return `Se necesita un valor de al menos: ${errors[key].min}`
      }
    }

    return null;
  }

  static isValidField(form:FormGroup, fieldName:string):boolean|null{
    return !!form.controls[fieldName].errors && form.controls[fieldName].touched;
  }

  static getFieldError(form:FormGroup, fieldName:string):string | null{

    if(!form.controls[fieldName])return null;

    const errors = form.controls[fieldName].errors ?? {};

    return this.getErrors(errors);

  }

  static isValidFieldInArray (formArray:FormArray, index:number){
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    )
  }

  static getFieldErrorInArray (formArray:FormArray, index:number){

    if(formArray.controls.length === 0) return null;

    const errors = formArray.controls[index].errors ?? {};

    return this.getErrors(errors);

  }

  static getErrorsInArray (formArray:FormArray){

    const errors = formArray.errors ?? {};

    return this.getErrors(errors);

  }


}
