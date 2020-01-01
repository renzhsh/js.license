import JSEncrypt from "jsencrypt";

/**
 * licenseKey 验证器
 * @param {String} licenseKey
 * @param {String} version
 * @param {String} privateKey
 */
export default function(licenseKey, version, privateKey) {
    privateKey = privateKey
        .replace("-----BEGIN RSA PRIVATE KEY-----", "")
        .replace("-----END RSA PRIVATE KEY-----", "");

    //使用私钥解密
    var decrypt = new JSEncrypt();
    decrypt.setPrivateKey(
        `-----BEGIN RSA PRIVATE KEY-----${privateKey}-----END RSA PRIVATE KEY-----`
    );
    var uncrypted = decrypt.decrypt(licenseKey);
    if (!uncrypted) {
        console.warn("无效的licenseKey:%o", licenseKey);
        return {
            host: "",
            level: 0
        };
    } else {
        let [host, level, expires, minVersion, maxVersion] = uncrypted.split(
            " "
        );

        let [year, month, day] = expires.split("_");
        let now = new Date(),
            expireDate = new Date(year, month, day);

        if (now >= expireDate) {
            console.warn("In License: licenseKey已到期");
            return {
                host: "",
                level: 0
            };
        }

        if (minVersion === "_") minVersion = "";
        if (maxVersion === "_") maxVersion = "";
        if (minVersion && minVersion > version) {
            console.warn("In License: 未授权的版本：" + version);
            return {
                host: "",
                level: 0
            };
        }

        if (maxVersion && maxVersion < version) {
            console.warn("In License: 未授权的版本：" + version);
            return {
                host: "",
                level: 0
            };
        }

        return {
            host,
            level
        };
    }
}
