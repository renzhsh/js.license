/**
 * 级别定义
 */

const LevelDefinition = [
    {
        level: 0,
        name: "Free",
        tips: "免费版"
    },
    {
        level: 1,
        name: "Basic",
        tips: "基础版"
    },
    {
        level: 2,
        name: "Standard",
        tips: "标准版"
    },
    {
        level: 3,
        name: "Advanced",
        tips: "高级版"
    }
];

class LevelVisitor {
    constructor() {
        this._levels = LevelDefinition;
    }
    get levels() {
        return this._levels;
    }

    set levels(val) {
        if (typeof val == "object" && val.constructor == Array) {
            this._levels = val;
        } else {
            console.error("in License: 级别定义失败, 定义参数必须是数组");
        }
    }

    visit(level) {
        var arr = this.levels.filter(l => l.level == level);

        if (!arr || arr.length == 0) {
            throw `in License: 未定义的许可级别：${level}, 请检查软件授权清单`;
        }
        return arr[0];
    }
}

export default new LevelVisitor();
