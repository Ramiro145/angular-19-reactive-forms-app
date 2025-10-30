import { AbstractControl, FormArray, FormGroup, ValidationErrors } from '@angular/forms';





  async function sleep(){
    return new Promise (res => {
      setTimeout(() => {
        res(true);
      }, 2500);
    })
  }

export class FormUtils {


  // Expresiones regulares

  static namePattern = '^([a-zA-Z]+) ([a-zA-Z]+)$';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static getPatterns (pattern:string):string|null{

    switch(pattern){
      case this.namePattern:
        return `Se necesita un solo nombre y apellido`
      case this.emailPattern:
        return `Se necesita un formato de correo valido`
      case this.notOnlySpacesPattern:
        return `Los espacios no son validos`
    }

    return null;
  }

  static getErrors (errors:ValidationErrors) {


    for(const key of Object.keys(errors)){
      switch(key){
        case 'required':
            return 'Este campo es requerido';
        case 'minlength':
            return `Se requieren al menos ${errors[key].requiredLength} campos`;
        case 'min':
            return `Se necesita un valor de al menos: ${errors[key].min}`
        case 'email':
            return `Formato de email no valido`
        case 'passwordNotEqual':
            return `Las contrasenas deben ser iguales`
        case 'pattern':
            return this.getPatterns(errors[key].requiredPattern);
        case 'emailTaken':
            return `email ya registrado!`
        default:
          return `error de validacion no controlada: ${key}`
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


  static getErrorInFormGroup (formGroup: FormGroup){
    const errors = formGroup.errors ?? {};

    return this.getErrors(errors);
  }




  static isFieldOneEqualFieldTwo(field:string, field2:string){

    return (formGroup: AbstractControl) => {

      const fieldValue = formGroup.get(field)?.value;
      const field2Value = formGroup.get(field2)?.value;

      return fieldValue === field2Value ? null
      :
      {
        passwordNotEqual:true
      }

    }
  }


  static async checkingServerResponse(control:AbstractControl):Promise<ValidationErrors | null>{

    console.log('validando contra server');

    await sleep(); // esperar 2.5 seg

    const formValue = control.value;

    if(formValue === 'hola@mundo.com'){
      return{
        emailTaken:true
      }
    }

    return null;
  }


}
