import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';
import {AuthGuard} from '../@pages/auth/auth.guard';
import {CaptureGuard} from '../@pages/testing/capture/capture.guard';

const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        children: [
            {
                path: 'pages/auth',
                data: {index: 0},
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../@pages/auth/auth.module').then(m => m.AuthPageModule)
                    }
                ]
            },
            {
                path: 'pages/testing',
                canActivate: [AuthGuard],
                data: {index: 0},
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../@pages/testing/testing.module').then(m => m.TestingPageModule)
                    }
                ]
            },
            {
                path: 'pages/index',
                canActivate: [AuthGuard],
                data: {index: 1},
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../@pages/index/index.module').then(m => m.IndexPageModule)
                    }
                ]
            },
            {
                path: 'pages/agreements',
                canActivate: [AuthGuard],
                data: {index: 2},
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../@pages/agreements/agreements.module').then(m => m.AgreementsPageModule)
                    }
                ]
            },
            {
                path: 'pages/picture',
                data: {index: 4},
                canActivate: [AuthGuard, CaptureGuard],
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../@pages/picture/picture.module').then(m => m.PicturePageModule)
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/pages/index',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/pages/index',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [AuthGuard, CaptureGuard]
})
export class TabsPageRoutingModule {
}
