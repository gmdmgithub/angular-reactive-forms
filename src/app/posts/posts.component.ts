import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostsService } from '../services/posts.service';
import { error } from '@angular/compiler/src/util';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadImputError } from '../common/bad-input';


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
      }
      //now we have AppErrorHandler class
      // ,error=>{
      //   alert(error.message)
      //   console.log('unexpected error',error);
        
      // }
        );
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
      
    },
    (error: AppError) =>{
      if(error instanceof BadImputError){
        alert('Bad imput error');
      } else throw error;
    })
  }

  editPost(post){
    
    this.service.updatePost(post)
      .subscribe(response =>{
      console.log(response);
      
    },
    (error: AppError) =>{
        if(error instanceof NotFoundError){
          alert('Post already removed or change from the server');
        } else throw error;
      }
    );
  }

  deletePost(post){
    
    this.service.deletePost(post.id)
    // this.service.deletePost(392) //to force an error
        .subscribe(response =>{
              console.log(response);
              let index = this.posts.indexOf(post);

              this.posts.splice(index,1);
            
            },
            // (error: Response) =>{
              //without AppError
              // if(error.status === 404){
              //   alert('Post already removed from the server')
              //   console.log(error);
              // }else{
              //   console.log(error);      
              // }
            //} 
            (error: AppError) =>{
                if(error instanceof NotFoundError){
                  alert('Post already removed from the server');
                } else throw error;
            }
        );
  }
}
