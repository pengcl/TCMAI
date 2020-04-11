import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {StorageService} from '../../../@core/core/utils/storage.service';
import {AuthService} from '../auth.service';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {DialogService} from '../../../@core/modules/dialog';

@Component({
    selector: 'app-auth-login',
    templateUrl: './login.page.html',
    styleUrls: ['../auth.page.scss']
})
export class AuthLoginPage {
    form: FormGroup;
    visibility = false;
    constructor(private router: Router,
                private statusBar: StatusBar,
                private storageSvc: StorageService,
                private dialogSvc: DialogService,
                private authSvc: AuthService) {
        this.form = new FormGroup({
            account: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(64)]),
            pwd: new FormControl('', [Validators.required])
        });
    }

    ionViewDidEnter() {
    }

    ionViewDidLeave() {
        this.statusBar.styleBlackTranslucent();
    }

    login() {

        this.authSvc.login(this.form.value).subscribe(res => {
            // 设置用户Token信息
            if (res.code === '0000') {
                this.authSvc.updateLoginStatus(res.result);
                this.router.navigate(['/pages/index']);
            }
        });

    }

}
