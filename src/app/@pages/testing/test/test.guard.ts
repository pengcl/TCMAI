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
        console.log(parseInt(route.params.index, 10));
        return this.checkAnswer(parseInt(route.params.index, 10));
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    canLoad(route: Route): boolean {
        return this.checkAnswer(route);
    }

    checkAnswer(index): boolean {
        if (this.testSvc.isAnswered(index)) {
            return true;
        }

        return false;
    }
}
