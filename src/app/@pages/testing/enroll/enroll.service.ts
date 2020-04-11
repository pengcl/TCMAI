import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';

import {StorageService} from '../../../@core/core/utils/storage.service';

@Injectable({providedIn: 'root'})
export class EnrollService {
    public redirectUrl = '/pages/testing/enroll';
    private enrollStatus = new Subject<boolean>();

    constructor(@Inject('PREFIX_URL') private PREFIX_URL, private http: HttpClient,
                private router: Router,
                private storage: StorageService) {
    }

    requestEnroll() {
        this.router.navigate([this.redirectUrl]);
    }

    enroll(enroll?) {
        if (enroll) {
            this.storage.set('enroll', JSON.stringify(enroll));
        } else if (enroll === null) {
            this.storage.remove('enroll');
        } else {
            const ENROLL = this.storage.get('enroll');
            if (ENROLL) {
                return JSON.parse(ENROLL);
            } else {
                return '';
            }
        }
    }

    get currentEnroll() {
        const enroll = this.storage.get('enroll');
        return JSON.parse(enroll);
    }

    get isEnrolled(): boolean {
        this.enrollStatus.next(!!this.currentEnroll);
        return !!this.currentEnroll;
    }

    getEnrollStatus(): Observable<boolean> {
        return this.enrollStatus.asObservable();
    }

    updateEnrollStatus(enroll) {
        this.storage.set('enroll', JSON.stringify(enroll));
        this.enrollStatus.next(this.isEnrolled);
    }
}
