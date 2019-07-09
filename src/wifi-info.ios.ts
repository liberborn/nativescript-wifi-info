import { WifiInfoCommon } from './wifi-info.common';

declare let LANProperties;

export class WifiInfo extends WifiInfoCommon {

    readonly SSID_UNDEFINED = 'No WiFi Available';

    constructor() {
        super();
    }

    getSSID(): string {
        return this.getWifiSSID();
    }

    private getWifiSSID(): string {
        const ssid = LANProperties.fetchSSIDInfo();

        return ssid && ssid !== this.SSID_UNDEFINED ? ssid : '';
    }
}
