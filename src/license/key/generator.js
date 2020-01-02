import JSEncrypt from "jsencrypt";

/**
 * 生成licenseKey
 * @param {String} host 授权的主机地址
 * @param {Number} level 授权级别
 * @param {Number} expired 有限期限 (单位/月)
 * @param {String} publicKey 公钥
 * @param {String} minVersion 最小版本号
 * @param {String} maxVersion 最大版本号
 */
export default function(
    host,
    level,
    expired,
    publicKey,
    minVersion = "_",
    maxVersion = "_"
) {
    if (typeof host != "string" || !host) {
        throw "请输入有效的host";
    }

    var now = new Date();
    let year = now.getFullYear(),
        month = now.getMonth() + 1,
        day = now.getDate();

    month += parseInt(expired);
    year += parseInt(month / 12);
    month = month % 12;

    let expires = `${year}_${month}_${day}`;

    let text = [host, parseInt(level), expires, minVersion, maxVersion].join(
        " "
    );

    //使用公钥加密
    var encrypt = new JSEncrypt();

    publicKey = publicKey
        .replace("-----BEGIN PUBLIC KEY-----", "")
        .replace("-----END PUBLIC KEY-----", "");

    encrypt.setPublicKey(
        `-----BEGIN PUBLIC KEY-----${publicKey}-----END PUBLIC KEY-----`
    );

    let encrypted = encrypt.encrypt(text);

    if (!encrypted) {
        throw "In License: 无效的publicKey";
    }

    return encrypted;
}
