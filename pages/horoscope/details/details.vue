<template>
    <scroll-view class="body" scroll-y="true">
        <view class="uni-padding-wrap uni-common-mt">
            <uni-segmented-control :current="current" :values="tabItems" :style-type="styleType" :active-color="activeColor" @clickItem="onClickItem" />
        </view>
        <view>
            <day v-if="current === 0" :index="index"></day>
            <tomorrow v-if="current === 1" :index="index"></tomorrow>
            <week v-if="current === 2" :index="index"></week>
            <month v-if="current === 3" :index="index"></month>
            <year v-if="current === 4" :index="index"></year>
        </view>
    </scroll-view>
</template>

<script>
'use strict';
import day from '@/pages/horoscope/details/components/day.vue';
import tomorrow from '@/pages/horoscope/details/components/tomorrow.vue';
import week from '@/pages/horoscope/details/components/week.vue';
import month from '@/pages/horoscope/details/components/month.vue';
import year from '@/pages/horoscope/details/components/year.vue';
export default {
    components: {
        day,
        tomorrow,
        week,
        month,
        year
    },
    data() {
        return {
            index: 0,
            activeColor: '#007aff',
            current: 0,
            styleType: 'button',
            tabItems: ['今天', '明天', '本周', '本月', '今年']
        };
    },
    onLoad(option) {
        this.index = option.index;
    },
    computed: {},
    methods: {
        onClickItem(e) {
            if (this.current !== e.currentIndex) {
                this.current = e.currentIndex;
            }
        }
    }
};
</script>

<style>
.body {
    background-image: -webkit-linear-gradient(120deg, rgba(128, 174, 235, 0.904), rgba(218, 169, 215, 0.637));
    position: absolute;
    width: 100%;
    height: 100%;
}

.uni-common-mt {
    margin-top: 10px;
}

.uni-padding-wrap {
    padding: 0px 30px;
}
</style>
