import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';

import {StorageService} from '../../../@core/core/utils/storage.service';

@Injectable({providedIn: 'root'})
export class CaptureService {
    public redirectUrl: string;
    private pictureStatus = new Subject<boolean>();

    constructor(@Inject('PREFIX_URL') private PREFIX_URL, private http: HttpClient,
                private router: Router,
                private storage: StorageService) {
    }

    requestPicture() {
        if (this.router.url.indexOf('capture') !== -1) {
            return false;
        }
        if (this.redirectUrl) {
            return false;
        }

        this.redirectUrl = this.router.url;
        this.router.navigate(['/pages/capture']);
    }

    take(body): Observable<any> {
        return this.http.post(this.PREFIX_URL + 'register', body);
    }

    clean() {
        this.storage.clear();
        this.router.navigate(['/pages/capture']);
    }

    picture(picture?) {
        if (picture) {
            this.storage.set('picture', picture);
        } else if (picture === null) {
            this.storage.remove('picture');
        } else {
            const PICTURE = this.storage.get('picture');
            if (PICTURE) {
                return PICTURE;
            } else {
                return '';
            }
        }
    }

    get currentPicture() {
        const picture = this.storage.get('picture');
        return picture;
    }

    get isPictured(): boolean {
        this.pictureStatus.next(!!this.currentPicture);
        return !!this.currentPicture;
    }

    getPictureStatusStatus(): Observable<boolean> {
        return this.pictureStatus.asObservable();
    }

    updatePictureStatus(picture) {
        this.storage.set('picture', JSON.stringify(picture));
        this.pictureStatus.next(this.isPictured);
    }
}
