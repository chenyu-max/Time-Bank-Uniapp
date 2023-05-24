<template>
	<view class="detail-container">
		<u-cell-group :border="false">
			<u-cell title="姓名" :value="user.username"></u-cell>
			<u-cell title="电话" :value="user.phone"></u-cell>
			<u-cell title="信誉值" :value="user.reputationValue"></u-cell>
			<u-cell title="参加家教次数" :value="user.tutor_num + ''"></u-cell>
			<u-cell title="参加支教次数" :value="user.volunteer_num + ''"></u-cell>
			<u-cell title="平均评分" :value="user.average && user.average.toFixed(2)"></u-cell>
			<u-cell title="被举报次数" :value="user.reported_total"></u-cell>
			<u-cell title="成功举报次数" :value="user.reported_success"></u-cell>
		</u-cell-group>
		<EvaluationNav style="width: 90%;" v-for="(item, index) in evaluationlist" :key="index" :evaluation="item">
		</EvaluationNav>
		<view class="btn">
			<u-button text="返回" type="primary" @click="back"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		async onLoad(option) {
			await this.getUserDetail(option.phone)
		},
		data() {
			return {
				user: {},
				evaluationlist: [],
				taskId: ''
			}
		},
		methods: {
			back() {
				uni.navigateBack()
			},
			async getUserDetail(phone) {
				await this.$axios({
					method: 'GET',
					url: '/user/display',
					params: {
						'phone': phone,
					}
				}).then((res) => {
					this.user = res
					this.evaluationlist = this.user.evaluationlist
				}).catch((err) => {
					uni.showToast({
						title: err,
						icon: 'error',
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.detail-container {
		display: flex;
		flex-direction: column;
		align-items: center;

		>view {
			display: flex;
			width: 95%;
			padding: 30rpx 10rpx;
		}

		.label {
			width: 30%;
		}

		.content {
			width: 70%;
		}
	}
</style>
