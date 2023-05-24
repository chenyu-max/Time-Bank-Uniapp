<template>
	<view class="task-nav">
		<view class="avatar">
			<u-avatar src="" :size="60"></u-avatar>
			<text>用户名：{{ evaluation.username }}</text>
		</view>
		<view class="" style="margin-top: 40rpx;">
			<text>评论时间：{{ formatDate(evaluation.overTime) }}</text>
		</view>
		<view class="" style="margin-top: 40rpx;">
			<text>评价：{{ evaluation.userComment }}</text>
		</view>
		<view style="margin-top: 40rpx; margin-bottom: 10rpx;" class="rate">
			<text>评分：</text>
			<u-rate :value="evaluation.star" readonly></u-rate>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'TaskNav',
		props: {
			evaluation: Object,
		},
		created() {
			// this.showImage(this.evaluation.headAddress)
		},
		data() {
			return {
				currentIndex: '',
				head_address: ''
			}
		},
		methods: {
			showImage(url) {
				this.head_address = 'data:image/jpeg;base64,' + url
			},
		},
	};
</script>

<style lang="scss" scoped>
	.task-nav {
		width: 100%;
		border-bottom: 1px solid rgba(120, 116, 116, 0.2);
		display: flex;
		flex-direction: column;

		.info {
			display: flex;
			padding: 30rpx 10rpx;
		}

		.avatar {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.rate {
			display: flex;
			align-items: center;
		}
	}
</style>