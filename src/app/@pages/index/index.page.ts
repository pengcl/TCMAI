import {Component, Inject} from '@angular/core';

import {DatePipe} from '@angular/common';
import {MatTooltip} from '@angular/material';

@Component({
    selector: 'app-index',
    templateUrl: 'index.page.html',
    styleUrls: ['index.page.scss'],
    providers: [DatePipe, MatTooltip]
})
export class IndexPage {

    constructor(@Inject('PREFIX_URL') private PREFIX_URL) {
    }

    ionViewDidEnter() {
    }

    ionViewDidLeave() {
    }

}
