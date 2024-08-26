import { isPlatformBrowser } from '@angular/common';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {

  constructor(private _TranslateService: TranslateService, @Inject(PLATFORM_ID) private platformId: any) { 
    _TranslateService.setDefaultLang("en");
    
    if(isPlatformBrowser(platformId)){
     this.setLanguage()
    }
  }

  changeLang(lang: string){
    localStorage.setItem('lang', lang);
    this.setLanguage()
  }

  setLanguage(){
    if(localStorage.getItem('lang') != null){
      let storedLang: string = localStorage.getItem('lang')!
      this._TranslateService.use(storedLang)
      if(storedLang == 'en')
      {
        document.body.dir = 'ltr'
        document.dir = 'ltr'
  
      }
      else if(storedLang == 'ar')
      {
        document.dir = 'rtl'
        document.body.dir = 'rtl'
      }
    }
   
  }
}
