import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostsService } from '../services/posts.service';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: any []=[];
  
  constructor(private service: PostsService) {

   }
  
  ngOnInit() {
       
      this.service.getPosts().
        subscribe( (response : any[]) =>{
          this.posts = response;
          console.log(this.posts); 
      });
  }

  creatNewPost(input:HTMLInputElement){
    let post= {title: input.value};
    this.service.createNewPost(post)
    .subscribe((response : {id:any}) =>{
      //console.log(response);
      post['id'] = response.id;
      input.value ='';
      this.posts.splice(0,0,post);      
      console.log(post);
      
    })
  }

  editPost(post){
    
    this.service.updatePost(post)
      .subscribe(response =>{
      console.log(response);
      
    });
  }

  deletePost(post){
    
    this.service.deletePost(post)
    .subscribe(response =>{
      console.log(response);
      let index = this.posts.indexOf(post);

      this.posts.splice(index,1);
      
    });
  }

}
