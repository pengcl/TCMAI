import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {StorageService} from '../../../@core/core/utils/storage.service';
import {PickerService} from '../../../@core/modules/picker';
import {AuthService} from '../auth.service';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {ToastService} from '../../../@core/modules/toast';
import {DialogService} from '../../../@core/modules/dialog';
import {getIndex} from '../../../utils/utils';

import {COUNTRIES} from '../../../@core/data/countries';

@Component({
    selector: 'app-auth-register',
    templateUrl: './register.page.html',
    styleUrls: ['../auth.page.scss']
})
export class AuthRegisterPage {
    form: FormGroup;
    visibility = false;

    constructor(private router: Router,
                private statusBar: StatusBar,
                private storageSvc: StorageService,
                private pickerSvc: PickerService,
                private toastSvc: ToastService,
                private dialogSvc: DialogService,
                private authSvc: AuthService) {
        this.form = new FormGroup({
            account: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(64)]),
            areaCode: new FormControl('62', [Validators.required]),
            phone: new FormControl('', [Validators.required]),
            pwd: new FormControl('', [Validators.required]),
            confirmPwd: new FormControl('', [Validators.required])
        });
    }

    ionViewDidEnter() {
    }

    picker() {
        const areaCodeControl = this.form.get('areaCode');
        const index = areaCodeControl.value ? getIndex(COUNTRIES, 'value', areaCodeControl.value) : 0;
        this.pickerSvc.show([COUNTRIES],
            '',
            [index]).subscribe(res => {
            areaCodeControl.setValue(res.value);
        });
    }

    ionViewDidLeave() {
        this.statusBar.styleBlackTranslucent();
    }

    register() {
        if (this.form.invalid) {
            return false;
        }
        this.toastSvc.loading('Registering...', 0);
        this.authSvc.register(this.form.value).subscribe(res => {
            // 设置用户Token信息
            this.toastSvc.hide();
            if (res.code === '0000') {
                this.authSvc.updateLoginStatus(res.result);
                this.router.navigate(['/pages/index']);
            }
        });
    }

}
