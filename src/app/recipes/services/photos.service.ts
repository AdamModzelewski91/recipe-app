import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GetPhotos, Photos } from '../models/recipe.type';
import { environment } from '../../../environments/environment';

const APIUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class PhotosService {
  constructor(private http: HttpClient) {}

  getPhotos(id: string): Observable<Photos[]> {
    return this.http.get<GetPhotos[]>(APIUrl + '/photos/' + id).pipe(
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
