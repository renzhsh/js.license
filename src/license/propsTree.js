class PropsTree {
    constructor() {
        this.props = new Map();
        this._authLevel = null;
    }

    get AuthLevel() {
        return this._authLevel;
    }

    set AuthLevel(val) {
        this._authLevel = val;
    }

    /**
     * 构建 propsTree
     * @param {Object} manifest
     */
    visitManifest(manifest) {
        /**
         * 把未授权的模块构建成map,设置元属性：
         * {
         *      proxy: true , // 需要返回代理，表示有子模块未授权
         *      needLevel:3 // 表示当前模块需要授权级别为3，但授权级别未达到
         * }
         */
        for (var prop in manifest) {
            if (manifest[prop] <= this.AuthLevel) continue;

            let arrs = prop.split(".");
            let meta = {
                proxy: true
            };
            for (var i = 1; i < arrs.length; i++) {
                let key = arrs.splice(0, i).join(".");
                if (this.props.has(key)) {
                    meta = Object.assign({}, this.props, meta);
                }

                this.props.set(key, meta);
            }

            this.props.set(prop, {
                needLevel: manifest[prop]
            });
        }
    }

    /**
     * 模块是否授权
     * @param {String} module
     */
    isAuthorizated(module) {
        if (!this.props.has(module)) {
            return [true, {}];
        } else {
            return [false, this.props.get(module)];
        }
    }
}

export default new PropsTree();
