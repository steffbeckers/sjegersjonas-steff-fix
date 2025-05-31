import { HTTP_INTERCEPTORS } from '@angular/common/http';

import {ErrorCodeInterceptor} from './error-code.interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, multi: true, useClass: ErrorCodeInterceptor },
];
