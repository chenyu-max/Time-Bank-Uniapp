<template>
	<view class="list-container">
		<TaskNav v-for="item in taskList" :key="item.taskId" :task="item" class="task-nav">
		</TaskNav>
		<u-empty v-if="taskList.length === 0" text="暂无数据" style="margin-top: 20rpx;">
		</u-empty>
	</view>
</template>

<script>
	export default {
		props: {
			activeIndex: Number,
		},
		created() {
			this._getTaskList()
		},
		data() {
			return {
				taskList: [],
			}
		},
		watch: {
			activeIndex() {
				this._getTaskList()
			},
		},
		methods: {
			//获取文章列表
			async _getTaskList() {
				this.$axios({
					method: 'GET',
					url: 'api/addprojectlist',
					params: {
						'appkey': this.userInfo.appkey,
					}
				}).then((res) => {
					this.taskList = res.list.filter((item) => {
						if (this.activeIndex === 0) {
							return true
						}
						if (this.activeIndex === 1) {
							return item.projectResult === 'over'
						} else if (this.activeIndex === 2) {
							return item.projectResult === 'ing'
						}
					})
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

<style lang="scss">
	.swiper-container {
		height: 100%;

		.swiper-item {
			height: 100%;
			overflow: hidden;
		}
	}

	.list-container {
		overflow-y: auto;
		background-color: rgba(238, 238, 238, 0.6);
		// width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.task-nav {
		margin-top: 14rpx;
		background-color: #fff;
		width: 96%;
		border-radius: 10rpx;
	}
</style>