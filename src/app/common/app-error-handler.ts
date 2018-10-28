import { ErrorHandler } from "@angular/core";

export class AppErrorHandler implements ErrorHandler {
    handleError(error) {
    //   TODO define Body
        alert('Unsexpected error');
        console.log(error);                  
    }
  }