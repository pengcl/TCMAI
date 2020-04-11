import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EnrollGuard} from './enroll/enroll.guard';
import {TestGuard} from './test/test.guard';

const routes: Routes = [

    {
        path: 'enroll',
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./enroll/enroll.module').then(m => m.TestingEnrollPageModule)
            }
        ]
    },
    {
        path: 'test/:index',
        canActivate: [EnrollGuard, TestGuard],
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./test/test.module').then(m => m.TestingTestPageModule)
            }
        ]
    },
    {
        path: 'capture',
        canActivate: [],
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./capture/capture.module').then(m => m.TestingCapturePageModule)
            }
        ]
    },
    {
        path: '',
        redirectTo: 'enroll',
        pathMatch: 'full'

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [EnrollGuard, TestGuard]
})
export class TestingRoutingModule {
}
