import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadImputError } from '../common/bad-input';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  
  posts;

  constructor(private service: PostsService) { }
  
  ngOnInit() {
      this.service.getAll().
        subscribe(posts => this.posts = posts);
  }

  creatNewPost(input:HTMLInputElement){
    let post= {title: input.value};
    this.posts.splice(0,0,post); //introduce optimistic transaction
    
    input.value ='';

    this.service.create(post)
    .subscribe((response : {id:any}) =>{
      //console.log(response);
      post['id'] = response.id;
      // this.posts.splice(0,0,post);   
    },
    (error: AppError) =>{
      
      //remove item (optimistic transaction)
      this.posts.splice(0,1);

      if(error instanceof BadImputError){
        alert('Bad imput error');
      } else throw error;
    })
  }

  editPost(post){
    
    this.service.updatet(post)
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
    
    this.service.delete(post.id)
    // this.service.deletePost(392) //to force an error
        .subscribe(() =>{
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
