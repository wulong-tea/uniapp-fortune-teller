<template>
    <view>
        {{constellation}}
    </view>
</template>

<script>
    import {constellations} from "@/data/constellations.js";
    export default {
        data() {
            return {
                constellation: "none"
            }
        },
        onLoad(option) {
            this.constellation = constellations[option.index]
        },
        methods: {
        }
    }
</script>

<style>

</style>
