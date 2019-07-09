import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {NativeScriptModule} from 'nativescript-angular/nativescript.module';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {WifiModalComponent} from '~/app/home/wifi-modal/wifi-modal.component';
import {ModalDialogService} from 'nativescript-angular';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        WifiModalComponent
    ],
    entryComponents: [
        WifiModalComponent
    ],
    providers: [
        ModalDialogService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule {
}
