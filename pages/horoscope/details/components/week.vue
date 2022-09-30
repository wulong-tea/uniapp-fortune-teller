<!-- 组件开发文档：https://uniapp.dcloud.net.cn/tutorial/vue3-components.html -->

<template>
    <view class="component" v-if="horoscope">
         <view class="rcorners">
           <text user-select>{{horoscope.symbol}} {{horoscope.name}} {{horoscope.date}}</text>
         </view>
           <view class="border-top"><text user-select>{{horoscope.symbol}} 健康指数：{{horoscope.health}}</text></view>
           <view class="border-top"><text user-select>{{horoscope.symbol}} 爱情指数：{{horoscope.love}}</text></view>
           <view class="border-top"><text user-select>{{horoscope.symbol}} 事业指数：{{horoscope.job}}</text></view>
           <view class="border-top"><text user-select>{{horoscope.symbol}} 金钱指数：{{horoscope.money}}</text></view>
           <view style="height:200rpx;"><text></text></view>
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
        this.horoscope = await getHoroscope(horoscopes[this.index], 'week');
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
