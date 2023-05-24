<template>
	<view class="detail-container">
		<u-cell-group :border="false">
			<u-cell title="项目名称" :value="taskDetail.pname"></u-cell>
			<u-cell title="项目ID" :value="taskDetail.projectId"></u-cell>
			<u-cell title="项目分类" :value="taskDetail.category"></u-cell>
			<u-cell title="项目所需人数" :value="taskDetail.needPeople"></u-cell>
			<u-cell title="项目开始时间" :value="taskDetail.startTime"></u-cell>
			<u-cell title="项目结束时间" :value="taskDetail.endTime"></u-cell>
			<u-cell title="项目举办地点" :value="taskDetail.address"></u-cell>
			<u-cell title="项目支付时间币" :value="taskDetail.currency"></u-cell>
			<u-cell title="项目联系人" :value="taskDetail.contactPersonName"></u-cell>
			<u-cell title="项目联系人电话" :value="taskDetail.contactPersonPhone"></u-cell>
			<u-cell title="项目描述" :titleStyle="{
				'width': '100px'
			}" :value="taskDetail.description"></u-cell>
		</u-cell-group>

		<view class="btn" v-if="situation !== 'over'">
			<u-button text="同意" style="width: 45%;" type="primary" @click="apply('yes')"></u-button>
			<u-button text="拒绝" style="width: 45%;" type="error" @click="apply('no')"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		async onLoad(option) {
			await this.getTaskDetail(option.projectId)
			this.situation = option.situation
		},
		data() {
			return {
				situation: null,
				taskDetail: {},
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
					url: 'api/addproject/result',
					data: {
						'appkey': this.userInfo.appkey,
						'projectId': this.taskDetail.projectId,
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
				await this.$axios({
					method: 'GET',
					url: 'api/addprojectdetail',
					params: {
						'appkey': this.userInfo.appkey,
						'projectId': projectId
					}
				}).then((res) => {
					this.taskDetail = res
					this.taskDetail.startTime = this.formatDate(this.taskDetail.startTime);
					this.taskDetail.endTime = this.formatDate(this.taskDetail.endTime);
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