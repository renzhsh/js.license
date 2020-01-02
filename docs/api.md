# license

npm包授权管理

## 秘钥生成
采用的是RSA (1024bit)秘钥, 提供一个在线的生成方式：

[http://travistidwell.com/jsencrypt/demo/index.html](http://travistidwell.com/jsencrypt/demo/index.html)

## License API

```js
import License from 'js.license';
```

### 构造函数
```js
/**
 * License 构造函数
 * @param {Object} manifest 授权清单
 * @param {Object} options 选项
 */
constructor(manifest = {}, options = {}) 
```

#### manifest

格式示例：
```js
{
    Control: 1,
    CRS: 1,
    "CRS.Simple": 1,
    "CRS.Baidu": 1,
    "CRS.ESPG": 2,
}
```
`manifest`的每一条代表了软件的一个模块，后面的数字表示需要的授权版本。

#### options


```js
{   
    levelDefs:[], // 自定义授权版本级别
    privateKey: '', // 用于验证licenseKey的私钥, 未提供时采用内置私钥
    policy: { // npm包授权策略， 默认值
        allowLocalhostOnFree: true, // 免费版是否允许在本机运行
        allowNetAOnFree: false, // 免费版是否允许在A类内网运行
        allowNetBOnFree: false, // 免费版是否允许在B类内网运行
        allowNetCOnFree: true // 免费版是否允许在C类内网运行
    } 
}
```

#### 自定义授权版本

`License` 内置了4个版本：
+ `免费版(Free, 0)`
+ `基础版(Basic, 1)`
+ `标准版(Standard, 2)` 
+ `高级版(Advanced, 3)`

自定义格式：
```js
//options.levelDefs
[
    {
        level: 0,
        name: "Free",
        tips: "免费版" // 可以提供更多的版本信息，未授权时会输出到浏览器console上
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
]
```

> `level=0`表示免费版，未授权的用户可以使用。

### 方法
```js
/**
 * 
 * @param {*} target 授权目标
 */
proxy(target);
```

## Generator API

`licenseKey` 生成器

```js
import { Generator } from "js.license";
```

内置了公钥和私钥，仅用于测试。发布者请提供自己的秘钥对。
```js
import { PublicKey, PrivateKey } from "js.license";
```

```js
/**
 * 生成licenseKey
 * @param {String} host 授权的主机地址
 * @param {Number} level 授权级别
 * @param {Number} expired 有限期限 (单位/月)
 * @param {String} publicKey 公钥
 * @param {String} minVersion 最小版本号
 * @param {String} maxVersion 最大版本号
 */
Generator(
    host,
    level,
    expired,
    publicKey,
    minVersion = "_",
    maxVersion = "_"
)
```