import {Component, Inject} from '@angular/core';
import {Router} from '@angular/router';

import {DatePipe} from '@angular/common';
import {MatTooltip} from '@angular/material';

@Component({
    selector: 'app-agreements',
    templateUrl: 'agreements.page.html',
    styleUrls: ['agreements.page.scss'],
    providers: [DatePipe, MatTooltip]
})
export class AgreementsPage {

    constructor(@Inject('PREFIX_URL') private PREFIX_URL) {
    }

    ionViewDidEnter() {
    }

    ionViewDidLeave() {
    }

}
