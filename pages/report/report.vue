<template>
	<view class="home-container">
		<NavBar></NavBar>
		<TabBar :labelList="labelList" :activeIndex="activeIndex" @changeCurrentIndex="changeCurrentIndex"></TabBar>
		<!-- 文章列表组件 -->
		<ReportList class="list-container" :activeIndex="activeIndex" :reportActiveIndex="reportActiveIndex">
		</ReportList>
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
				activeIndex: 0,
				reportActiveIndex: 0
			}
		},
		methods: {
			changeCurrentIndex(index) {
				this.activeIndex = index
			},
			changeReportCurrentIndex(index) {
				this.reportActiveIndex = index
			},
		},
		computed: {
			labelList() {
				return [{
					name: '全部'
				}, {
					name: '已打回'
				}, {
					name: '已同意'
				}, {
					name: '待审核'
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