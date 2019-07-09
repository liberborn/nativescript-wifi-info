import {WifiInfoCommon} from './wifi-info.common';
import * as application from 'tns-core-modules/application';
import Context = android.content.Context;
import WifiManager = android.net.wifi.WifiManager;
import WifiConfiguration = android.net.wifi.WifiConfiguration;
import List = java.util.List;

export class WifiInfo extends WifiInfoCommon {

    getSSID(): string {
        return this.getWifiSSID();
    }

    private getWifiSSID(): string {
        const wifiManager: WifiManager = application.android.context.getSystemService(Context.WIFI_SERVICE);
        const wifiInfo = wifiManager.getConnectionInfo();
        const listOfConfigurations: List<WifiConfiguration> = wifiManager.getConfiguredNetworks();
        let index;

        for (index = 0; index < listOfConfigurations.size(); index++) {
            const configuration: WifiConfiguration = listOfConfigurations.get(index);
            if (configuration.networkId == wifiInfo.getNetworkId()) {
                return this.unquoteText(configuration.SSID);
            }
        }

        return '';
    }

    private unquoteText(value: string): string {
        return (value != null || value != undefined) ? value.replace(/(^")|("$)/g, '') : value;
    }
}
