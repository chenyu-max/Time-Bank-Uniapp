<template>
	<view class="list-container">
		<UserNav v-for="item in userList" :key="item.phone" :user="item" class="user-nav" :taskId="taskId"></UserNav>
		<u-empty v-if="userList.length === 0" text="暂无数据" style="margin-top: 20rpx;">
		</u-empty>
	</view>
</template>

<script>
	export default {
		async onLoad(option) {
			await this.getUserList(option.taskId)
			this.taskId = option.taskId
		},
		data() {
			return {
				taskId: '',
				userList: [],
			}
		},
		methods: {
			// 获取报名者列表
			async getUserList(taskId) {
				this.$axios({
					method: 'GET',
					url: 'user/applylist',
					params: {
						'task_id': taskId
					}
				}).then((res) => {
					this.userList = res
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
	page {
		height: 100%;
	}

	.swiper-container {
		height: 100%;

		.swiper-item {
			height: 100%;
			overflow: hidden;
		}
	}

	.list-container {
		height: 100%;
		overflow-y: auto;
		background-color: rgba(238, 238, 238, 0.6);
		// width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.user-nav {
		margin-top: 14rpx;
		background-color: #fff;
		width: 96%;
		border-radius: 10rpx;
	}
</style>
