<template>
    <view>{{ constellation }}</view>
    <day></day>
</template>

<script>
import { constellations } from '@/data/constellations.js';
import { getDBId } from '@/pages/constellations/details/utils.js';
import day from '@/pages/constellations/details/components/day.vue';
export default {
    components() {
        day;
    },
    data() {
        return {
            constellation: null
        };
    },
    onLoad(option) {
        const cons = constellations[option.index];
        this.getConstellations(cons, 'today');
    },
    computed: {},
    methods: {
        async getConstellations(cons, type) {
            const cloudObj = uniCloud.importObject('cloud-obj-main');
            try {
                let res = uni.getStorageSync(getDBId(cons.name, type));
                if (!res) {
                    res = await cloudObj.getConstellations({ name: cons.name, type: type });
                    uni.setStorageSync(getDBId(cons.name, type), res);
                }
                this.constellation = res;
            } catch (e) {
                uni.showModal({
                    title: '数据请求失败' + e.errorMsg,
                    showCancel: false
                });
            }
        }
    }
};
</script>

<style></style>
