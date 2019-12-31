import levelVisitor from "./levelVisitor";
import proxy from "./proxy";
import defaultVerifier from "./verifier";
import propsTree from "./propsTree";

/**
 *
 * @param {*} target Object | 授权对象
 * @param {*} manifest Object | 授权清单
 * @param {*} levelDefinition Array | 级别定义
 * @param {*} verifier function | licenseKey验证器
 */
export default function(
    target,
    manifest = {},
    { levelDefinition, verifier } = {}
) {
    if (typeof target != "object") {
        console.warn(`授权模块必须是Object类型: type is ${typeof target}`);
        return target;
    }

    // 定义授权级别
    if (levelDefinition) {
        levelVisitor.levels = levelDefinition;
    }

    return new Proxy(target, {
        get(_target, propKey) {
            if (propsTree.AuthLevel == null) {
                let fn = () => {
                    return (verifier ? verifier : defaultVerifier)(
                        target.licenseKey || ""
                    );
                };
                propsTree.AuthLevel = fn();

                // 遍历许可清单，建立propsTree
                propsTree.visitManifest(manifest);
            }

            if (typeof propKey != "string") return _target[propKey];

            let meta = propsTree.getGrantInfo(propKey);
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
                    return proxy(_target[propKey], [propKey]);
                }

                return _target[propKey];
            }
        }
    });
}
