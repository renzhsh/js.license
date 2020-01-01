import { Verifier, PrivateKey as defaultPrivateKey } from "./key";
import levelVisitor from "./levelVisitor";
import NetSubject from "./netSubject";

/**
 *
 */
export default class PropsTree {
    /**
     *
     * @param {Object} manifest 授权清单
     * @param {*} option 选项
     */
    constructor(manifest, option = {}) {
        this.manifest = manifest;
        this.visitPolicy = option.policy || {};

        this.privateKey = option.privateKey || defaultPrivateKey;

        // 定义授权级别
        if (option.levelDefs) {
            levelVisitor.levels = option.levelDefs;
        }

        this.props = new Map();

        // host, level
        this.licenseInfo = null;
    }

    /**
     * 构建 propsTree
     * @param {Object} manifest
     */
    visitManifest(manifest) {
        /**
         * 把未授权的模块构建成map,设置元属性：
         * {
         *      proxy: true, // 需要返回代理，表示有子模块未授权
         *      level: 3, // 表示当前模块需要授权级别为3
         *      grant: true // 已授权
         * }
         */

        // 先排序，保证层级关系
        let keys = Object.keys(manifest).sort();

        for (var prop of keys) {
            let arrs = prop.split(".");
            let meta = {
                proxy: manifest[prop] > this.licenseInfo.level //子模块未授权
            };
            for (var i = 1; i < arrs.length; i++) {
                let key = arrs.splice(0, i).join(".");
                if (this.props.has(key)) {
                    meta = Object.assign({}, this.props.get(key), meta);
                }

                this.props.set(key, meta);
            }

            meta = {
                level: manifest[prop],
                grant: manifest[prop] <= this.licenseInfo.level
            };
            if (this.props.has(prop)) {
                meta = Object.assign({}, this.props.get(key), meta);
            }

            this.props.set(prop, meta);
        }
    }

    /**
     * 获取授权信息
     * @param {String} module
     */
    getGrantInfo(module) {
        if (!this.props.has(module)) {
            return {
                level: 0,
                grant: true,
                proxy: false
            };
        } else {
            return Object.assign(
                {
                    level: 0,
                    grant: true,
                    proxy: false
                },
                this.props.get(module)
            );
        }
    }

    /**
     *
     * @param {*} target
     * @param {*} prefix
     */
    visit(target, prefix = []) {
        if (typeof target != "object") {
            console.warn(`授权模块必须是Object类型: type is ${typeof target}`);
            return target;
        }
        return new Proxy(target, {
            get: (_target, propKey) => {
                if (!this.licenseInfo) {
                    this.licenseInfo = Verifier(
                        target.licenseKey || "",
                        target.version || "",
                        this.privateKey
                    );

                    this.subject = new NetSubject(
                        this.licenseInfo.host,
                        this.visitPolicy
                    );

                    this.visitManifest(this.manifest);
                }

                if (!this.subject.isAllowed) {
                    console.warn(
                        "In License: 未授权的主机地址：" + location.hostname
                    );
                    return {};
                }

                if (typeof propKey != "string") return _target[propKey];

                let key = [...prefix, propKey].join(".");
                let meta = this.getGrantInfo(key);
                if (!meta.grant) {
                    let levelNode = levelVisitor.visit(meta.level);
                    let desc =
                        levelNode.name +
                        (levelNode.tips ? `(${levelNode.tips})` : "");
                    console.warn(
                        `模块 ${propKey} 未授权, 需要的许可级别为${desc}`
                    );
                    return {};
                }

                if (meta.grant) {
                    if (meta.proxy) {
                        return this.visit(_target[propKey], [
                            ...prefix,
                            propKey
                        ]);
                    }

                    return _target[propKey];
                }
            }
        });
    }
}
