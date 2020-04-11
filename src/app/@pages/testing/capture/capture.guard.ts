import {Injectable} from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  CanLoad,
  Route, ActivatedRoute
} from '@angular/router';
import {CaptureService} from './capture.service';

@Injectable()
export class CaptureGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private captureSvc: CaptureService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const url: string = state.url;
    return this.checkPicture(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {

    const url = `/${route.path}`;
    return this.checkPicture(url);
  }

  checkPicture(url: string): boolean {

    if (this.captureSvc.isPictured) {
      return true;
    }

    this.captureSvc.redirectUrl = url;

    this.router.navigate(['/pages/capture']);

    return false;
  }
}
