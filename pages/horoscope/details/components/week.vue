<!-- 组件开发文档：https://uniapp.dcloud.net.cn/tutorial/vue3-components.html -->

<template>
    <view class="component">
        <view class="rcorners">
            <text>{{ cons.symbol }} {{ horoscope.name }} {{ horoscope.datetime }}</text>
        </view>
        <view class="border-none">
            <text>{{ cons.symbol }} 速配星座：{{ horoscope.QFriend }}</text>
        </view>
        <view class="border-top">
            <text>{{ cons.symbol }} 我的运势：{{ horoscope.summary }}</text>
        </view>
        <view class="border-top">
            <view>
                <text>{{ cons.symbol }} 总体运势：{{ horoscope.all }}</text>
            </view>
            <view class="margin-top">
                <text>{{ cons.symbol }} 幸运颜色：{{ horoscope.color }}</text>
            </view>
            <view class="margin-top">
                <text>{{ cons.symbol }} 幸运数字：{{ horoscope.number }}</text>
            </view>
            <view class="margin-top">
                <text>{{ cons.symbol }} 健康指数：{{ horoscope.health }}</text>
            </view>
            <view class="margin-top">
                <text>{{ cons.symbol }} 爱情指数：{{ horoscope.love }}</text>
            </view>
            <view class="margin-top">
                <text>{{ cons.symbol }} 工作指数：{{ horoscope.work }}</text>
            </view>
            <view class="margin-top">
                <text>{{ cons.symbol }} 金钱指数：{{ horoscope.money }}</text>
            </view>
        </view>
    </view>
</template>

<script>
'use strict';
import { horoscopes } from '@/data/horoscopes.js';
import { getHoroscope } from '@/pages/horoscope/details/utils.js';
export default {
    name: 'week',
    props: {
        index: {
            type: Number
        }
    },
    watch: {},
    mounted() {},
    methods: {},
    async created() {
        this.cons = horoscopes[this.index];
        this.horoscope = await getHoroscope(horoscopes[this.index], 'today');
    },
    data() {
        return {
            cons: '',
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

.margin-top {
    margin-top: 20rpx;
}
</style>
