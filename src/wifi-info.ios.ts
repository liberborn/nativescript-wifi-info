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

    getNativeSSID(): string {
        return this.getWifiSSID(true);
    }

    private getWifiSSID(getNative: boolean = false): string {
        const ssid = LANProperties.fetchSSIDInfo();
        if (getNative) {
            return ssid;
        }
        return ssid && ssid !== this.SSID_UNDEFINED ? ssid : this.SSID_PLACEHOLDER;
    }
}
