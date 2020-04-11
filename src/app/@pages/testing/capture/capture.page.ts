import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions} from '@ionic-native/camera-preview/ngx';
import {TabsService} from '../../../tabs/tabs.service';
import {CaptureService} from './capture.service';

const cameraPreviewOpts: CameraPreviewOptions = {
    x: 0,
    y: 0,
    width: window.screen.width,
    height: window.screen.height,
    camera: 'front',
    tapPhoto: true,
    previewDrag: true,
    toBack: true,
    alpha: 1
};

// picture options
const pictureOpts: CameraPreviewPictureOptions = {
    width: window.screen.width,
    height: window.screen.height,
    quality: 85
};

@Component({
    selector: 'app-testing-capture',
    templateUrl: 'capture.page.html',
    styleUrls: ['../testing.page.scss', 'capture.page.scss']
})
export class TestingCapturePage {
    selectedType = 'test';
    picture;
    position = {
        x: 0,
        y: 0
    };

    constructor(private router: Router,
                private cameraPreview: CameraPreview,
                private tabsSvc: TabsService,
                private captureSvc: CaptureService) {
    }

    ionViewDidEnter() {
        this.tabsSvc.set(false);
        this.start();
    }

    segmentChanged(e) {
        this.selectedType = e.detail.value;
    }

    start() {
        this.cameraPreview.startCamera(cameraPreviewOpts).then((res) => {
            console.log(res);
        }, (err) => {
            console.log(err);
        });
    }

    // Switch camera
    switch() {
        this.cameraPreview.switchCamera().then();
    }

    capture() {
        this.cameraPreview.takeSnapshot(pictureOpts).then((imageData) => {
            this.picture = 'data:image/jpeg;base64,' + imageData;
            alert(this.picture);
            this.captureSvc.updatePictureStatus(this.picture);
            /*this.router.navigate(['/pages/picture']);*/
        }, (err) => {
            console.log(err);
            this.picture = 'assets/img/test.jpg';
        });
    }

    retry() {
        this.picture = null;
    }

    stop() {
        this.cameraPreview.stopCamera().then();
    }

    move(e) {
        let transform = e.source.element.nativeElement.style.transform;
        transform = transform.slice(transform.indexOf('(') + 1);
        transform = transform.slice(0, transform.indexOf(')'));
        transform = transform.split(',');
        this.position.x = parseInt(transform[0], 10);
        this.position.y = parseInt(transform[1], 10);
        console.log(this.position);
    }

    ionViewDidLeave() {
        this.stop();
    }

}
