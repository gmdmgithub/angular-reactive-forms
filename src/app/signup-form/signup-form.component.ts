import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { UserNameValidator } from './username.validator';

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {
  form = new FormGroup({
    'account': new FormGroup({
      'username':new FormControl('',[
            Validators.required,
            Validators.minLength(3),
            UserNameValidator.cannotContainSpace 
        ],
        UserNameValidator.shouldBeUnique),//IMPORTANT as a third paramiter async!!

      'passward':new FormControl('',Validators.required)
    })
  });

  get username(){
    return this.form.get('account.username');
  }

  login(){

    // let isValied = authService.login(this.form.value);
    // if(!isValied){
      //this.username.setErrors();
      this.form.setErrors({invaliedLogin:true});
    // }
  }

}
