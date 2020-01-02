# license

npm包授权管理

## 使用示例

现有如下NPM包`obj`：
```js
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

const Obj = {
    Map: "Obj.Map",
    Control: function() {
        return "Obj.Control";
    },
    Layers: [1, 2, 3, 4],
    CRS: new _CRS()
};

export default Obj;
```

### 发布者

对`obj`授权
```js
import License from "js.license";

// 定义授权清单
const manifest = {
    Control: 1,
    CRS: 1,
    "CRS.Simple": 1,
    "CRS.Baidu": 1,
    "CRS.ESPG": 2,
};

class _CRS { ... }

const Obj = { ... }

var license = new License(manifest, {
    privateKey: 'xxx'
});

export default license.proxy(Obj);
```

`License`内置了`免费版(Free, 0)`， `基础版(Basic, 1)`， `标准版(Standard, 2)` 和 `高级版(Advanced, 3)`四个软件版本。

+ `Obj.Control`， `Obj.CRS`，`Obj.CRS.Simple`，`Obj.CRS.Baidu`可以在`Basic(1)`版本下访问
+ `Obj.CRS.ESPG`可以在`Standard(2)` 版本下访问
+ 对于没有提到的`Obj.Map`，`Obj.Layer`可以在`Free(0)`版本下访问

### 使用者

首先从发布者那里拿到`licenseKey`，否则只能使用免费版。

```js
import Obj from 'obj`;

Obj.licenseKey='...';
```

如果没有拿到`licenseKey`，使用者只能访问如下的`Obj`：
```js
{
    Map: "Obj.Map",
    Control: {},
    Layers: [1, 2, 3, 4],
    CRS: {}
}
```