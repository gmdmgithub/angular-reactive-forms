import { AbstractControl, ValidationErrors } from "@angular/forms";

export class UserNameValidator{
    //simulation of calling the interface
    static userArray = ["adam","samsung","greg","moris"];
    
    static cannotContainSpace(control: AbstractControl): ValidationErrors|null{
        if((control.value as string).indexOf(' ') != -1){
            return {cannotContainSpace: true};
        }

        return null;
    }

    static shouldBeUnique(control: AbstractControl): 
        
    Promise<ValidationErrors | null>  {

        return new Promise((resolve, reject)=>{

            

            
            setTimeout( () =>{  
                if(UserNameValidator.userArray.includes(control.value as string)){
                    console.log('already exists');
                    
                    resolve ({shouldBeUnique: true});
                } else{
                    console.log('unique user');    
                    resolve (null);
                };
            },2000)

        })
    }
}