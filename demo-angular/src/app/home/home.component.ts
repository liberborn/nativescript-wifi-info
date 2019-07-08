import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {WifiInfo} from 'nativescript-wifi-info';
import {isAndroid} from 'tns-core-modules/platform';
import * as application from 'tns-core-modules/application';
import * as Permissions from 'nativescript-permissions';
import AndroidPermission from '~/app/shared/AndroidPermission';
import {ListPicker} from 'tns-core-modules/ui/list-picker';
import * as dialogs from 'tns-core-modules/ui/dialogs';
import Context = android.content.Context;
import WifiManager = android.net.wifi.WifiManager;

@Component({
    selector: 'Home',
    moduleId: module.id,
    templateUrl: './home.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

    isAndroid = isAndroid;

    androidPermissions: AndroidPermission[] = [
        new AndroidPermission(android.Manifest.permission.ACCESS_COARSE_LOCATION, false),
        new AndroidPermission(android.Manifest.permission.ACCESS_WIFI_STATE, false),
        new AndroidPermission(android.Manifest.permission.CHANGE_WIFI_STATE, false),
    ];

    ssid: string;
    nativeSsid: string;
    wifiSsidList = [''];

    private wifiInfo: WifiInfo;

    constructor(private changeDetectorRef: ChangeDetectorRef) {
        this.wifiInfo = new WifiInfo();
    }

    ngOnInit() {
    }

    setWifiInfo() {
        this.ssid = this.wifiInfo.getSSID();
        this.nativeSsid = this.wifiInfo.getNativeSSID();
        this.changeDetectorRef.detectChanges();
    }

    setAndroidWifiList() {
        const me = this;

        Permissions.requestPermission(this.getAndroidPermissions(), 'Needed to scan wifi network')
            .then((perms) => {
                me.setAndroidPermission(me, perms);
                me.scanAndroidWifiNetwork(me);
            })
            .catch((e) => {
                dialogs.alert({
                    title: "Permissions Missing",
                    message: "Cannot get Wifi SSID list without permissions",
                    okButtonText: "OK"
                }).then(() => {});
            });
    }

    getAndroidPermissions(): string[] {
        const perms = [];
        let i;

        for (i = 0; i < this.androidPermissions.length; i++) {
            perms.push(this.androidPermissions[i].permission);
        }

        return perms;
    }

    setAndroidPermission(me: any, perms: any) {
        let i;
        for (i = 0; i < me.androidPermissions.length; i++) {
            const perm: AndroidPermission = me.androidPermissions[i];
            if (perms[perm.permission] !== undefined && perms[perm.permission] === true) {
                me.androidPermissions[i].enabled = true;
            }
        }
        me.changeDetectorRef.detectChanges();
    }

    scanAndroidWifiNetwork(me) {
        application.android.registerBroadcastReceiver(
            WifiManager.SCAN_RESULTS_AVAILABLE_ACTION,
            (context, intent) => {
                me.onAndroidWifiListReady(me, context, intent);
            }
        );

        me.getWifiManager().startScan();
    }

    getWifiManager(): WifiManager {
        return application.android.context.getSystemService(Context.WIFI_SERVICE);
    }

    onAndroidWifiListReady(me, context, intent) {
        console.log('On wifi list ready');
        const results = me.getWifiManager().getScanResults();
        let wifiList = [];
        let index = 0;

        for (index = 0; index < results.size(); index++) {
            const result: android.net.wifi.ScanResult = results.get(index);
            wifiList.push(result.SSID);
        }

        const distinct = (value, index, self) => {
            return self.indexOf(value) === index;
        };
        const distinctWifiList = wifiList.filter(distinct);
        const sortedWifiList = distinctWifiList.sort((a, b) => (a > b ? 1 : -1));

        console.log('Wifi SSID List', sortedWifiList);
        me.wifiSsidList = sortedWifiList;
        me.changeDetectorRef.detectChanges();
    }

    onSelectedWifiSsid(args) {
        // console.log('on selected wifi ssid');
        let picker = <ListPicker>args.object;
    }
}
