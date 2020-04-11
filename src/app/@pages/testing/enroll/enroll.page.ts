import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators, FormGroupDirective, NgForm} from '@angular/forms';
import {Router} from '@angular/router';

import {StorageService} from '../../../@core/core/utils/storage.service';
import {TabsService} from '../../../tabs/tabs.service';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {DialogService} from '../../../@core/modules/dialog';
import {PickerService} from '../../../@core/modules/picker';
import {EnrollService} from './enroll.service';

import {ErrorStateMatcher} from '@angular/material/core';
import {getIndex} from '../../../utils/utils';
import {COUNTRIES} from '../../../@core/data/countries';

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
    selector: 'app-testing-enroll',
    templateUrl: './enroll.page.html',
    styleUrls: ['../testing.page.scss', './enroll.page.scss']
})
export class TestingEnrollPage {
    form: FormGroup;
    visibility = false;
    geo;
    matcher = new MyErrorStateMatcher();
    selectedType = 'test';

    constructor(private router: Router,
                private statusBar: StatusBar,
                private storageSvc: StorageService,
                private tabsSvc: TabsService,
                private pickerSvc: PickerService,
                private dialogSvc: DialogService,
                private enrollSvc: EnrollService) {
        this.form = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(64)]),
            sex: new FormControl('', [Validators.required]),
            age: new FormControl('', [Validators.required]),
            phone: new FormControl('', [Validators.required, Validators.maxLength(20)]),
            email: new FormControl('', [Validators.email]),
            location: new FormControl('', [Validators.required]),
            areaCode: new FormControl('62', [Validators.required])
        });
    }

    ionViewDidEnter() {
        this.tabsSvc.set(false);
        $('#phone').intlTelInput({
            utilsScript: '/assets/js/build/js/utils.js',
            preferredCountries: ['id'],
            nationalMode: true,
            autoPlaceholder: 'polite'
        });
        this.statusBar.styleDefault();
        this.getPosition();
    }

    segmentChanged(e) {
        this.selectedType = e.detail.value;
    }

    ionViewDidLeave() {
        this.statusBar.styleBlackTranslucent();
    }

    getPosition() {
        const geo = new qq.maps.Geolocation('PDBBZ-2NVWV-7GAPA-UKVP5-YED6S-FRB6L', 'danius');
        geo.getIpLocation((position) => {
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

    picker() {
        const areaCodeControl = this.form.get('areaCode');
        const index = areaCodeControl.value ? getIndex(COUNTRIES, 'value', areaCodeControl.value) : 0;
        this.pickerSvc.show([COUNTRIES],
            '',
            [index]).subscribe(res => {
            areaCodeControl.setValue(res.value);
        });
    }

    submit() {
        this.form.markAllAsTouched();
        if (this.form.invalid) {
            return false;
        }
        this.enrollSvc.updateEnrollStatus(this.form.value);
        this.router.navigate(['/pages/testing/test', 0]);

    }

}
