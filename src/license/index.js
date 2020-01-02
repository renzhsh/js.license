import PropsTree from "./propsTree";
export { Generator, PublicKey, PrivateKey } from "./key";

export default class LicenseManager {
    /**
     *
     * @param {Object} manifest 授权清单
     * @param {Object} option 选项
     */
    constructor(manifest = {}, option = {}) {
        this.propsTree = new PropsTree(manifest, option);
    }

    /**
     *
     * @param {*} target 授权目标
     */
    proxy(target) {
        if (typeof target != "object") {
            console.warn(`授权模块必须是Object类型: type is ${typeof target}`);
            return target;
        }

        return this.propsTree.visit(target, []);
    }
}
