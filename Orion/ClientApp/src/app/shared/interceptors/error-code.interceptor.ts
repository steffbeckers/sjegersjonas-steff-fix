import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {ErrorCodeModalComponent} from "../modals/error-code-modal/error-code-modal.component";

@Injectable()
export class ErrorCodeInterceptor implements HttpInterceptor {

  constructor(private modalService: BsModalService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => this.handleError(err))
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if(error?.error?.errorCode) {
      const initialState: ModalOptions = {
        initialState: {
          errorCode: error.error.errorCode,
          message: error.error.message
        }
      };
      this.modalService.show(ErrorCodeModalComponent, initialState);
    }
    return throwError(error);
  }

}
