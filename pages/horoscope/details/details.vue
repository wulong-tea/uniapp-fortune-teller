<template>
    <day :index="index"></day>
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
            index: 0
        };
    },
    async onLoad(option) {
        this.index = option.index || 0;
    },
    computed: {},
    methods: {}
};
</script>

<style></style>
