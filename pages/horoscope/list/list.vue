<template>
    <view class="body">
        <!-- #ifdef APP-PLUS -->
        <status-bar />
        <!-- #endif -->
        <!-- 宫格 -->
        <!-- <uni-section :title="$t('grid.grid')" style="margin: 0;" type="line"></uni-section> -->
        <view class="grid">
            <uni-grid :column="3" :highlight="true" @change="onGridItemTap">
                <template v-for="(item, i) in gridList">
                    <uni-grid-item :index="i" :key="i" v-if="i < 12">
                        <view class="grid-item-box">
                            <image :src="item.icon" class="image" mode="aspectFit" />
                            <text class="text">{{ item.symbol }} {{ item.name }}</text>
                            <text class="text">{{ item.date }}</text>
                        </view>
                    </uni-grid-item>
                </template>
            </uni-grid>
        </view>
        <view class="chinese-fortune-conainer" v-if="chineseFortune">
            <view class="font-bold">
                {{ chineseFortune.date }} {{ chineseFortune.weekday }} {{ chineseFortune.lunarYear }} {{ chineseFortune.animalsYear }}年 {{ chineseFortune.lunar }}
                {{ chineseFortune.holiday }} {{ chineseFortune.desc }}
            </view>
            <view class="border-top">
                <text class="font-bold">易：</text>
                {{ chineseFortune.suit }}
            </view>
            <view class="border-top">
                <text class="font-bold font-red">忌：</text>
                {{ chineseFortune.avoid }}
            </view>
        </view>
    </view>
</template>

<script>
'use strict';
import { horoscopes } from '@/data/horoscopes.js';
export default {
    components: {},
    data() {
        return {
            gridList: horoscopes,
            chineseFortune: null
        };
    },
    async onLoad() {
        this.getChineseFortune();
    },
    methods: {
        onGridItemTap(e) {
            uni.navigateTo({
                url: `/pages/horoscope/details/details?index=${e.detail.index}`
            });
        },
        async getChineseFortune() {
            const cloudObj = uniCloud.importObject('cloud-obj-main');
            try {
                const date = new Date();
                const id = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                let res = uni.getStorageSync(id);
                if (!res) {
                    res = await cloudObj.getChineseFortune();
                    uni.setStorageSync(id, res);
                }
                this.chineseFortune = res;
            } catch (e) {
                uni.showModal({
                    title: '请求万年历失败',
                    content: e.errMsg,
                    showCancel: false
                });
            }
        }
    },
    computed: {}
};
</script>

<style>
.body {
    background-image: -webkit-linear-gradient(60deg, rgba(218, 169, 215, 0.637), rgba(128, 174, 235, 0.904));
    position: absolute;
    width: 100%;
    height: 100%;
}

.grid {
    flex-direction: column;
    padding: 15px;
    background: transparent;
}

.image {
    width: 100rpx;
    height: 100rpx;
}

.text {
    text-align: center;
    font-size: 26rpx;
    margin-top: 10rpx;
}

.grid-item-box {
    flex: 1;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 15px 0;
}

.banner-image {
    width: 750rpx;
    height: 400rpx;
}

.swiper-box {
    height: 400rpx;
}

.chinese-fortune-conainer {
    margin: 30rpx;
}
.border-top {
    margin-top: 10rpx;
    border-top: 1rpx solid #dcdcdc;
}
.font-red {
    color: red;
}
.font-bold {
    font-weight: bold;
}
</style>
