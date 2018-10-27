import { AbstractControl, ValidationErrors } from "@angular/forms";


export class ChangePasswordValidator {

     //simulation of calling the interface
     static userArray = ["adam","samsung","greg","moris"];

    static oldPasswardExists(control: AbstractControl): Promise<ValidationErrors | null>  {
    
        return new Promise((resolve, reject)=>{
         setTimeout( () =>{  
                if(ChangePasswordValidator.userArray.includes(control.value as string)){
                    console.log('OK','username correct');
                    resolve (null);
                } else{
                    console.log('wrong','username doesnt exist');  
                    resolve ({oldPasswardExists: true});  
                    
                };
            },2000)
        })
    }

    static passwordShoulMatch(control:AbstractControl){
        
        if(control.get('newPassword').value !== control.get('new-pass2').value){
            console.log('INFO','invalied passwords');
            return {passwordShoulMatch:true};
        }
        return null;
    }
}