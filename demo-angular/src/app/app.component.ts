import { WifiInfo } from 'nativescript-wifi-info';
console.log(new WifiInfo().message);
import { Component } from "@angular/core";

@Component({
    moduleId: module.id,
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent { }
