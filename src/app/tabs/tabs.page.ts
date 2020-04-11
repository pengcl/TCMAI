import {Component} from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import {LocationStrategy} from '@angular/common';
import {TabsService} from './tabs.service';
import {filter, map, mergeMap} from 'rxjs/operators';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss']
})
export class TabsPage {
    state;
    index = 0;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private location: LocationStrategy,
              private tabsSvc: TabsService) {
        tabsSvc.get().subscribe(res => {
            this.state = res;
        });
        router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(() => this.activatedRoute),
            map(route => {
                return route.root.firstChild.firstChild.firstChild;
            }),
            mergeMap(route => {
                return route.data;
            })
        ).subscribe(data => {
            this.index = data.index ? data.index : 0;
        });
    }

}
