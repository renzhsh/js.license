/**
 *
 */
export default class NetSubject {
    /**
     *
     * @param {string} hostname 注册的主机地址
     * @param {*}policy 访问策略
     */
    constructor(host, policy) {
        this.registerHost = host || "";
        this.visitPolicy = Object.assign(
            {
                allowLocalhostOnFree: true,
                allowNetAOnFree: false,
                allowNetBOnFree: false,
                allowNetCOnFree: true
            },
            policy
        );
        this.current = location.hostname;

        this._currentType = "";

        this.judge();
    }

    judge() {
        var pattern = null,
            host = location.hostname;
        pattern = /^localhost|127.0.0.1$/g;
        if (pattern.test(host)) {
            this._currentType = "localhost";
            return;
        }

        pattern = /^(10)(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/g;
        if (pattern.test(host)) {
            this._currentType = "netA";
            return;
        }

        pattern = /^(172)(\.((1[6-9])|(2\d)|(3[0-2])))(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){2}$/g;
        if (pattern.test(host)) {
            this._currentType = "netB";
            return;
        }

        pattern = /^(192.168)(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){2}$/g;
        if (pattern.test(host)) {
            this._currentType = "netC";
            return;
        }

        pattern = /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/g;
        if (pattern.test(host)) {
            this._currentType = "Ip";
            return;
        }

        this._currentType = "domain";
        return;
    }

    /**
     * 是否允许在当前网络下运行
     */
    get isAllowed() {
        if (this._isAllowed == null) {
            switch (this._currentType) {
                case "localhost":
                    this._isAllowed = this.visitPolicy.allowLocalhostOnFree;
                    break;
                case "netA":
                    this._isAllowed = this.visitPolicy.allowNetAOnFree;
                    break;
                case "netB":
                    this._isAllowed = this.visitPolicy.allowNetBOnFree;
                    break;
                case "netC":
                    this._isAllowed = this.visitPolicy.allowNetCOnFree;
                    break;
                case "Ip":
                    this._isAllowed = this.registerHost === this.current;
                    break;
                case "domain":
                default:
                    if (!this.registerHost) {
                        this._isAllowed = false;
                    }
                    var pattern = new RegExp(`/\.?${this.registerHost}$/g`);
                    this._isAllowed = pattern.test(this.current);
                    break;
            }
        }

        return this._isAllowed;
    }
}
