import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GeoService} from '../data/geo.service';
import {AuthService} from '../../@pages/auth/auth.service';
import {Md5} from 'md5-typescript';

const createNonceStr = () => {
  return Math.random().toString(36).substr(2, 15);
};

const createTimestamp = () => {
  return parseInt((new Date().getTime()).toString(), 10).toString();
};

const raw = (data) => {
  let arr = Object.keys(data);
  arr = arr.sort();

  let str = '';
  for (const i in arr) {
    if (data[arr[i]] !== null) {
      str += '&' + arr[i] + '=' + data[arr[i]];
    }
  }

  return str;
};
const sign = (timestamp, nonce, token, securityKey, data) => {// 生成签名
  let str = data ? raw(data) : '';
  str = timestamp + nonce + token + securityKey + str;
  return Md5.init(str);
};

@Injectable()
export class JwtInterceptors implements HttpInterceptor {
  constructor(private authSvc: AuthService, private geoSvc: GeoService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authSvc.user() ? this.authSvc.user().SalerToken : '';
    const timestamp = createTimestamp();
    const nonce = createNonceStr();
    const geo = this.geoSvc.get();
    const JWT: any = {};
    JWT.SalerToken = token;
    JWT.timestamp = timestamp;
    JWT.nonce = nonce;
    if (geo) {
      req.body.location_latitude = geo.lat + '';
      req.body.location_longitude = geo.lng + '';
    }
    JWT.signature = sign(timestamp, nonce, token, 'nwscxsj7200d78976155', req.body);
    req = req.clone({
      setHeaders: JWT
    });
    return next.handle(req);
  }

}
