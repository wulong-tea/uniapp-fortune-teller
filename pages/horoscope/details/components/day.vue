<!-- 组件开发文档：https://uniapp.dcloud.net.cn/tutorial/vue3-components.html -->

<template>
    <view class="component">
        <text>{{ index }}</text>
    </view>
</template>

<script>
'use strict';
import { horoscopes } from '@/data/horoscopes.js';
import { getHoroscope } from '@/pages/horoscope/details/utils.js';
export default {
    name: 'day',
    props: {
        index: {
            type: Number
        }
    },
    watch: {},
    async mounted() {},
    methods: {},
    data() {
        return {
            horoscope: ''
        };
    }
};
</script>

<style>
.component {
    width: 100%;
    height: 100%;
}
.rcorners {
    border-radius: 50rpx;
    border: 1rpx solid #dcdcdc;
    padding: 20rpx;
    margin: 20rpx;
}

.border-none {
    padding: 20rpx;
    margin-left: 20rpx;
    margin-right: 20rpx;
}

.border-top {
    border-top: 1rpx solid #dcdcdc;
    padding: 20rpx;
    margin-left: 20rpx;
    margin-right: 20rpx;
}
</style>
