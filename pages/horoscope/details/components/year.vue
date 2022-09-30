<!-- 组件开发文档：https://uniapp.dcloud.net.cn/tutorial/vue3-components.html -->

<template>
    <view class="component" v-if="horoscope">
        <view class="rcorners">
            <text user-select>{{ horoscope.symbol }} {{ horoscope.name }} {{ horoscope.date }}</text>
        </view>
        <view class="border-top">
            <text user-select>{{ horoscope.symbol }} 幸运宝石：{{ horoscope.luckeyStone }}</text>
        </view>
        <view class="border-top">
            <text user-select>{{ horoscope.symbol }} 年度密码：{{ horoscope.mima.info }}\n\n{{ horoscope.mima.text[0] }}</text>
        </view>
        <view class="border-top">
            <text user-select>{{ horoscope.symbol }} 健康运势：{{ horoscope.health[0] }}</text>
        </view>
        <view class="border-top">
            <text user-select>{{ horoscope.symbol }} 爱情运势：{{ horoscope.love[0] }}</text>
        </view>
        <view class="border-top">
            <text user-select>{{ horoscope.symbol }} 事业运势：{{ horoscope.career[0] }}</text>
        </view>
        <view class="border-top">
            <text user-select>{{ horoscope.symbol }} 财富运势：{{ horoscope.finance[0] }}</text>
        </view>
    </view>
</template>

<script>
'use strict';
import { horoscopes } from '@/data/horoscopes.js';
import { getHoroscope } from '@/pages/horoscope/details/utils.js';
export default {
    name: 'year',
    props: {
        index: {
            type: Number
        }
    },
    watch: {},
    mounted() {},
    methods: {},
    async created() {
        this.horoscope = await getHoroscope(horoscopes[this.index], 'year');
    },
    data() {
        return {
            horoscope: null
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

.margin-top {
    margin-top: 20rpx;
}
</style>
