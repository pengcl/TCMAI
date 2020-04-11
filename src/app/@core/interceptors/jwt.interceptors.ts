import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GeoService} from '../data/geo.service';
import {AuthService} from '../../@pages/auth/auth.service';

@Injectable()
export class JwtInterceptors implements HttpInterceptor {
  constructor(private authSvc: AuthService, private geoSvc: GeoService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const key = this.authSvc.user() ? this.authSvc.user().key : '';
    const JWT: any = {};
    JWT.key = key;
    req = req.clone({
      setHeaders: JWT
    });
    return next.handle(req);
  }

}
