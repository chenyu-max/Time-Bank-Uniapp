<template>
	<view>
		<!-- 当用户为登录状态时进行显示 -->
		<view v-if="userInfo" class="my-header">
			<view class="my-header-background">
			</view>
			<view class="my-header-logo">
				<u-avatar :src="head_address" :size="120"></u-avatar>
				<text class="user-name">{{userInfo.username}}</text>
			</view>
		</view>

		<view class="my-content">
			<view v-if="!userInfo" class="my-content-list" @click="goLoginPage">
				<view class="my-content-list-title">
					<image class="company-logo" src="../../static/img/logo.jpeg" mode="aspectFill"></image>
					<text>HI，您尚未登录,请点击登录</text>
				</view>
				<uni-icons type="arrowright" size="14" color="#666"></uni-icons>
			</view>
			<view class="my-content-list">
				<view class="my-content-list-title">
					<text>ID</text>
				</view>
				<text>{{info.id}}</text>
			</view>
			<view class="my-content-list">
				<view class="my-content-list-title">
					<text>已完成举报审核</text>
				</view>
				<text>{{info.reportTasks}}</text>
			</view>
			<view class="my-content-list">
				<view class="my-content-list-title">
					<text>已完成项目发起审核</text>
				</view>
				<text>{{info.reviewAddTasks}}</text>
			</view>
			<view class="my-content-list">
				<view class="my-content-list-title">
					<text>已完成项目申报审核</text>
				</view>
				<text>{{info.reviewDeclareTasks}}</text>
			</view>
			<!-- #ifdef APP-PLUS -->
			<view class="my-content-list" @click="haveNewVersion&&_getNewVersion()">
				<view class="my-content-list-title">
					<uni-icons class="icons" type="paperclip" size="16" color="#666"></uni-icons>
					<view class="version-container">
						<text>
							当前版本
							<text v-if="haveNewVersion" class="new-version-tip">(点击下载最新版本)</text>
						</text>
						<text class="version">{{currentVersion}}</text>
					</view>
				</view>
				<uni-icons type="arrowright" size="14" color="#666"></uni-icons>
			</view>
			<!-- #endif -->
			<button v-if="userInfo" type="warn" class="sign-out" @click="siginOut">退出</button>
		</view>

	</view>
</template>

<script>
	export default {
		onLoad() {
			this.$axios({
				method: 'GET',
				url: 'api/reviewerlist',
				params: {
					'appkey': this.userInfo.appkey,
				}
			}).then((res) => {
				const temp = res.filter((item) => {
					return item.id === this.userInfo.appkey
				})
				this.info = temp[0]
			}).catch((err) => {
				console.log(err, 'err')
			})
			// !判断是否有新版本进行下载及获取当前的版本
			// #ifdef APP-PLUS
			uni.getSystemInfo({
				success: (res) => {
					if (res.platform == "android") {
						plus.runtime.getProperty(plus.runtime.appid, wgtinfo => {
							this.currentVersion = wgitinfo;
							this._checkVersion();
						})
					}
				}
			})
			// #endif
		},
		data() {
			return {
				info: {},
				head_address: '',
				currentVersion: '1.0.0',
				haveNewVersion: false,
				downLoadLinkUrl: ''
			}
		},
		methods: {
			// 跳转到登录界面
			goLoginPage() {
				uni.navigateTo({
					url: '/pages/userInfo/login/login'
				})
			},
			// 退出登录
			siginOut() {
				this.$store.commit('updateUserInfo', {})
				uni.navigateTo({
					url: '/pages/userInfo/login/login'
				})
			},
			// app中判断是否有新版本
			async _checkVersion() {
				const {
					version,
					downLoadLinkUrl
				} = await this.$http.get_current_version();
				if (version > this.currentVersion) {
					this.haveNewVersion = true;
					this.downLoadLinkUrl = downLoadLinkUrl
				}
			},
			// 获取最新版本app下载
			_getNewVersion() {
				uni.showLoading({
					title: '下载中，请稍后'
				});
				var dtask = plus.downloader.createDownload(this.downLoadLinkUrl, {}, function(d, status) {
					// 下载完成  
					uni.hideLoading({})
					if (status == 200) {
						plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename), {}, {}, function(
							error) {
							uni.showToast({
								title: '安装失败',
								duration: 1500,
								icon: 'none'
							});
						})
					} else {
						uni.showToast({
							title: '更新失败',
							duration: 1500,
							icon: 'none'
						});
					}
				});
				dtask.start();
			},
		}
	}
</script>

<style lang="scss">
	@import "./css/index.scss";
</style>