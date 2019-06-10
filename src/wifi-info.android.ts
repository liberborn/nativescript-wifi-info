import { WifiInfoCommon } from './wifi-info.common';
import * as application from "tns-core-modules/application";
import Context = android.content.Context;
import WifiManager = android.net.wifi.WifiManager;
import SupplicantState = android.net.wifi.SupplicantState;

export class WifiInfo extends WifiInfoCommon {

    readonly SSID_UNDEFINED = '<unknown ssid>';

    getSSID(): string {
        return this.getWifiSSID();
    }

    getNativeSSID(): string {
        return this.getWifiSSID(true);
    }

    private getWifiSSID(getNative: boolean = false): string {
        const wifiManager: WifiManager = application.android.context.getSystemService(Context.WIFI_SERVICE);
        const wifiInfo = wifiManager.getConnectionInfo();
        let ssid;

        if (wifiInfo.getSupplicantState() === SupplicantState.COMPLETED) {
            ssid = wifiInfo.getSSID();
        }

        if (getNative) {
            return ssid;
        }

        return ssid && ssid !== this.SSID_UNDEFINED ? ssid : this.SSID_PLACEHOLDER;
    }

}
