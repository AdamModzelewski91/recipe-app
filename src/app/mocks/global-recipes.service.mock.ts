import { signal } from '@angular/core';
import { of } from 'rxjs';

export const GlobalRecipesServiceMock = jasmine.createSpyObj(
  'GlobalRecipesService',
  ['voteRecipe', 'getGlobalList', 'searchRecipes', 'getPhotos', 'pagination'],
);

GlobalRecipesServiceMock.voteRecipe.and.returnValue(of([]));
GlobalRecipesServiceMock.getGlobalList.and.returnValue(of([]));
GlobalRecipesServiceMock.pagination = signal({
  previousPageIndex: 0,
  pageIndex: 0,
  pageSize: 10,
  length: 25,
});
