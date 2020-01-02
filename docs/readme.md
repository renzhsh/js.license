# license

npm包授权管理

 + [使用示例](./example.md)
 + [API](./api.md)

npm包最常见的使用场景是：开发者使用npm包开发网站，然后网站上线，部署到服务器上，并提供网站域名或Ip地址对外发布。基于这一场景，`License`将 __域名__ 或 __Ip__ 作为 `授权主体` ，对npm包进行授权。

## 授权版本

`License` 内置了4个版本：
+ `免费版(Free, 0)`
+ `基础版(Basic, 1)`
+ `标准版(Standard, 2)` 
+ `高级版(Advanced, 3)`

允许发布方自定义版本, 参见[API](./api.md)。

## 授权对象
```js
{
    Map: "Obj.Map",
    Control: function() {
        return "Obj.Control";
    },
    Layers: [1, 2, 3, 4],
    CRS: {
        Baidu:'Baidu',
        Simple:'Simple'
    }
}
```
必须满足如下条件：
 + 授权对象必须包含属性。`number`/`string`等类型的对象除外。
 + 属性的`key`必须是`string` or `Number`。`Symbol`类型对象除外。

 ## 授权主体

 可以是IP和域名，分为以下几种类型：

 + 本机(localhost): localhost 和 127.0.0.1
 + A类内网(NetA)：10.0.0.0 - 10.255.255.255
 + B类内网(NetB)：172.16.0.0 - 172.32.255.255
 + C类内网(NetC)：192.168.0.0 - 192.168.255.255
 + 公网Ip
 + 域名

 在 `License`的构造函数中，可以配置授权策略：

 ```js
{
    policy: { 
        allowLocalhostOnFree: true, // 免费版是否允许在本机运行
        allowNetAOnFree: false, // 免费版是否允许在A类内网运行
        allowNetBOnFree: false, // 免费版是否允许在B类内网运行
        allowNetCOnFree: true // 免费版是否允许在C类内网运行
    } 
}
 ```

 如果授权主体是域名，则多级域名也被授权。

 举个例子，申请的授权主体为`baidu.com`， 则`www.baidu.com`, `tieba.baidu.com`, `yyyy.xxx.baidu.com`也拥有权限。

 ## 生成LicenseKey

 参见[API](./api.md)

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

> 如果要对npm包的特定版本授权，请提供`version`属性。



