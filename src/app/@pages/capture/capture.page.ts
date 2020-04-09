import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions} from '@ionic-native/camera-preview/ngx';
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
    selector: 'app-capture',
    templateUrl: 'capture.page.html',
    styleUrls: ['capture.page.scss']
})
export class CapturePage {
    picture;

    constructor(private router: Router, private cameraPreview: CameraPreview, private captureSvc: CaptureService) {
    }

    ionViewDidEnter() {
        this.start();
    }

    start() {
        this.cameraPreview.startCamera(cameraPreviewOpts).then((res) => {
            console.log(res);
        }, (err) => {
            console.log(err);
        });
    }

    take() {
        this.cameraPreview.takePicture(pictureOpts).then((imageData) => {
            this.picture = 'data:image/jpeg;base64,' + imageData;
            alert(this.picture);
            this.captureSvc.updatePictureStatus(this.picture);
            /*this.router.navigate(['/pages/picture']);*/
        }, (err) => {
            console.log(err);
            this.picture = 'assets/img/test.jpg';
        });
    }

    stop() {
        this.cameraPreview.stopCamera().then();
    }

    ionViewDidLeave() {
        this.stop();
    }

}
