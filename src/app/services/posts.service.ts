import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../common/data.service';

@Injectable()
export class PostsService extends DataService{

  constructor(http: HttpClient) {
    super('https://jsonplaceholder.typicode.com/posts', http);
   }
  
}
