import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadImputError } from '../common/bad-input';

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
    return this.http.post(this.url,JSON.stringify(post)).pipe(
      catchError(
          (error: Response, caught) => {
              if (error.status === 400) {
                  return throwError(new BadImputError(error.json()));
              }
              return throwError(new AppError(error));
      }));
  }
  updatePost(post){
    return this.http.patch(this.url+'/'+ post.id,JSON.stringify({isRead:true})).pipe(
      catchError(
          (error: Response, caught) => {
            return this.handleError( error, 404) ;
      }));
  }

  deletePost(id){
    return this.http.delete(this.url+'/'+ id).pipe(
      catchError(
          (error: Response, caught) => {
              return this.handleError( error, 404) ;
      }));
  }

  private handleError(error,ststus ){
    if (error.status === status) {
        return throwError(new NotFoundError());
    }
    return throwError(new AppError(error));
  }
}
