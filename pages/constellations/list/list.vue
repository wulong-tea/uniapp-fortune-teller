<template>
	<view class="warp">
		<!-- #ifdef APP-PLUS -->
		<status-bar />
		<!-- #endif -->
	<!-- 宫格 -->
		<!-- <uni-section :title="$t('grid.grid')" style="margin: 0;" type="line"></uni-section> -->
		<view class="body">
			<uni-grid :column="3" :highlight="true" @change="change">
				<template v-for="(item,i) in gridList">
					<uni-grid-item :index="i" :key="i" v-if="i<12">
						<view class="grid-item-box">
							<image :src="item.icon" class="image" mode="aspectFit" />
							<text class="text">{{item.symbol}}  {{item.name}}</text>
                            <text class="text">{{item.date}}</text>
						</view>
					</uni-grid-item>
				</template>
			</uni-grid>
		</view>
	</view>
</template>

<script>
    import {constellations} from "@/data/constellations.js";
	import {
		mapGetters,
	} from 'vuex';
	export default {
		components: {
		},
		data() {
			return {
				gridList: constellations
			}
		},
		computed: {
			...mapGetters({
				hasLogin: 'user/hasLogin'
			})
		},
		onLoad() {
			
		},
		methods: {
			change(e) {
				// uni.showToast({
				// 	title:this.$t('grid.clickTip') + " " + `${e.detail.index}` + " " + this.$t('grid.clickTipGrid'),
				// 	icon: 'none'
				// })
                uni.navigateTo({
                    url: "/pages/constellations/details/details?index=" + e.detail.index
                });
			},
			/**
			 * banner加载后触发的回调
			 */
			onqueryload(data) {
			}
		}
	}
</script>

<style>
	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #fff;
		min-height: 100%;
		height: auto;
	}
	view {
		font-size: 14px;
		line-height: inherit;
	}
	.body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
	}
	/* #endif */

	/* #ifdef APP-NVUE */
	.warp {
		background-color: #fff;
	}
	/* #endif */

	.body {
		flex-direction: column;
		padding: 15px;
		background-color: #ffffff;
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

	.body {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
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

	.search-icons {
		padding: 16rpx;
	}

	.search-container-bar {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		align-items: center;
		position: fixed;
		left: 0;
		right: 0;
		z-index: 10;
		background-color: #fff;
	}

	/* #ifndef APP-NVUE || VUE3*/
	/deep/
	/* #endif */
	.uni-searchbar__box {
		border-width: 0;
	}

	/* #ifndef APP-NVUE || VUE3 */
	/deep/
	/* #endif */
	.uni-input-placeholder {
		font-size: 28rpx;
	}
</style>
