export default {
	userInfo: uni.getStorageSync('userInfo') || null,
	historyList: uni.getStorageSync('historyList') || [],
	labelList: uni.getStorageSync('labelList') || [], // 导航栏标签
	ageList: uni.getStorageSync('ageList') || [], // 导航栏标签2
	cityList: uni.getStorageSync('cityList') || [],
	tutorHistoryList: uni.getStorageSync('tutorHistoryList') || [],
	parentHistoryList: uni.getStorageSync('parentHistoryList') || [],
	taskTypeList1: uni.getStorageSync('taskTypeList1') || [],
	taskTypeList2: uni.getStorageSync('taskTypeList2') || [],
}
