import License from "license";

class _CRS {
    constructor() {
        this._baidu = "baidu";
    }

    ESPG() {
        return "CRS.ESPG";
    }

    get Simple() {
        return "CRS.Simple";
    }

    get Baidu() {
        return this._baidu;
    }

    set Baidu(val) {
        this._baidu = val;
    }
}

let sys = Symbol();

const Obj = {
    Map: "Obj.Map",
    Control: function() {
        return "Obj.Control";
    },
    Layers: [1, 2, 3, 4],
    CRS: new _CRS(),
    [sys]: "this is Symbol"
};

const manifest = {
    Map: 0,
    Control: 2,
    CRS: 2,
    "CRS.ESPG": 2,
    "CRS.Simple": 2,
    "CRS.Baidu": 3
};
export default License(Obj, manifest);
