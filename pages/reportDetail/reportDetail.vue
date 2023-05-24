<template>
	<view class="detail-container">
		<u-cell-group :border="false">
			<u-cell title="举报类型" :value="taskDetail.category"></u-cell>
			<u-cell title="举报人" :value="taskDetail.ownerName"></u-cell>
			<u-cell title="举报人ID" :value="taskDetail.ownerId"></u-cell>
			<u-cell title="举报者电话" :value="taskDetail.phoneNumber"></u-cell>
			<u-cell title="被举报单位ID" :value="taskDetail.reportId"></u-cell>
			<u-cell title="被举报单位" :value="taskDetail.reportName"></u-cell>
			<u-cell title="举报时间" :value="formatDate(taskDetail.time)"></u-cell>
			<u-cell title="举报详情" :titleStyle="{
				'width': '100px'
			}" :value="taskDetail.desc"></u-cell>
		</u-cell-group>

		<view class="btn" v-if="taskDetail.tips === 'ing'">
			<u-button text="同意" style="width: 45%;" type="primary" @click="apply('yes')"></u-button>
			<u-button text="拒绝" style="width: 45%;" type="error" @click="apply('no')"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		async onLoad(option) {
			this.taskDetail = option
		},
		data() {
			return {
				situation: 'over',
				taskDetail: {},
				userList: [],
				rules: {
					'remark': {
						type: 'string',
						required: true,
						message: '请填写评价',
						trigger: ['blur']
					},
				},
				form: {
					remark: '',
					score: 3
				},
			}
		},
		methods: {
			async apply(result) {
				await this.$axios({
					method: 'POST',
					url: 'api/report/result',
					data: {
						'userId': this.taskDetail.ownerId,
						'category': this.taskDetail.category,
						'id': this.taskDetail.reportId,
						'appkey': this.userInfo.appkey,
						'result': result === 'yes'
					}
				}).then((res) => {
					uni.showToast({
						title: '处理成功',
						icon: '',
					})
					uni.navigateBack()
				}).catch((err) => {
					uni.showToast({
						title: err,
						icon: 'error',
					})
				})
			},
			async getTaskDetail(projectId) {
				this.$axios({
					method: 'GET',
					url: 'api/reportreviewlist',
					params: {
						'appkey': this.userInfo.appkey,
					}
				}).then((res) => {
					this.taskDetail = res.list.filter((item) => {
						return item.time === projectId
					})
					console.log(this.taskDetail)
				}).catch((err) => {
					uni.showToast({
						title: err,
						icon: 'error',
					})
				})
			}
		},
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