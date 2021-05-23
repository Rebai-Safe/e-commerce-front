import { HttpErrorResponse } from "@angular/common/http";

/*
This class contains a method to handle errors
 */
export class ErrorHandler {

    handleError(errorResponse: HttpErrorResponse){4
    if(errorResponse.error instanceof ErrorEvent){
        console.error('Client SideError'+errorResponse.message);
        console.error('Server Side Error'+errorResponse);

    } else {
        return alert('please refresh the website again, maybe there are problems with the server')
    }
    }
}
