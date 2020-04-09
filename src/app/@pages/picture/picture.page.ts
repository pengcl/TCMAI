import {Component, Inject} from '@angular/core';
import {CaptureService} from '../capture/capture.service';

@Component({
    selector: 'app-picture',
    templateUrl: 'picture.page.html',
    styleUrls: ['picture.page.scss']
})
export class PicturePage {
    picture;

    constructor(private captureSvc: CaptureService) {
    }

    ionViewDidEnter() {
        this.picture = this.captureSvc.currentPicture;
        alert(this.picture);
    }

    ionViewDidLeave() {
    }

}
