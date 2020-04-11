import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {IonicModule} from '@ionic/angular';
import {DialogModule} from '../@core/modules/dialog';
import {UploaderModule} from './modules/uploader';
import {PickerModule} from '../@core/modules/picker';
import {ToastModule} from '../@core/modules/toast';
import {ActionSheetModule} from '../@core/modules/actionsheet';
import {COMPONENTS, ENTRY_COMPONENTS, PIPES, DIRECTIVES} from './index';

import {
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatChipsModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatBadgeModule,
    MatCardModule,
    MatGridListModule,
    MatDialogModule,
    MatExpansionModule,
    MatRadioModule,
    MatTooltipModule,
    MatTableModule,
    MatSelectModule
} from '@angular/material';

import {DragDropModule} from '@angular/cdk/drag-drop';

const MATERIAL_PART = [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatChipsModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatBadgeModule,
    MatCardModule,
    MatGridListModule,
    MatDialogModule,
    MatExpansionModule,
    MatRadioModule,
    MatTooltipModule,
    MatTableModule,
    MatSelectModule,
    DragDropModule
];

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        MATERIAL_PART,
        IonicModule,
        DialogModule,
        UploaderModule,
        PickerModule,
        ToastModule,
        ActionSheetModule
    ],
    exports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        MATERIAL_PART,
        DialogModule,
        UploaderModule,
        PickerModule,
        ToastModule,
        ActionSheetModule,
        ...COMPONENTS,
        ...PIPES
    ],
    declarations: [...COMPONENTS, ...ENTRY_COMPONENTS, ...PIPES, ...DIRECTIVES],
    entryComponents: [ENTRY_COMPONENTS],
    providers: []
})
export class ThemeModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ThemeModule,
            providers: []
        } as ModuleWithProviders;
    }
}
