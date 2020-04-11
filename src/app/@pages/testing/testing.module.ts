import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {ThemeModule} from '../../@theme/theme.module';
import {TestingRoutingModule} from './testing-routing.module';

@NgModule({
  imports: [
    IonicModule,
    ThemeModule,
    TestingRoutingModule
  ],
  declarations: []
})
export class TestingPageModule {
}
