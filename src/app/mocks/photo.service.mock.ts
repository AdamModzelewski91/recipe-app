import { of } from 'rxjs';

export const PhotosServiceMock = jasmine.createSpyObj('PhotosService', [
  'onVote',
  'getRecipes',
  'getPhotos',
  'onSearch',
  'handlePageEvent',
]);

PhotosServiceMock.getRecipes.and.returnValue(of([]));
