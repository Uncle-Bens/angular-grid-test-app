import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from '../../../models/items.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getRowData(): Observable<Item[]> {
    return this.http.get(environment.dataUrl).pipe(map((response: any) => {
        return response.items.map((i) => {
            return {
              imageUrl : i.snippet.thumbnails.default.url,
              publishDate : i.snippet.publishedAt,
              title: {
                text : i.snippet.title,
                url : `https://www.youtube.com/watch?v=${i.id.videoId}`
              },
              description: i.snippet.description
            } as Item;
          });
      }));
  }
}
