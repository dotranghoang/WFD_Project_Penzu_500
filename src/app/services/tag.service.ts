import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Tag} from './tag';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private tagUrl = 'http://localhost:8080/api/auth/tag/';
  constructor(private http: HttpClient) { }

  getTagList(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.tagUrl);
  }

  editTag(tag: Tag): Observable<Tag> {
    return this.http.put<Tag>(this.tagUrl + tag.id, tag);
  }

  deleteTag(id: string): Observable<void> {
    return this.http.delete<void>(this.tagUrl + id);
  }

  createTag(tag: Tag): Observable<Tag> {
    return this.http.post<Tag>(this.tagUrl, tag);
  }
}
