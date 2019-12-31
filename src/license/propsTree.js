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
                proxy: manifest[prop] > this.AuthLevel //子模块未授权
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
                grant: manifest[prop] <= this.AuthLevel
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
}

export default new PropsTree();
