import { Component, OnInit } from '@angular/core';
import { GithubFollowersService } from '../github-followers.service';
import { ActivatedRoute } from '@angular/router';

// import { Observable } from 'rxjs/Observable';
import {Observable} from 'rxjs/Rx'; //angular 6
//import 'rxjs/add/observable/combineLatest'; //factory method (static)
import { combineLatest } from 'rxjs';//angular 6

@Component({
  selector: 'github-followers',
  templateUrl: './github-followers.component.html',
  styleUrls: ['./github-followers.component.css']
})
export class GithubFollowersComponent implements OnInit {

  followers;

  constructor(
    private route: ActivatedRoute,
    private service:GithubFollowersService) { }

  ngOnInit() {
    
     Observable.combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ]).subscribe( combined => {      
      let id =  combined[0].get('id');
      let page =  combined[1].get('page');
      console.log(id, page);
      this.service.getAll().subscribe(followers =>this.followers = followers);
      
    });
    
    // this.route.paramMap
    //   .subscribe(params =>{
    //   console.log(params);
      
    // });
    
    // this.route.queryParamMap
    //   .subscribe(qparams =>{
    //     console.log(qparams);

    // });

    // this.service.getAll().subscribe(followers =>this.followers = followers);
  }

}
