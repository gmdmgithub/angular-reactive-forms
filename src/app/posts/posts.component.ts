import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ResponseOptions, Response} from '@angular/http';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: any []=[];
  private url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {

    http.get(this.url)  
      .subscribe( (response : any[]) =>{
        this.posts = response;
        console.log(this.posts); 
      });
   }
  
  ngOnInit() {
  }

  creatNewPost(input:HTMLInputElement){
    let post= {title: input.value};
    this.http.post(this.url,JSON.stringify(post))
    .subscribe((response : {id:any}) =>{
      //console.log(response);
      post['id'] = response.id;
      input.value ='';
      this.posts.splice(0,0,post);      
      console.log(post);
      
    })
  }

  editPost(post){
    
    this.http.patch(this.url+'/'+ post.id,JSON.stringify({isRead:true})).subscribe(response =>{
      console.log(response);
      
    });
  }

  deletePost(post){
    
    this.http.delete(this.url+'/'+ post.id).subscribe(response =>{
      console.log(response);
      let index = this.posts.indexOf(post);

      this.posts.splice(index,1);
      
    });
  }

}
