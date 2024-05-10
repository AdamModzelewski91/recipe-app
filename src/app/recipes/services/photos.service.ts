import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GetPhotos, Photos } from '../models/recipe.model';
import { environment } from '../../../environments/environment';
import {
  LoadingBar,
  SkipLoading,
} from '../../shared/interceptors/loading.interceptor';

const APIUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class PhotosService {
  constructor(private http: HttpClient) {}

  getPhotos(id: string): Observable<Photos[]> {
    return this.http
      .get<
        GetPhotos[]
      >(APIUrl + '/photos/' + id, { context: new HttpContext().set(SkipLoading, true).set(LoadingBar, true) })
      .pipe(
        map((photos) => {
          const img: Photos[] = [];
          for (let photo of photos) {
            img.push({
              name: photo.originalname,
              img: `data:${photo.mimetype};base64,` + photo.buffer,
              id: photo.id,
            });
          }
          return img;
        }),
      );
  }
}
