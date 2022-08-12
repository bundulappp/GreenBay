import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { SnackBarService } from '../services/snack-bar.service';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(
    private snackBar: SnackBarService,
    private authService: AuthenticationService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      map((event) => {
        if (event instanceof HttpResponse) {
          if (event.statusText !== 'OK') {
            this.snackBar.showSuccessMessage(event.statusText);
          }
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        const { message } = error.error;
        const statusCode = error.status;

        if (statusCode === 401) {
          this.authService.logout();
        }

        this.snackBar.showErrorMessage(message);

        throw Error(message);
      })
    );
  }
}
