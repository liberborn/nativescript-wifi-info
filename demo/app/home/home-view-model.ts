import { Observable } from "tns-core-modules/data/observable";
import {WifiInfo} from 'nativescript-wifi-info';

export class HomeViewModel extends Observable {

    public wifiSsid: string;
    private wifiInfo: WifiInfo;

    constructor() {
        super();

        this.wifiInfo = new WifiInfo();
        this.wifiSsid = this.wifiInfo.getSSID();
    }
}
