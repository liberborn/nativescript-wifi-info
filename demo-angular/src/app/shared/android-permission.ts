export default class AndroidPermission {

    permission: string;

    enabled: boolean;

    constructor(permission: string, enabled: boolean) {
        this.permission = permission;
        this.enabled = enabled;
    }

}
