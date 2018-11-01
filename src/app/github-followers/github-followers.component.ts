import { Component, OnInit } from '@angular/core';
import { GithubFollowersService } from '../github-followers.service';
import { ActivatedRoute } from '@angular/router';

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
    
    this.route.paramMap
      .subscribe(params =>{
      console.log(params);
      
    });
    
    this.route.queryParamMap
      .subscribe(qparams =>{
        console.log(qparams);

    });

    this.service.getAll().subscribe(followers =>this.followers = followers);
  }

}
