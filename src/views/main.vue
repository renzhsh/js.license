<template>
    <div>{{ "Obj" }}</div>
</template>
<script>
import _Obj from "./obj";
_Obj.licenseKey =
    "Zh0feUkKDVHRWMikdocdI0BKtxyO1ksiD364mS2Bf8Kj4iH0ELNn1P4vhHgcLYQc4Hgv8ZWEO3cZwkTnIg+9yOXs5IoYt9j12SX0GXxsHcupdPmFFyi6mZeykRDMsj02zdWQrDAH09pwDNxGwjzHjgzNF2195IEEEJky+MyrgMU=";
import { Generator, PublicKey } from "license";
export default {
    created() {
        // let license = Generator(
        //     "baidu.com",
        //     3,
        //     12,
        //     PublicKey,
        //     "1.0.0",
        //     "1.3.0-rc1"
        // );
        // console.log(license);
    },
    data() {
        return {
            Obj: _Obj
        };
    }
};
</script>
