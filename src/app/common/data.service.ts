
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadInputError } from "../common/BadInputError";

@Injectable()
export class DataService {

  //private url;

  constructor(private url: string, private http: HttpClient) { }

  getAll(){
    return this.http.get(this.url);
  }
  create(resource){
    return this.http.post(this.url,JSON.stringify(resource)).pipe(
      catchError(
          (error: Response, caught) => {
              if (error.status === 400) {
                  return throwError(new BadInputError(error.json()));
              }
              return throwError(new AppError(error));
      }));
  }
  updatet(resource){
    return this.http.patch(this.url+'/'+ resource.id,JSON.stringify({isRead:true})).pipe(
      catchError(
          (error: Response, caught) => {
            return this.handleError( error, 404) ;
      }));
  }

  delete(id){
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
