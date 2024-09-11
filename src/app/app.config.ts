import {ApplicationConfig, provideZoneChangeDetection, isDevMode} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideStore, StoreModule} from '@ngrx/store';
import {BookReducer} from "./books/book.reducer";
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {provideEffects} from "@ngrx/effects";
import {BookEffects} from "./books/book.effects";

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes), provideStore({book: BookReducer}), provideEffects(BookEffects), provideStoreDevtools({
    maxAge: 25,
    logOnly: !isDevMode()
  })]
};
