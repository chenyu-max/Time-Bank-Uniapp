<template>
	<view class="nav-bar">
		<view class="nav-bar-top">
			<view :style="{height:statusHeight + 'rpx'}"></view>

			<view class="nav-bar-content" style="font-size: 20px;font-weight: 600;color: #fff;">
				时间银行
			</view>
		</view>
		<!-- 底部垫片 -->
		<view :style="{height:80 + statusHeight + 'rpx'}"></view>
	</view>
</template>

<script>
	export default {
		props: {
			isSearch: {
				type: Boolean,
				default: false
			},
			parentVal: String
		},
		created() {
			/* 初始化获取状态栏高度 */
			this.initStatusBarHeight()
		},
		data() {
			return {
				statusHeight: 40,
				marginRight: 0,
			}
		},
		methods: {
			initStatusBarHeight() {
				const systemInfo = uni.getSystemInfoSync()
				this.statusHeight = systemInfo.statusBarHeight ? systemInfo.statusBarHeight * 2 : 20;
				/* 如果是小程序的换，进行胶囊处理*/
				// #ifdef MP-WEIXIN
				const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
				this.marginRight = menuButtonInfo.width * 2
				this.statusHeight = menuButtonInfo.top * 2
				// #endif
			},
			goSearchPage() {
				if (this.isSearch) return
				uni.navigateTo({
					url: '/pages/search/search'
				})
			},
			// 返回文章列表界面
			returnArticleList() {
				// #ifdef H5
				uni.switchTab({
					url: '../../pages/index/index'
				})
				// #endif
				// #ifndef H5
				uni.navigateBack()
				// #endif
			},
			changeInputVal(val) {
				this.$emit('sendSearchData')
			}
		},
		computed: {
			// 动态获取searchvalue内容
			searchVal: {
				get() {
					return this.parentVal
				},
				set(val) {
					this.$emit('updateVal', val)
					if (!val) {
						this.$emit('sendSearchData')
					}
				}
			}
		},
	}
</script>

<style scoped lang="scss">
	@import "./css/NavBar.scss";
</style>