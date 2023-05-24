<template>
	<view class="history-view">
		<ReportNav v-for="item in reportList" :key="item.taskId" :report="item" class="task-nav">
		</ReportNav>
		<u-empty v-if="reportList.length === 0" text="暂无数据" style="margin-top: 20rpx;">
		</u-empty>
	</view>
</template>

<script>
	export default {
		created() {
			this._getReportList()
		},
		data() {
			return {
				reportList: [],
			}
		},
		computed: {
			parentHistoryList() {
				return this.$store.state.parentHistoryList
			},
		},
		methods: {
			//获取文章列表
			async _getReportList() {
				this.$axios({
					method: 'GET',
					url: 'user/reportlist',
					params: {
						'phone': this.userInfo.phone
					}
				}).then((res) => {
					this.reportList = res
				}).catch((err) => {
					uni.showToast({
						title: err,
						icon: 'error',
					})
				})
			},
		},
	}
</script>

<style scoped lang="scss">
</style>
