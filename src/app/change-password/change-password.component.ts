import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ChangePasswordValidator } from './change-passward-validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  passNotMatch = false;
  form = new FormGroup({
    'old-password': new FormControl('',[Validators.required],ChangePasswordValidator.oldPasswardExists),
    'newPassword': new FormControl ('',[Validators.required, Validators.minLength(7)]),
    'new-pass2': new FormControl ('',[Validators.required, Validators.minLength(7)])
  },
    ChangePasswordValidator.passwordShoulMatch
  );
  
  get newPassword(){
    return this.form.get('newPassword');
  }
  get pass2(){    
    return this.form.get('new-pass2');
  }

  onSubmit(){
    //console.log(this.pass1, this.pass2,this.pass1 != this.pass2);
    this.passNotMatch = this.newPassword.value !== this.pass2.value;
  }

}
