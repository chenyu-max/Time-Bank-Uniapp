<template>
	<view class="detail-container">
		<u-cell-group :border="false">
			<u-cell title="家长姓名" :value="taskDetail.username"></u-cell>
			<u-cell title="家长电话" :value="taskDetail.phone"></u-cell>
			<u-cell title="家长信誉值" :value="taskDetail.reputation_value"></u-cell>
			<u-cell title="时间" :value="taskDetail.task_time"></u-cell>
			<u-cell title="年级" :value="taskDetail.grade"></u-cell>
			<u-cell title="学科" :value="taskDetail.subject"></u-cell>
			<u-cell title="薪资" :value="taskDetail.salary"></u-cell>
			<u-cell title="城市" :value="taskDetail.city"></u-cell>
			<u-cell title="详细地址" :value="taskDetail.address"></u-cell>
			<u-cell title="备注" :value="taskDetail.remark"></u-cell>
		</u-cell-group>

		<view class="" v-if="userInfo.identity === '家长' && taskDetail.state === 4">
			<view class="label" style="color: #ff0000; ">
				未通过原因
			</view>
			<view class="content">
				{{ taskDetail.reason }}
			</view>
		</view>

		<view class="" style="display: flex; flex-direction: column;"
			v-if="userInfo.identity === '家长' && taskDetail.state === 2">
			<u--form labelPosition="left" :model="form" ref="form1" :rules="rules">
				<u-form-item label="评价" labelWidth="70px" prop="remark" borderBottom>
					<u--input v-model="form.remark" border="none" placeholder="请填写对家教的评价" />
				</u-form-item>
				<u-form-item label="评分" labelWidth="70px" prop="score" borderBottom>
					<u-rate :count="5" v-model="form.score"></u-rate>
				</u-form-item>
			</u--form>
			<u-button text="结束任务" type="primary" @click="overTask"></u-button>
		</view>

		<view class="btn" v-if="userInfo.identity === '家教' && situation === 'null'">
			<u-button text="报名" type="primary" @click="apply"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		async onLoad(option) {
			await this.getTaskDetail(option.taskId)
			console.log(option)
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
			async overTask() {
				await this.$axios({
					method: 'GET',
					url: 'user/finish',
					params: {
						'task_id': this.taskDetail.task_id,
						'parental_evaluation': this.form.remark,
						'score': this.form.score,
						'phone': this.userInfo.phone
					}
				}).then((res) => {
					uni.showToast({
						title: '结束任务成功',
						icon: '',
					})
				}).catch((err) => {
					uni.showToast({
						title: err,
						icon: 'error',
					})
				})
				uni.navigateTo({
					url: `/pages/history/history`
				})
			},
			async apply() {
				await this.$axios({
					method: 'GET',
					url: 'tutor/apply',
					params: {
						'task_id': this.taskDetail.task_id,
						'phone': this.userInfo.phone
					}
				}).then((res) => {
					uni.showToast({
						title: '报名成功',
						icon: '',
					})
				}).catch((err) => {
					uni.showToast({
						title: err,
						icon: 'error',
					})
				})
			},
			async getTaskDetail(taskId) {
				if (this.userInfo.identity === '家教') {
					await this.$axios({
						method: 'GET',
						url: 'tutor/taskdetails',
						params: {
							'task_id': taskId
						}
					}).then((res) => {
						this.taskDetail = res
					}).catch((err) => {
						uni.showToast({
							title: err,
							icon: 'error',
						})
					})
				} else {
					await this.$axios({
						method: 'GET',
						url: 'user/taskdetails',
						params: {
							'task_id': taskId
						}
					}).then((res) => {
						this.taskDetail = res
					}).catch((err) => {
						uni.showToast({
							title: err,
							icon: 'error',
						})
					})
				}
			}
		},
		onReady() {
			// 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			this.$refs.form1.setRules(this.rules)
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
