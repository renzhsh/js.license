import levelVisitor from "./levelVisitor";
import propsTree from "./propsTree";

/**
 *
 * @param {*} target
 * @param {*} prefix licensekey 验证器
 */
function proxy(target, prefix = []) {
    return new Proxy(target, {
        get: function(_target, propKey) {
            if (typeof propKey != "string") return _target[propKey];

            let key = [...prefix, propKey].join(".");
            let [isAuth, meta] = propsTree.isAuthorizated(key);
            if (isAuth) {
                return _target[propKey];
            }

            if (meta.hasOwnProperty("needLevel")) {
                if (meta.hasOwnProperty("needLevel")) {
                    let levelNode = levelVisitor.visit(meta["needLevel"]);
                    let desc =
                        levelNode.name +
                        (levelNode.tips ? `(${levelNode.tips})` : "");
                    throw `模块 ${propKey} 未授权, 需要的许可级别为${desc}`;
                }
            }

            if (meta.hasOwnProperty("proxy")) {
                return proxy(_target[propKey], [...prefix, propKey]);
            }
        }
    });
}

export default proxy;
