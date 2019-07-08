import {WifiInfoCommon} from './wifi-info.common';
import * as application from 'tns-core-modules/application';
import Context = android.content.Context;
import WifiManager = android.net.wifi.WifiManager;
import SupplicantState = android.net.wifi.SupplicantState;
import WifiConfiguration = android.net.wifi.WifiConfiguration;
import List = java.util.List;

export class WifiInfo extends WifiInfoCommon {

    readonly SSID_UNDEFINED = '<unknown ssid>';

    getSSID(): string {
        return this.unquoteText(this.getWifiSSIDFromConfig());
    }

    getNativeSSID(): string {
        return this.unquoteText(this.getWifiSSIDFromConfig(true));
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

        return ssid && ssid !== this.SSID_UNDEFINED ? ssid : '';
    }

    private getWifiSSIDFromConfig(getNative: boolean = false): string {
        const wifiManager: WifiManager = application.android.context.getSystemService(Context.WIFI_SERVICE);
        const wifiInfo = wifiManager.getConnectionInfo();
        const listOfConfigurations: List<WifiConfiguration> = wifiManager.getConfiguredNetworks();
        let index;

        for (index = 0; index < listOfConfigurations.size(); index++) {
            const configuration: WifiConfiguration = listOfConfigurations.get(index);
            if (configuration.networkId == wifiInfo.getNetworkId()) {
                return configuration.SSID;
            }
        }

        return getNative ? this.SSID_UNDEFINED : '';
    }

    private unquoteText(value: string): string {
        return (value != null || value != undefined) ? value.replace(/(^")|("$)/g, '') : value;
    }
}
