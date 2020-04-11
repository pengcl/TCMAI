import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';

import {StorageService} from '../../@core/core/utils/storage.service';

@Injectable({providedIn: 'root'})
export class AuthService {
    public loginRedirectUrl: string;
    private loginStatus = new Subject<boolean>();

    constructor(@Inject('PREFIX_URL') private PREFIX_URL, private http: HttpClient,
                private router: Router,
                private storage: StorageService) {
    }

    sign(): Observable<any> {
        return this.http.post(this.PREFIX_URL + '/api/Saler/SalerDaka', {});
    }

    requestAuth() {
        if (this.router.url.indexOf('auth') !== -1) {
            return false;
        }
        if (this.loginRedirectUrl) {
            return false;
        }

        this.loginRedirectUrl = this.router.url;
        this.router.navigate(['/pages/auth']);
    }

    login(body: { account: string, pwd: string }): Observable<any> {
        return this.http.post(this.PREFIX_URL + 'login', body);
    }

    register(body: { account: string, pwd: string, phone: string, areaCode: string }): Observable<any> {
        return this.http.post(this.PREFIX_URL + 'register', body);
    }

    resetPwd(body): Observable<any> {
        return this.http.post(this.PREFIX_URL + '/api/Saler/ModifyPassword', body);
    }

    logout() {
        this.storage.clear();
        this.router.navigate(['/pages/auth']);
    }

    user(user?) {
        if (user) {
            this.storage.set('user', JSON.stringify(user));
        } else if (user === null) {
            this.storage.remove('user');
        } else {
            const USER = this.storage.get('user');
            if (USER) {
                return JSON.parse(USER);
            } else {
                return '';
            }
        }
    }

    get currentUser() {
        const user = this.storage.get('user');
        return JSON.parse(user);
    }

    get isLogged(): boolean {
        this.loginStatus.next(!!this.currentUser);
        return !!this.currentUser;
    }

    getLoginStatus(): Observable<boolean> {
        return this.loginStatus.asObservable();
    }

    updateLoginStatus(user) {
        this.storage.set('user', JSON.stringify(user));
        this.loginStatus.next(this.isLogged);
    }
}
