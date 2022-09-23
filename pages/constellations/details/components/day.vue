<template name="day">
	<view>
		<text>day</text>
	</view>
</template>

<script>
	export default {
		name: "day",
		emits:['click','switchChange'],
		props: {
			mode: {
				type:String,
				default () {
					return 'widthFix'
				}
			},
			src: {
				// type:String,
				default () {
					return ""
				}
			},
			width: {
				type:String,
				default () {
					return '100rpx'
				}
			},
			height: {
				type:String,
				default () {
					return '100rpx'
				}
			}
		},
		watch: {
			
		},
		async mounted() {

		},
		methods:{
			
		},
		data() {
			return {
				cSrc:false
			};
		}
	}
</script>