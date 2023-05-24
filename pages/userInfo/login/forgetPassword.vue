<template>
	<view class="login-container">
		<image src="../../../static/img/login_bg.png" class="banner-bg" mode=""></image>
		<!-- 表单部分 -->
		<uni-forms class="form" ref="form" :modelValue="formData">
			<view class="">
				<uni-forms-item label="手机号" name="phone">
					<uni-easyinput :inputBorder="false" placeholder-class="placeholder" class="form-input" type="number"
						placeholder="请输入手机号" v-model="formData.phone"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item label="验证码" name="vCode">
					<input placeholder-class="placeholder" class="form-input" type="text" placeholder="请输入密码"
						v-model="formData.vCode" />
					<SendCode @setCurrentCode="returnCode=$event" class="code-component" @getForm="getForm"></SendCode>
				</uni-forms-item>
				<uni-forms-item label="新密码" name="password">
					<uni-easyinput :inputBorder="false" placeholder-class="placeholder" class="form-input"
						type="password" placeholder="请输入密码" v-model="formData.password"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item label="确认密码" name="password2">
					<uni-easyinput :inputBorder="false" placeholder-class="placeholder" class="form-input"
						type="password" placeholder="请输入密码" v-model="formData.password"></uni-easyinput>
				</uni-forms-item>
			</view>
			<button class="login-btn" @click="_userRegisterSubmit">重置密码</button>
		</uni-forms>
	</view>
</template>

<script>
	export default {
		onReady() {
			this.$refs.form.setRules(this.userRules)
		},
		data() {
			return {
				type: 'account',
				formData: {
					phone: '',
					password: '',
					password2: '',
					vCode: '',
					identity: ''
				},
				returnCode: ''
			}
		},
		methods: {
			radioChange(e) {
				this.formData.identity = e.detail.value
			},
			async _userRegisterSubmit() {
				this.$axios({
					method: 'post',
					url: 'user/register',
					data: {
						'phone': this.formData.phone,
						'password': this.formData.password,
						'code': this.formData.vCode,
						'identity': this.formData.identity
					}
				}).then((res) => {
					console.log(res, 'res')
					this.updateUserInfo(res)
					uni.showToast({
						title: '注册成功',
						icon: 'none',
					})
					setTimeout(() => {
						try {
							uni.navigateBack()
						} catch (e) {
							uni.switchTab({
								url: '/pages/userInfo/login/login'
							})
						}
						// #ifdef H5
						// uni.switchTab({
						//   url: '/pages/userInfo/login/login'
						// })
						// #endif
						// #ifndef H5
						// uni.navigateBack()
						// #endif
					}, 1500)
				}).catch((err) => {
					uni.showToast({
						title: err,
						icon: 'none',
					})
				})
			},
			getForm(cb) {
				cb && cb(this.$refs.form)
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f5f5;
	}

	.code-component {
		flex-shrink: 0;
	}
</style>

<style lang="scss" scoped>
	@import "./css/login.scss";
</style>
