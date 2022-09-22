<template>
    <view>
        {{constellation}}
    </view>
</template>

<script>
    import {constellations} from "@/data/constellations.js";
    export default {
        data() {
            return {
                constellation: ""
            }
        },
        onLoad(option) {
            const cons = constellations[option.index];
            this.getConstellations(cons, "today");
        },
        computed: {
          getConstellations() {
          	return async function (cons, type) {
                const cloudObj = uniCloud.importObject('cloud-obj-main');
                try {
                    const res = await cloudObj.getConstellations({name: cons.name, type: type}); 
                    this.constellation = res;
                } catch (e) {
                    uni.showModal({
                        title: '创建失败',
                        content: e.errMsg,
                        showCancel: false
                    })
                }	
            };
          }  
        },
        methods: {
        }
    }
</script>

<style>

</style>
