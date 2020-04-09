import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {Camera} from '@ionic-native/camera/ngx';
import {CameraPreview} from '@ionic-native/camera-preview/ngx';
import {CoreModule} from './@core/core.module';
import {ThemeModule} from './@theme/theme.module';

import {AppComponent} from './app.component';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        IonicModule.forRoot({
            hardwareBackButton: false
        }),
        AppRoutingModule,
        CoreModule.forRoot(),
        ThemeModule.forRoot()
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Camera,
        CameraPreview,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {provide: 'PREFIX_URL', useValue: 'http://admin.mytcmonline.com/tcm/intf/call?action='},
        {provide: 'FILE_PREFIX_URL', useValue: 'http://admin.mytcmonline.com/tcm/admin/fileupload/previewFile?id='}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
