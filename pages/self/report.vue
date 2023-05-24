<template>
	<view class="form-view">
		<u--form labelPosition="left" :model="form" ref="form1" :rules="rules">
			<u-form-item label="被举报者电话" labelWidth="108px" prop="reportedId" borderBottom>
				<u--input v-model="form.reportedId" border="none" placeholder="请输入举报者电话"></u--input>
			</u-form-item>
			<u-form-item label="举报详情" labelWidth="100px" prop="details" borderBottom>
				<u--textarea v-model="form.details" placeholder="请填写举报详情" count :height="120"></u--textarea>
			</u-form-item>
			<u-button type="primary" text="举报" style="margin-top: 40rpx;" @click="publish"></u-button>
		</u--form>
	</view>
</template>

<script>
	export default {
		onReady() {
			// 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			this.$refs.form1.setRules(this.rules)
		},
		data() {
			return {
				rules: {
					'reportedId': {
						required: true,
						message: '请输入被举报者电话',
						trigger: ['blur']
					},
					'details': {
						required: true,
						message: '请输入举报详情',
						trigger: ['blur']
					},
				},
				form: {
					reportedId: '',
					details: '',
				},
			}
		},
		methods: {
			publish() {
				this.$refs.form1.validate().then((res) => {
					if (this.userInfo.identity === '家教') {
						this.$axios({
							method: 'get',
							url: 'tutor/report',
							params: {
								'report_id': this.userInfo.phone,
								'reported_id': this.form.reportedId,
								'details': this.form.details
							}
						}).then((res) => {
							uni.showToast({
								title: '举报成功',
								icon: 'none',
							})
							this.$refs.form1.resetFields()
						}).catch((err) => {
							uni.showToast({
								title: err,
								icon: 'error',
							})
						})
					} else {
						this.$axios({
							method: 'get',
							url: 'user/report',
							params: {
								'report_id': this.userInfo.phone,
								'reported_id': this.form.reportedId,
								'details': this.form.details
							}
						}).then((res) => {
							uni.showToast({
								title: '举报成功',
								icon: 'none',
							})
							this.$refs.form1.resetFields()
						}).catch((err) => {
							uni.showToast({
								title: err,
								icon: 'error',
							})
						})
					}
					uni.switchTab({
						url: '/pages/self/self'
					})
				}).catch(errors => {
					uni.$u.toast('请填写完整信息')
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.form-view {
		// width: 100%;
		height: 100%;
		padding: 40rpx 20rpx;
	}
</style>

<style>
	uni-page-body,
	uni-page-refresh {
		height: 100%;
	}
</style>
