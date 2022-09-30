<!-- 组件开发文档：https://uniapp.dcloud.net.cn/tutorial/vue3-components.html -->

<template>
    <view class="component" v-if="horoscope">
        <view class="rcorners">
            <text>{{ horoscope.symbol }} {{ horoscope.name }} {{ horoscope.datetime }}</text>
        </view>
        <view class="border-none">
            <text>{{ horoscope.symbol }} 速配星座：{{ horoscope.QFriend }}</text>
        </view>
        <view class="border-top">
            <text>{{ horoscope.symbol }} 我的运势：{{ horoscope.summary }}</text>
        </view>
        <view class="border-top">
            <view>
                <text>{{ horoscope.symbol }} 总体运势：{{ horoscope.all }}</text>
            </view>
            <view class="margin-top">
                <text>{{ horoscope.symbol }} 幸运颜色：{{ horoscope.color }}</text>
            </view>
            <view class="margin-top">
                <text>{{ horoscope.symbol }} 幸运数字：{{ horoscope.number }}</text>
            </view>
            <view class="margin-top">
                <text>{{ horoscope.symbol }} 健康指数：{{ horoscope.health }}</text>
            </view>
            <view class="margin-top">
                <text>{{ horoscope.symbol }} 爱情指数：{{ horoscope.love }}</text>
            </view>
            <view class="margin-top">
                <text>{{ horoscope.symbol }} 工作指数：{{ horoscope.work }}</text>
            </view>
            <view class="margin-top">
                <text>{{ horoscope.symbol }} 金钱指数：{{ horoscope.money }}</text>
            </view>
        </view>
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
    mounted() {},
    methods: {},
    async created() {
        this.horoscope = await getHoroscope(horoscopes[this.index], 'tomorrow');
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
