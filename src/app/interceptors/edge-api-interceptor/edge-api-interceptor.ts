import { Injectable } from '@angular/core';

import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class EdgeApiInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // NOTE: Not best practice. Use a config service to pull JSON file instead
    // done out of haste
    const url = `http://localhost:8080`;
    // console.log('edge api interceptor');
    return next.handle(req.clone({url: `${url}${req.url}`}));
  }

}
