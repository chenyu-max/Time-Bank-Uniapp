<template>
	<view class="home-container">
		<NavBar></NavBar>
		<TabBar :labelList="labelList" :activeIndex="activeIndex" @changeCurrentIndex="changeCurrentIndex"></TabBar>
		<!-- 文章列表组件 -->
		<OverTaskList class="list-container" :activeIndex="activeIndex">
		</OverTaskList>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		onLoad() {},
		data() {
			return {
				activeIndex: 0
			}
		},
		methods: {
			changeCurrentIndex(index) {
				this.activeIndex = index
			},
		},
		computed: {
			labelList() {
				return [{
					name: '全部'
				}, {
					name: '已审核'
				}, {
					name: '未审核'
				}]
			},
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
	}

	.home-container {
		overflow: hidden;
		flex: 1;
		box-sizing: border-box;
		@include flex(flex-start, column);
		align-items: inherit;
	}

	.list-container {
		flex: 1;
		box-sizing: border-box;
	}
</style>