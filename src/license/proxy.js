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
            let meta = propsTree.getGrantInfo(key);
            if (!meta.grant) {
                let levelNode = levelVisitor.visit(meta.level);
                let desc =
                    levelNode.name +
                    (levelNode.tips ? `(${levelNode.tips})` : "");
                console.warn(`模块 ${propKey} 未授权, 需要的许可级别为${desc}`);
                return {};
            }

            if (meta.grant) {
                if (meta.proxy) {
                    return proxy(_target[propKey], [...prefix, propKey]);
                }

                return _target[propKey];
            }
        }
    });
}

export default proxy;
