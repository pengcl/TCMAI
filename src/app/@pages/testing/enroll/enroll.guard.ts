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
import {EnrollService} from './enroll.service';

@Injectable()
export class EnrollGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private enrollSvc: EnrollService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const url: string = state.url;
    return this.checkEnroll(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {

    const url = `/${route.path}`;
    return this.checkEnroll(url);
  }

  checkEnroll(url: string): boolean {

    if (this.enrollSvc.isEnrolled) {
      return true;
    }

    this.enrollSvc.redirectUrl = url;

    this.router.navigateByUrl(this.enrollSvc.redirectUrl);

    return false;
  }
}
