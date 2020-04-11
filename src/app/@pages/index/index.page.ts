import {Component} from '@angular/core';
import {TabsService} from '../../tabs/tabs.service';

@Component({
    selector: 'app-index',
    templateUrl: 'index.page.html',
    styleUrls: ['index.page.scss']
})
export class IndexPage {

    constructor(private tabsSvc: TabsService) {
    }

    ionViewDidEnter() {
        this.tabsSvc.set(true);
    }

    ionViewDidLeave() {
    }

}
