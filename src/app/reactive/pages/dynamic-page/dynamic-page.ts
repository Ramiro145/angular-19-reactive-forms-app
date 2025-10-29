
import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';
import { ValidFieldForm } from "../../../shared/components/valid-field-form/valid-field-form";

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicPage {

  private fb = inject(FormBuilder);
  formUtils = FormUtils;


  myForm:FormGroup = this.fb.group({
    name:['',[Validators.required, Validators.minLength(3)]],
    favoriteGames:this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required]
    ], Validators.minLength(3))
  });


  newFavoriteGame:FormControl = this.fb.control('',[Validators.required]);


  get favoriteGames(){
    //arreglo de controles
    return this.myForm.get('favoriteGames') as FormArray;
  }

  onAddToFavorites(){
    this.favoriteGames.markAsTouched();

    if(this,this.newFavoriteGame.invalid)return;

    const newGame = this.newFavoriteGame.value;

    this.favoriteGames.push(this.fb.control(newGame, Validators.required));

    this.newFavoriteGame.reset();
  }

  onDelete(index:number){

    this.favoriteGames.removeAt(index);

  }

  onSubmit(){
    this.myForm.markAllAsTouched();
    this.favoriteGames.clear();
    this.myForm.reset();

  }


}
