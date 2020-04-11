import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';

import {StorageService} from '../../@core/core/utils/storage.service';

@Injectable({providedIn: 'root'})
export class TestingService {
    public redirectUrl: string;
    private answerStatus = new Subject<boolean>();

    constructor(@Inject('PREFIX_URL') private PREFIX_URL, private http: HttpClient,
                private router: Router,
                private storage: StorageService) {
    }

    requestAnswer() {
        if (this.router.url.indexOf('enroll') !== -1) {
            return false;
        }
        if (this.redirectUrl) {
            return false;
        }

        this.redirectUrl = this.router.url;
        this.router.navigate(['/pages/testing/enroll']);
    }

    login(body): Observable<any> {
        return this.http.post(this.PREFIX_URL + 'register', body);
    }

    answer(answer?) {
        if (answer) {
            this.storage.set('answer', JSON.stringify(answer));
        } else if (answer === null) {
            this.storage.remove('answer');
        } else {
            const ANSWER = this.storage.get('answer');
            if (ANSWER) {
                return JSON.parse(ANSWER);
            } else {
                return '';
            }
        }
    }

    get currentAnswer() {
        const answer = this.storage.get('answer');
        return JSON.parse(answer);
    }

    get isAnswered(): boolean {
        this.answerStatus.next(!!this.currentAnswer);
        return !!this.currentAnswer;
    }

    getAnswerStatus(): Observable<boolean> {
        return this.answerStatus.asObservable();
    }

    updateAnswerStatus(answer) {
        this.storage.set('answer', JSON.stringify(answer));
        this.answerStatus.next(this.isAnswered);
    }

    upload(body: { file: any, key?: string, type: string, dir: string }): Observable<any> {
        return this.http.post(this.PREFIX_URL + 'uploadFile', body);
    }
}
