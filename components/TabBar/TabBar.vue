<template>
	<view class="tab">
		<u-tabs :list="labelList" :is-scroll="false" :current="currentIndex" @change="navClickFn"></u-tabs>
		<!-- 滚动区域 -->
		<!-- <scroll-view class="tab-scroll" scroll-x="true" :scroll-into-view="currentIndex" :scroll-with-animation="true">
			<view class="tab-scroll-box">
				<view :id="`item${index}`" @click="navClickFn(index)" :class="{active:activeIndex === index}"
					v-for="(item, index) in labelList" :key="index" class="tab-scroll-item">{{ item.name}}</view>
			</view>
		</scroll-view> -->
		<!-- 设置图标 -->
	</view>
</template>

<script>
	export default {
		props: {
			labelList: Array,
			activeIndex: Number
		},
		watch: {
			activeIndex(index) {
				this.currentIndex = index
			}
		},
		data() {
			return {
				currentIndex: 0
			}
		},
		methods: {
			async goLabelAdmin() {
				await this.checkedIsLogin();
				uni.navigateTo({
					url: "/pages/labelAdmin/labelAdmin"
				})
			},
			navClickFn(tab) {
				this.currentIndex = tab.index
				this.$emit('changeCurrentIndex', tab.index)
			}
		},
	};
</script>

<style lang="scss">
	@import "./css/TabBar.scss";
</style>