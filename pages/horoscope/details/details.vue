<template>
    <day></day>
</template>

<script>
'use strict';
import { horoscopes } from '@/data/horoscopes.js';
import { getHoroscope } from '@/pages/horoscope/details/utils.js';
import day from '@/pages/horoscope/details/components/day.vue';
export default {
    components: {
        day
    },
    data() {
        return {
            i: 1
        };
    },
    async onLoad(option) {
        const cons = horoscopes[option.index];
        this.horoscope = await getHoroscope(cons, 'today');
    },
    computed: {},
    methods: {}
};
</script>

<style></style>
