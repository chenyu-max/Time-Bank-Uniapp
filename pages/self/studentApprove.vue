<template>
	<view class="form-view">
		<view>
			<form>
				<view class="uni-form-item">
					<view class="title">学生证</view>
					<view class="disflex" @click="chooseImg">
						<image class="img-class" :src="photo_address" mode=""></image>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title" style="margin-bottom: 20rpx;">学校</view>
					<input :inputBorder="false" placeholder-class="placeholder" class="form-input" type="text"
						placeholder="请输入学校" v-model="form.school" style="padding-left: 0 !important;" />
				</view>
				<view class="uni-form-item">
					<view class="title" style="margin-bottom: 20rpx;">个人介绍</view>
					<textarea placeholder-style="color:#999" placeholder="请输入个人介绍" v-model="form.introduction" />
				</view>
				<button class="setting-btn" v-if="userInfo.result === 2 || userInfo.result === 3"
					@click="_userSettingSubmit">完成设置</button>
			</form>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.form = this.userInfo
			if (this.form.photo_address) {
				this.photo_address = this.showImage(this.form.photo_address)
			}
		},
		data() {
			return {
				photo_address: '',
				form: {
					introduction: '',
					school: '',
					photo_address: ''
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
							that.showImage(res)
							that.form.photo_address = res
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
					this.photo_address = 'data:image/jpeg;base64,' + res
				}).catch((err) => {
					console.log(err, 'err')
				})
			},
			_userSettingSubmit() {
				this.$axios({
					method: 'post',
					url: '/tutor/approve',
					data: {
						photo_address: this.form.photo_address,
						phone: this.userInfo.phone,
						school: this.form.school,
						introduction: this.form.introduction,
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
		// display: flex;
		// align-items: center;
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
