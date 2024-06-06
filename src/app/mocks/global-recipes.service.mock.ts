
import { Injectable, signal } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalRecipesServiceMock {
  // Mocking the getData method with a predefined Observable

  pagination = signal<PageEvent>({
    previousPageIndex: 0,
    pageIndex: 0,
    pageSize: 10,
    length: 25,
  });

  getGlobalList() {
    return of([]);
  }
}