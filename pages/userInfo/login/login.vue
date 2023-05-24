<template>
	<view class="login-container">
		<image src="../../../static/img/login_bg.png" class="banner-bg" mode=""></image>
		<!-- 导航 -->
		<!-- 表单部分 -->
		<uni-forms class="form" ref="form" :modelValue="formData">
			<view class="" v-if="type ==='account'">
				<uni-forms-item label="手机号" name="phone">
					<uni-easyinput :inputBorder="false" placeholder-class="placeholder" class="form-input" type="text"
						placeholder="请输入手机号" v-model="formData.phone" />
				</uni-forms-item>
				<uni-forms-item label="密码" name="password">
					<uni-easyinput :inputBorder="false" placeholder-class="placeholder" class="form-input"
						type="password" placeholder="请输入密码" v-model="formData.password"></uni-easyinput>
				</uni-forms-item>
			</view>
			<button class="login-btn" @click="_userLoginSubmit">立即登录</button>
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
				},
			}
		},
		methods: {
			async _userLoginSubmit() {
				this.$axios({
					method: 'POST',
					url: '/api/login',
					data: {
						'phoneNumber': this.formData.phone,
						'password': this.formData.password
					}
				}).then((res) => {
					this.loginOK(res)
				}).catch((err) => {
					uni.showToast({
						title: err,
						icon: 'error',
					})
				})
			},
			loginOK(res) {
				this.updateUserInfo(res)
				uni.showToast({
					title: '登录成功',
					icon: 'none',
				})
				setTimeout(() => {
					uni.switchTab({
						url: '/pages/index/index'
					})
					// #ifdef H5
					// uni.switchTab({
					//   url: '/pages/index/index'
					// })
					// #endif
					// #ifndef H5
					// uni.navigateBack()
					// #endif
				}, 1500)
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