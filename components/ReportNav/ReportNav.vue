<template>
	<view class="task-nav" @click="goToTaskDetail">
		<view class="info">
			<view style="text-align: left; flex: 1 auto;"><text style="font-weight: bold;">{{ task.category }}</text>
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
			<view style="text-align: left; width: 50%;"><text style="font-weight: bold;">发起人：</text>{{ task.ownerId }}
			</view>
			<!-- <view style="text-align: left; width: 30%;">地址：{{ task.address }}</view> -->
			<view style="text-align: right; width: 50%;"><text style="font-weight: bold;">审核状态：</text>
				<text style="color: #19be6b" v-if="task.tips === 'over'">已同意</text>
				<text style="color: #2d8cf0" v-if="task.tips === 'ing'">待审核</text>
				<text style="color: red" v-if="task.tips === 'back'">已打回</text>
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
				return (100 * this.task.agree / 21).toFixed(0)
			},
			disAgree() {
				return (100 * this.task.disagree / 21).toFixed(0)
			}
		},
		methods: {
			goToTaskDetail() {
				const params = this.task
				console.log(params)
				if (this.task.tips !== 'ing') {
					uni.navigateTo({
						url: '/pages/reportDetail/reportDetail?' +
							`reportId=${params.reportId}` + `&category=${params.category}` +
							`&ownerId=${params.ownerId}` + `&reportName=${params.reportName}` +
							`&desc=${params.desc}` +
							`&time=${params.time}` + `&ownerName=${params.ownerName}` +
							`&phoneNumber=${params.phoneNumber}` +
							`&agree=${params.agree}` + `&disagree=${params.disagree}` + `&tips=${params.tips}`
					})
				} else {
					uni.navigateTo({
						url: '/pages/reportDetail/reportDetail?' +
							`reportId=${params.reportId}` + `&category=${params.category}` +
							`&ownerId=${params.ownerId}` + `&reportName=${params.reportName}` +
							`&desc=${params.desc}` +
							`&time=${params.time}` + `&ownerName=${params.ownerName}` +
							`&phoneNumber=${params.phoneNumber}` +
							`&agree=${params.agree}` + `&disagree=${params.disagree}` + `&tips=${params.tips}`
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
		}
	}
</style>