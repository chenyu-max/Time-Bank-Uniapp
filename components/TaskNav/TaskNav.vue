<template>
	<view class="task-nav" @click="goToTaskDetail">
		<view class="info">
			<view style="text-align: left; flex: 1 auto;"><text style="font-weight: bold;">{{ task.projectName }}</text>
			</view>
		</view>
		<view class="info">
			<view style="text-align: left; width: 20%;"><text style="font-weight: bold;">通过：</text>
			</view>
			<view class="" style="text-align: left; width: 80%;">
				<u-line-progress height="20" :percentage="agree" :striped-active="true"
					:show-percent="true"></u-line-progress>
			</view>
		</view>
		<view class="info">
			<view style="text-align: left; width: 20%;"><text style="font-weight: bold;">拒绝：</text>
			</view>
			<view class="" style="text-align: left; width: 80%;">
				<u-line-progress height="20" :percentage="disAgree" :striped-active="true" :show-percent="true"
					active-color="#fa3534"></u-line-progress>
			</view>
		</view>
		<view class="info">
			<view style="text-align: left; width: 50%;"><text style="font-weight: bold;">发起人：</text>{{ task.ownerName }}
			</view>
			<!-- <view style="text-align: left; width: 30%;">地址：{{ task.address }}</view> -->
			<view style="text-align: right; width: 50%;"><text style="font-weight: bold;">审核状态：</text>
				<text style="color: #19be6b" v-if="task.projectResult === 'over'">已完成</text>
				<text style="color: #2d8cf0" v-if="task.projectResult === 'ing'">待审核</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'TaskNav',
		props: {
			task: Object,
			ifApply: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				currentIndex: ''
			}
		},
		computed: {
			agree() {
				return (100 * this.task.projectAgree / 21).toFixed(0)
			},
			disAgree() {
				return (100 * this.task.projectDisagree / 21).toFixed(0)
			}
		},
		methods: {
			goToTaskDetail() {
				if (this.task.projectResult === 'over') {
					uni.navigateTo({
						url: `/pages/addTaskDetail/addTaskDetail?projectId=${this.task.projectId}&situation=over`
					})
				} else {
					uni.navigateTo({
						url: `/pages/addTaskDetail/addTaskDetail?projectId=${this.task.projectId}`
					})
				}
			},
		},
	};
</script>

<style lang="scss">
	.task-nav {
		border-bottom: 1px solid rgba(120, 116, 116, 0.2);

		.info {
			display: flex;
			padding: 20rpx 10rpx;
			align-items: center;
		}
	}
</style>