import {Component, OnInit} from '@angular/core';
import {WifiInfo} from 'nativescript-wifi-info';

@Component({
    selector: 'Home',
    moduleId: module.id,
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    ssid: string;
    nativeSsid: string;

    private wifiInfo: WifiInfo;

    constructor() {
        this.wifiInfo = new WifiInfo();
    }

    ngOnInit(): void {
        this.ssid = this.wifiInfo.getSSID();
        this.nativeSsid = this.wifiInfo.getNativeSSID();
    }
}
