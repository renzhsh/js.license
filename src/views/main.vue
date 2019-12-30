<template>
    <div>{{ Obj }}</div>
</template>
<script>
import _Obj from "./obj";
export default {
    created() {
        console.log("Object Map", this.Obj.Map);
        console.log("function Control", this.Obj.Control);
        console.log("class CRS", this.Obj.CRS);
        console.log("object CRS.Simple", this.Obj.CRS.Simple);
        console.log("get CRS.Baidu", this.Obj.CRS.Baidu);
    },
    data() {
        return {
            Obj: _Obj
        };
    }
};
</script>
