import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse
} from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { ErrorComponent } from "../error/error.component";
import { ErrorService } from "../error/error.service";
import { AuthService } from "../services/auth.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog, private errorService: ErrorService, private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(

      catchError((error: HttpErrorResponse) => {

        let errorMessage = "An unknown error occurred!";
        
        if( error.error.message && error.error.code === 403.1 ) {

          errorMessage = error.error.message;
          this.authService.signOut();

        } 
        else if (error.error.error_description) {

          errorMessage = error.error.error_description;

        }

        this.dialog.open(ErrorComponent, { disableClose: true, data: {message: errorMessage}});

        return throwError(error);

      })

    );
  }
}
