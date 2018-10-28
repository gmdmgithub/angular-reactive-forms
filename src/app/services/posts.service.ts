import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  getPosts(){
    return this.http.get(this.url);
  }
  createNewPost(post){
    return this.http.post(this.url,JSON.stringify(post));
  }
  updatePost(post){
    return this.http.patch(this.url+'/'+ post.id,JSON.stringify({isRead:true}));
  }

  deletePost(id){
    return this.http.delete(this.url+'/'+ id).pipe(
      catchError(
          (error: Response, caught) => {
              if (error.status === 404) {
                  return throwError(new NotFoundError());
              }
              return throwError(new AppError(error));
      }))
  }
}
