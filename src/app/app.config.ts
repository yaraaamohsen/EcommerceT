import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, RouterModule, withViewTransitions, Routes } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { headerInterceptor } from './shared/interceptors/header.interceptor';
import { errorInterceptor } from './shared/interceptors/error.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loadingInterceptor } from './shared/interceptors/loading.interceptor';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export function HttpLoaderFactory(_HttpClient: HttpClient) {
  return new TranslateHttpLoader(_HttpClient, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withFetch(), withInterceptors([headerInterceptor, errorInterceptor, loadingInterceptor])),
   provideAnimations(), provideToastr(), provideRouter(routes, withViewTransitions()), provideClientHydration(),
    importProvidersFrom(NgxSpinnerModule ,HttpClientModule, BrowserAnimationsModule, ToastrModule, RouterModule, CarouselModule,
      TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  )]
};
