import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as bookActions from './book.actions'
import {BookService} from "./book.service";
import {mergeMap, map, catchError, of} from "rxjs";

@Injectable({providedIn: 'root'})
export class BookEffects {
  private actions$ = inject(Actions);
  private bookService = inject(BookService);

  // This is an NgRx Effect that responds to 'AddBook' actions.
// Bu, 'AddBook' aksiyonlarına cevap veren bir NgRx Effect'tir.
  addBook$ = createEffect(() => this.actions$.pipe(
    // Listen for actions of type 'AddBook'
    // 'AddBook' türündeki aksiyonları dinler.
    ofType(bookActions.AddBook),

    // For each 'AddBook' action, call 'addBook' on the book service.
    // 'mergeMap' allows multiple concurrent 'addBook' calls.
    // Her bir 'AddBook' aksiyonu için, book service'deki 'addBook' metodunu çağırır.
    // 'mergeMap', birden fazla eşzamanlı 'addBook' çağrısına izin verir.
    mergeMap((action) => this.bookService.addBook(action)
      .pipe(
        // If the 'addBook' call is successful, dispatch 'AddBookSuccess' action with the book data.
        // Eğer 'addBook' çağrısı başarılı olursa, kitap verisi ile birlikte 'AddBookSuccess' aksiyonunu gönderir.
        map(book => bookActions.AddBookSuccess(book)),

        // If the 'addBook' call fails, dispatch 'AddBookFailure' action with the error.
        // Eğer 'addBook' çağrısı başarısız olursa, hata ile birlikte 'AddBookFailure' aksiyonunu gönderir.
        catchError((error) => of(bookActions.AddBookFailure({ error })))
      )
    )
  ));

}
