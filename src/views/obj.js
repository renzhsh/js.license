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
    [sys]: "this is Symbol",
    version: "1.3.0"
};

const manifest = {
    Control: 0,
    "CRS.ESPG": 0,
    Map: 0,
    "CRS.Simple": 0,
    CRS: 0,
    "CRS.Baidu": 2
};

var license = new License(manifest);

export default license.proxy(Obj);
