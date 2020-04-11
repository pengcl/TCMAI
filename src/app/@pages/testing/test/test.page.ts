import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {StorageService} from '../../../@core/core/utils/storage.service';
import {TabsService} from '../../../tabs/tabs.service';
import {TestService} from './test.service';

@Component({
    selector: 'app-testing-test',
    templateUrl: './test.page.html',
    styleUrls: ['../testing.page.scss', './test.page.scss']
})
export class TestingTestPage {
    selectedType = 'test';
    index = 0;
    questions = [];
    answer = {};
    form: FormGroup = new FormGroup({});

    constructor(private route: ActivatedRoute,
                private router: Router,
                private statusBar: StatusBar,
                private storageSvc: StorageService,
                private tabsSvc: TabsService,
                private testSvc: TestService) {
    }

    ionViewDidEnter() {
        this.tabsSvc.set(false);
        this.index = parseInt(this.route.snapshot.params.index, 10);
        this.testSvc.list().subscribe(res => {
            if (res.code === '0000') {
                this.questions = res.result;
                res.result.forEach(item => {
                    if (item.type === 1) {
                        this.form.setControl(item.id,
                            new FormControl('',
                                [Validators.required]));
                    } else {
                        this.form.setControl(item.id,
                            new FormControl('',
                                [Validators.required]));
                    }
                });
                this.setValue();
                this.form.valueChanges.subscribe(() => {
                    this.testSvc.updateAnswerStatus(this.form.value);
                });
            }
        });
    }

    setValue() {
        const answer = this.testSvc.answer();
        console.log(this.form.value);
        if (answer) {
            this.answer = answer;
            for (const key in answer) {
                if (answer[key]) {
                    this.form.get(key).setValue(answer[key]);
                }
            }
        }
    }

    ionViewDidLeave() {
        this.statusBar.styleBlackTranslucent();
    }

    segmentChanged(e) {
        this.selectedType = e.detail.value;
    }

    change(question, answer) {
        if (!this.answer[question.id]) {
            this.answer[question.id] = [];
        }
        const index = this.answer[question.id].indexOf(answer.value);
        if (index === -1) {
            this.answer[question.id].push(answer.value);
        } else {
            this.answer[question.id].splice(index, 1);
        }
        this.form.get(question.id).setValue((() => {
            let value = '';
            this.answer[question.id].forEach(item => {
                if (!value) {
                    value = item;
                } else {
                    value = value + ',' + item;
                }
            });
            return value;
        })());
    }

    next(e) {
        if (this.form.get(this.questions[this.index].id).invalid) {
            return false;
        }
        console.log(e);
        if (e) {
            this.router.navigate(['/pages/testing/capture']);
        } else {
            this.router.navigate(['/pages/testing/test', this.index + 1]);
        }

    }

}
