import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Country } from '../../interfaces/country.interface';
import { filter, forkJoin, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule,JsonPipe],
  templateUrl: './country-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryPage {

  countryService = inject(CountryService);
  fb = inject(FormBuilder);


  regions = signal(this.countryService.regions);
  countriesByRegion = signal<Country[]>([]);
  borders = signal<Country[]>([]);

  myForm = this.fb.group({
    region: ['',Validators.required],
    country: ['',Validators.required],
    border: ['',Validators.required],
  })



  //? con signals
  onFormChanged = effect((onCleanup)=>{

    const regionSubscription = this.onRegionChanged();
    const countrySubscription = this.onCountryChanged();

    onCleanup(()=>{
      regionSubscription.unsubscribe();
      countrySubscription.unsubscribe();
    })
  })

  onRegionChanged(){

    return this.myForm.get('region')!.valueChanges
    .pipe(
      tap(() => this.myForm.get('country')!.setValue('')),
      tap(() => this.myForm.get('border')!.setValue('')),
      tap(() => {
        this.borders.set([]);
        this.countriesByRegion.set([]);
      }),
      switchMap((region)=> this.countryService.getCountriesByRegion(region ?? ''))
    )
    .subscribe((countries)=>{
      this.countriesByRegion.set(countries);
    });

  }

  onCountryChanged(){
    return this.myForm.get('country')!.valueChanges
    .pipe(
      tap(() => this.myForm.get('border')!.setValue('')),
      tap(() => this.borders.set([])),
      filter( value => value!.length > 0),
      switchMap((country) => this.countryService.getCountryByAlphaCode(country ?? '')),
      switchMap((country) => this.countryService.getCountryBorderByCodes(country.borders))
    )
    .subscribe((countries)=>{
      this.borders.set(countries);
    })
  }




  //!necesario limpiar sub
  // formRegionChanged = this.myForm.get('region')!.valueChanges.subscribe((value)=>{

  //   if(value)
  //   this.countryService.getCountriesByRegion(value).subscribe((resp)=>{
  //     this.countriesByRegion.set(resp);
  //   })

  // })

}
