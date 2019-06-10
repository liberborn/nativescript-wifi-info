import {Observable} from 'tns-core-modules/data/observable';

export class WifiInfoCommon extends Observable {

    readonly SSID_PLACEHOLDER = 'Wifi SSID';

    ssid: string;

    constructor() {
        super();
    }
}
