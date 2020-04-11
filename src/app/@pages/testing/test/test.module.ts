import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {ThemeModule} from '../../../@theme/theme.module';
import {TestingTestPage} from './test.page';

@NgModule({
  imports: [
    IonicModule,
    ThemeModule,
    RouterModule.forChild([{path: '', component: TestingTestPage}])
  ],
  declarations: [TestingTestPage]
})
export class TestingTestPageModule {
}
