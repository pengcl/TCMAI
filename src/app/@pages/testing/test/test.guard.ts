import {Injectable} from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild,
    CanLoad,
    Route
} from '@angular/router';
import {TestService} from './test.service';

@Injectable()
export class TestGuard implements CanActivate, CanActivateChild, CanLoad {
    constructor(private testSvc: TestService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        const url: string = state.url;
        return this.checkAnswer(parseInt(route.params.index, 10));
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    canLoad(route: Route): boolean {
        console.log(route);
        return this.checkAnswer(route);
    }

    checkAnswer(index): boolean {
        console.log(typeof index);
        if (!index) {
            return true;
        } else {
          if (this.testSvc.isAnswered) {
            return true;
          }
        }

        /*this.testSvc.redirectUrl = url;

        this.router.navigateByUrl(this.testSvc.redirectUrl);*/

        return false;
    }
}
