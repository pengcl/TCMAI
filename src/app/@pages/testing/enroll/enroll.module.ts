import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {ThemeModule} from '../../../@theme/theme.module';
import {TestingEnrollPage} from './enroll.page';

@NgModule({
  imports: [
    IonicModule,
    ThemeModule,
    RouterModule.forChild([{path: '', component: TestingEnrollPage}])
  ],
  declarations: [TestingEnrollPage]
})
export class TestingEnrollPageModule {
}
