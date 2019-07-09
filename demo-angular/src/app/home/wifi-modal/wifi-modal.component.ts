import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ModalDialogParams} from 'nativescript-angular/directives/dialogs';
import * as Permissions from 'nativescript-permissions';
import * as application from 'tns-core-modules/application';
import * as dialogs from 'tns-core-modules/ui/dialogs';
import AndroidPermission from '~/app/shared/android-permission';
import Context = android.content.Context;
import WifiManager = android.net.wifi.WifiManager;

@Component({
    selector: 'app-wifi-modal',
    moduleId: module.id,
    templateUrl: './wifi-modal.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WifiModalComponent implements OnInit {

    wifiSsidList: string[] = ['Scanning Wifi Networks...'];

    private readonly ANDROID_PERMISSIONS: AndroidPermission[] = [
        new AndroidPermission(android.Manifest.permission.ACCESS_COARSE_LOCATION, false),
        new AndroidPermission(android.Manifest.permission.ACCESS_WIFI_STATE, false),
        new AndroidPermission(android.Manifest.permission.CHANGE_WIFI_STATE, false),
    ];

    private PLACEHOLDER = 'Scanning Wifi Networks...';

    constructor(private params: ModalDialogParams,
                private changeDetectorRef: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.setAndroidWifiList();
    }

    close(result: string) {
        const wifiSsid = result !== this.PLACEHOLDER ? result : '';
        this.params.closeCallback(wifiSsid);
    }

    setAndroidWifiList() {
        const me = this;

        Permissions.requestPermission(this.getAndroidPermissions(), 'Needed to scan wifi network')
            .then((perms) => {
                me.setAndroidPermission(me, perms);
                me.scanAndroidWifiNetwork(me);
            })
            .catch((e) => {
                console.log('Grant permissions error', e);
                dialogs.alert({
                    title: 'Permissions Missing',
                    message: 'Cannot get Wifi SSID list without permissions',
                    okButtonText: 'OK'
                }).then(() => {
                    me.close('');
                });
            });
    }

    getAndroidPermissions(): string[] {
        const perms = [];
        let i;

        for (i = 0; i < this.ANDROID_PERMISSIONS.length; i++) {
            perms.push(this.ANDROID_PERMISSIONS[i].permission);
        }

        return perms;
    }

    setAndroidPermission(me: any, perms: any) {
        let i;
        for (i = 0; i < me.ANDROID_PERMISSIONS.length; i++) {
            const perm: AndroidPermission = me.ANDROID_PERMISSIONS[i];
            if (perms[perm.permission] !== undefined && perms[perm.permission] === true) {
                me.ANDROID_PERMISSIONS[i].enabled = true;
            }
        }
    }

    scanAndroidWifiNetwork(me: any) {
        application.android.registerBroadcastReceiver(
            WifiManager.SCAN_RESULTS_AVAILABLE_ACTION,
            (context, intent) => {
                me.afterAndroidWifiScan(me, context, intent);
            }
        );

        me.getWifiManager().startScan();
    }

    getWifiManager(): WifiManager {
        return application.android.context.getSystemService(Context.WIFI_SERVICE);
    }

    afterAndroidWifiScan(me: any, context: any, intent: any) {
        console.log('After android wifi scan');

        const results = me.getWifiManager().getScanResults();
        const wifiList = [];
        let index = 0;

        for (index = 0; index < results.size(); index++) {
            const result: android.net.wifi.ScanResult = results.get(index);
            wifiList.push(result.SSID);
        }

        const distinct = (value, idx, self) => {
            return self.indexOf(value) === idx;
        };
        const distinctWifiList = wifiList.filter(distinct);
        const sortedWifiList = distinctWifiList.sort((a, b) => (a > b ? 1 : -1));

        console.log('Wifi SSID list', sortedWifiList);
        me.wifiSsidList = sortedWifiList;
        if (!me.changeDetectorRef['destroyed']) {
            me.changeDetectorRef.detectChanges();
        }
    }
}
