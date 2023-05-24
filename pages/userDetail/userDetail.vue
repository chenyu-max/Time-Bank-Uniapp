<template>
	<view class="detail-container">
		<u-cell-group :border="false">
			<u-cell title="姓名" :value="user.username"></u-cell>
			<u-cell title="电话" :value="user.phone"></u-cell>
			<u-cell title="信誉值" :value="user.reputation"></u-cell>
			<u-cell title="年龄" :value="user.age"></u-cell>
			<u-cell title="性别" :value="user.sex"></u-cell>

			<u-cell title="学校" :value="user.school"></u-cell>
			<u-cell title="个人简介" :value="user.introduction"></u-cell>
		</u-cell-group>
		<view class="btn">
			<u-button text="查看用户风采展示" type="primary" @click="goToTutorInfo"></u-button>
		</view>
		<view class="btn">
			<u-button text="同意报名" type="primary" @click="apply(1)"></u-button>
		</view>
		<view class="btn">
			<u-button text="拒绝报名" type="error" @click="apply(3)"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		async onLoad(option) {
			await this.getUserDetail(option.phone)
			this.taskId = option.taskId
		},
		data() {
			return {
				user: {},
				taskId: ''
			}
		},
		methods: {
			goToTutorInfo() {
				uni.navigateTo({
					url: `/pages/tutorInfo/tutorInfo?phone=${this.user.phone}`
				})
			},
			async apply(result) {
				await this.$axios({
					method: 'GET',
					url: 'user/checkregistration',
					params: {
						'task_id': this.taskId,
						'phone': this.user.phone,
						'result': result
					}
				}).then((res) => {
					uni.showToast({
						title: '处理成功',
						icon: '',
					})
				}).catch((err) => {
					uni.showToast({
						title: err,
						icon: 'error',
					})
				})
				if (result === 1) {
					uni.navigateTo({
						url: '/pages/index/index'
					})
				} else {
					uni.navigateTo({
						url: `/pages/taskApplyList/taskApplyList?taskId=${this.taskId}`
					})
				}
			},
			async getUserDetail(phone) {
				await this.$axios({
					method: 'GET',
					url: 'user/details',
					params: {
						'phone': phone
					}
				}).then((res) => {
					this.user = res
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
