import { TestBed } from '@angular/core/testing';

import { PhotosService } from './photos.service';
import { provideHttpClient } from '@angular/common/http';

describe('PhotosService', () => {
  let service: PhotosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient()
      ]
    });
    service = TestBed.inject(PhotosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
