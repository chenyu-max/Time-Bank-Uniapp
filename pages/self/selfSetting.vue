<template>
	<view class="form-view">
		<view>
			<form>
				<view class="uni-form-item">
					<view class="title">头像</view>
					<view class="disflex" @click="chooseImg">
						<img :src="head_address" width="50px" height="50px" alt="">
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">姓名</view>
					<uni-easyinput :inputBorder="false" placeholder-class="placeholder" class="form-input" type="text"
						placeholder="请输入姓名" v-model="form.username" />
				</view>
				<view class="uni-form-item">
					<view class="title">年龄</view>
					<uni-easyinput :inputBorder="false" placeholder-class="placeholder" class="form-input" type="text"
						placeholder="请输入年龄" v-model="form.age" />
				</view>
				<view class="uni-form-item">
					<view class="title">性别</view>
					<radio-group name="radio" style="margin-left: 16rpx;" @change="radioChange">
						<label>
							<radio value="男" :checked="form.sex === '男'" /><text>男</text>
						</label>
						<label style="margin-left: 20rpx;">
							<radio value="女" :checked="form.sex === '女'" /><text>女</text>
						</label>
					</radio-group>
				</view>
				<button class="setting-btn" @click="_userSettingSubmit">完成设置</button>
			</form>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.form = this.userInfo
			if (this.form.head_address) {
				this.head_address = this.showImage(this.form.head_address)
			}
		},
		data() {
			return {
				head_address: '',
				form: {
					phone: '',
					username: '',
					age: 0,
					sex: '',
					head_address: '',
				}
			}
		},
		methods: {
			chooseImg() {
				const that = this;
				uni.chooseImage({
					count: 1, //默认9
					// sizeType: ['original'], //, original 原图，compressed 压缩图，默认二者都有
					// sourceType: [], //从相册选择 'album' camera 
					success: function(res) {
						let tempFile = res.tempFiles[0];
						that.$axios({
							method: 'post',
							url: 'uploadImage',
							headers: {
								'Content-Type': 'multipart/form-data'
							},
							data: {
								file1: tempFile
							}
						}).then((res) => {
							console.log(res)
							that.form.head_address = res
							that.showImage(res)
						}).catch((err) => {
							console.log(err, 'err')
						})
					}
				});
			},
			showImage(url) {
				this.$axios({
					method: 'get',
					url: 'download',
					params: {
						path: url
					}
				}).then((res) => {
					this.head_address = 'data:image/jpeg;base64,' + res
				}).catch((err) => {
					console.log(err, 'err')
				})
			},
			_userSettingSubmit() {
				this.$axios({
					method: 'post',
					url: '/user/modify',
					data: {
						head_address: this.form.head_address,
						phone: this.userInfo.phone,
						username: this.form.username,
						age: this.form.age,
						sex: this.form.sex
					}
				}).then((res) => {
					uni.showToast({
						title: '修改成功',
						icon: 'none',
					})
					// 获取用户信息
					this.$axios({
						method: 'GET',
						url: 'user/details',
						params: {
							'phone': this.userInfo.phone,
						}
					}).then((res) => {
						this.updateUserInfo(res)
					}).catch((err) => {
						console.log(err, 'err')
					})

					uni.switchTab({
						url: '/pages/self/self'
					})
					// #ifdef H5
					// uni.switchTab({
					//   url: '/pages/self/self'
					// })
					// #endif
					// #ifndef H5
					// uni.navigateBack()
					// #endif
				}).catch((err) => {
					console.log(err, 'err')
				})
			},
			radioChange(e) {
				this.form.sex = e.detail.value
			},
		}
	}
</script>

<style scoped lang="scss">
	.form-view {
		width: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.uni-form-item .title {
		padding: 20rpx 0;
		padding-right: 40rpx;
	}

	.uni-form-item {
		display: flex;
		align-items: center;
		padding: 20rpx 0;
	}

	.placeholder {
		color: #999;
	}

	.img-class {
		width: 100rpx;
		height: 100rpx;
	}

	.setting-btn {
		width: 640rpx;
		height: 90rpx;
		border-radius: 10rpx;
		background-color: $base-color;
		color: #FFFFFF;
		font-size: 32rpx;
		@include flex(center);
		margin-top: 40rpx;
	}
</style>
