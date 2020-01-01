# Js Package License Manager

## Level Definition 级别定义

```js
{
    level:0, // 级别
    name:'', // 名称
    tips:'' // 当未授权时的提示信息
}
```

默认提供了`Free`,`Basic`, `Standard`, and `Advanced`四个级别

## 

/**
 * License 生成验证器 (RSA Encryption)
 *
 * 秘钥生成 http://travistidwell.com/jsencrypt/demo/index.html
 */


A类 10.0.0.0-10.255.255.255
B类 172.16.0.0-172.32.255.255
C类 192.168.0.0-192.168.255.255
区别就是A类私有地址可以容纳255×255×255台主机，B类容纳16×255×255台主机，C类容纳255×255台主机。