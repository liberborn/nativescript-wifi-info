# NativeScript Wifi Info Plugin ![apple](https://cdn3.iconfinder.com/data/icons/picons-social/57/16-apple-32.png) ![android](https://cdn4.iconfinder.com/data/icons/logos-3/228/android-32.png)

A plugin for retrieving device's wifi information details.


## Prerequisites / Requirements

### iOS

Make sure that your app has **Access WiFi Information** capability.

`XCode > Open app > Capabilities > Access Wifi Information (ON)`


## Installation

``` JavaScript
tns plugin add nativescript-wifi-info
```


## Usage

The wifi info plugin exposes a simple `WifiInfo()` class with several instance methods. To get the device's current Wifi SSID, instantiate an instance of `WifiInfo` and call its `getSSID()` method.

### Angular

``` TypeScript
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
```

### TypeScript

``` TypeScript
import { WifiInfo } from 'nativescript-wifi-info';

const wifiInfo = new WifiInfo();
const ssid = wifiInfo.getSSID();
const nativeSsid = wifiInfo.getNativeSSID();

console.log('Wifi SSID', ssid);
console.log('Wifi SSID (native)', nativeSsid);
```

The plugin is currently set up to use:

* iOS MMLanScan library [https://github.com/mavris/MMLanScan](https://github.com/mavris/MMLanScan)
* Android native WifiManager API (android.net.wifi.WifiManager)


## Additional Examples

### Scan Wifi Network and show available Wifi SSID list (Android only)

In angular app there is a simple implementation of scanning wifi network and populating wifi ssid list.


## Known Issues

Getting Wifi SSID is not working on iOS simulator (returns `No WiFi Available`). On Android it should detect a default demo Wifi Network `AndroidWifi`.


## License

MIT
