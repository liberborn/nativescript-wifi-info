import { Observable } from "tns-core-modules/data/observable";
import {WifiInfo} from 'nativescript-wifi-info';

export class HomeViewModel extends Observable {

    public ssid: string;
    public nativeSsid: string;
    private wifiInfo: WifiInfo;

    constructor() {
        super();

        this.wifiInfo = new WifiInfo();
        this.ssid = this.wifiInfo.getSSID();
        this.nativeSsid = this.wifiInfo.getNativeSSID();
    }
}
