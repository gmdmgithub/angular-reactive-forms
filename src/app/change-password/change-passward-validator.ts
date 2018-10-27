import { AbstractControl, ValidationErrors } from "@angular/forms";


export class ChangePasswardValidator {

     //simulation of calling the interface
     static userArray = ["adam","samsung","greg","moris"];

    static oldPasswardExists(control: AbstractControl): Promise<ValidationErrors | null>  {
    
        return new Promise((resolve, reject)=>{
         setTimeout( () =>{  
                if(ChangePasswardValidator.userArray.includes(control.value as string)){
                    console.log('OK','username correct');
                    resolve (null);
                } else{
                    console.log('wrong','username doesnt exist');  
                    resolve ({oldPasswardExists: true});  
                    
                };
            },2000)
        })
    }
}