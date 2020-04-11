import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';
import {Observable, Subject} from 'rxjs';

import {StorageService} from '../../../@core/core/utils/storage.service';

@Injectable({providedIn: 'root'})
export class TestService {
    public redirectUrl: string;
    private answerStatus = new Subject<boolean>();

    constructor(@Inject('PREFIX_URL') private PREFIX_URL, private http: HttpClient,
                private route: ActivatedRoute,
                private router: Router,
                private storage: StorageService) {
    }

    list(): Observable<any> {
        return this.http.post(this.PREFIX_URL + 'questionList', {});
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

    currentAnswer(index?) {
        const answer = JSON.parse(this.storage.get('answer'));
        return typeof index === 'number' ? answer[index] : answer;
    }

    isAnswered(index?): boolean {
        this.answerStatus.next(!!this.currentAnswer(index));
        return !!this.currentAnswer(index);
    }

    getAnswerStatus(): Observable<boolean> {
        return this.answerStatus.asObservable();
    }

    updateAnswerStatus(answer) {
        this.storage.set('answer', JSON.stringify(answer));
        this.answerStatus.next(this.isAnswered());
    }
}
