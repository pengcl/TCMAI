import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators, FormGroupDirective, NgForm} from '@angular/forms';
import {Router} from '@angular/router';

import {StorageService} from '../../../@core/core/utils/storage.service';
import {AuthService} from '../auth.service';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {DialogService} from '../../../@core/modules/dialog';

import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}


declare var qq: any;
declare var $: any;

@Component({
    selector: 'app-auth-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss']
})
export class AuthLoginPage {
    form: FormGroup;
    visibility = false;
    geo;
    matcher = new MyErrorStateMatcher();

    constructor(private router: Router,
                private statusBar: StatusBar,
                private storageSvc: StorageService,
                private dialogSvc: DialogService,
                private authSvc: AuthService) {
        this.form = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(64)]),
            sex: new FormControl('', [Validators.required]),
            age: new FormControl('', [Validators.required]),
            phone: new FormControl('', [Validators.required, Validators.maxLength(20)]),
            email: new FormControl('', [Validators.email]),
            location: new FormControl('', [Validators.required]),
            areaCode: new FormControl('', [Validators.required])
        });
    }

    ionViewDidEnter() {
        $('#phone').intlTelInput({
            utilsScript: '/assets/js/build/js/utils.js',
            preferredCountries: ['id'],
            nationalMode: true,
            autoPlaceholder: 'polite'
        });
        this.statusBar.styleDefault();
        this.getPosition();
    }

    ionViewDidLeave() {
        this.statusBar.styleBlackTranslucent();
    }

    getPosition() {
        const geo = new qq.maps.Geolocation('PDBBZ-2NVWV-7GAPA-UKVP5-YED6S-FRB6L', 'danius');
        geo.getIpLocation((position) => {
            /*if (position) {
                this.dialogSvc.show({
                    content: 'Successful positioning！', cancel: '', confirm: 'I know'
                }).subscribe();
            }*/
            const body = {
                lat: JSON.parse(JSON.stringify(position)).lat,
                lng: JSON.parse(JSON.stringify(position)).lng
            };
            this.geo = body;
            this.form.get('location').setValue(this.geo);
            console.log(this.geo);
        }, (err) => {
            console.log(err);
            this.dialogSvc.show({content: JSON.stringify(err), cancel: '', confirm: 'I know'}).subscribe();
        }, {failTipFlag: true});
    }

    login() {
        const areaCode = $('#phone').intlTelInput('getSelectedCountryData').dialCode;
        this.form.get('areaCode').setValue(areaCode);
        this.form.markAllAsTouched();
        if (this.form.invalid) {
            return false;
        }

        this.authSvc.login(this.form.value).subscribe(res => {
            // 设置用户Token信息
            console.log(res);
            if (res.code === '0000') {
                this.authSvc.updateLoginStatus(res.result);
                this.router.navigate(['/pages/capture']);
            }
        });

    }

}
