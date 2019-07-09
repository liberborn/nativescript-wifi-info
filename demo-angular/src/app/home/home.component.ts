import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ModalDialogService} from 'nativescript-angular';
import {WifiInfo} from 'nativescript-wifi-info';
import {isAndroid} from 'tns-core-modules/platform';
import {connectionType, getConnectionType} from 'tns-core-modules/connectivity';
import {WifiModalComponent} from '~/app/home/wifi-modal/wifi-modal.component';
import * as dialogs from 'tns-core-modules/ui/dialogs';
import * as Permissions from 'nativescript-permissions';

@Component({
    selector: 'Home',
    moduleId: module.id,
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    readonly MODAL_OPTIONS = {
        context: {},
        fullscreen: false,
        viewContainerRef: this.vcRef
    };

    isAndroid = isAndroid;

    wifiSsidText: string;
    wifiSsidInput: string;

    private wifiInfo: WifiInfo;

    constructor(private modal: ModalDialogService,
                private vcRef: ViewContainerRef) {
        this.wifiInfo = new WifiInfo();
    }

    ngOnInit() {
    }

    setWifiInfo() {
        const me = this;

        this.wifiSsidText = '';

        Permissions.requestPermission(android.Manifest.permission.ACCESS_NETWORK_STATE, 'Needed to check network state')
            .then((perms) => {
                me.setWifiSsid(me);
            })
            .catch((e) => {
                console.log('Grant permissions error', e);
                dialogs.alert({
                    title: 'Permissions Missing',
                    message: 'Cannot get Wifi SSID without permissions',
                    okButtonText: 'OK'
                }).then(() => {});
            });
    }

    setWifiSsid(me: any) {
        const conn = getConnectionType();

        if (conn === connectionType.wifi) {
            me.wifiSsidText = me.wifiInfo.getSSID();
        } else {
            dialogs.alert({
                title: 'No Wifi Connection',
                message: 'Device is not connected to wifi network',
                okButtonText: 'OK'
            }).then(() => {});
        }
    }

    getAndroidWifiList() {
        this.wifiSsidInput = '';

        this.modal.showModal(WifiModalComponent, this.MODAL_OPTIONS).then(result => {
            if (result !== '') {
                this.wifiSsidInput = result;
            }
        });
    }
}
