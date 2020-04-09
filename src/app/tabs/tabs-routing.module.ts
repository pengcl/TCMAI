import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';
import {CaptureGuard} from '../@pages/capture/capture.guard';

const routes: Routes = [
    {
        path: 'pages',
        component: TabsPage,
        children: [
            {
                path: 'auth',
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
                path: 'index',
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
                path: 'agreements',
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
                path: 'capture',
                data: {index: 3},
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../@pages/capture/capture.module').then(m => m.CapturePageModule)
                    }
                ]
            },
            {
                path: 'picture',
                data: {index: 4},
                canActivate: [CaptureGuard],
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
                redirectTo: '/pages/capture',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/pages/capture',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [CaptureGuard]
})
export class TabsPageRoutingModule {
}
