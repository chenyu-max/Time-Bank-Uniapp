<template>
	<view>
		<u--form labelPosition="left" :model="form" ref="form1" :rules="rules">
			<u-form-item label="年级" labelWidth="70px" prop="grade" borderBottom @click="showGrade = true;" ref="item1">
				<u--input v-model="form.grade" disabled disabledColor="#ffffff" placeholder="请选择学生年级" border="none">
				</u--input>
				<u-icon slot="right" name="arrow-right"></u-icon>
			</u-form-item>
			<u-form-item label="学科" labelWidth="70px" prop="subject" borderBottom @click="showSubject = true;"
				ref="item2">
				<u--input v-model="form.subject" disabled disabledColor="#ffffff" placeholder="请选择学科" border="none">
				</u--input>
				<u-icon slot="right" name="arrow-right"></u-icon>
			</u-form-item>

			<u-form-item label="时间" labelWidth="70px" prop="task_time" borderBottom>
				<u--input v-model="form.task_time" border="none" placeholder="如:每周五晚上7点至9点"></u--input>
			</u-form-item>

			<u-form-item label="城市" labelWidth="70px" prop="city" borderBottom @click="showCity = true;" ref="item2">
				<u--input v-model="form.city" disabled disabledColor="#ffffff" placeholder="请选择城市" border="none">
				</u--input>
				<u-icon slot="right" name="arrow-right"></u-icon>
			</u-form-item>

			<u-form-item label="详细地址" labelWidth="70px" prop="address" borderBottom>
				<u--input v-model="form.address" border="none" placeholder="详细地址"></u--input>
			</u-form-item>

			<u-form-item label="薪资" labelWidth="70px" prop="salary" borderBottom>
				<u--input v-model="form.salary" border="none" placeholder="薪资（比如120元/时）"></u--input>
			</u-form-item>

			<u-form-item label="备注" labelWidth="70px" prop="remark" borderBottom>
				<u--input v-model="form.remark" border="none" placeholder="备注小孩学习情况" />
			</u-form-item>

			<u-button type="primary" text="发布任务" style="margin-top: 40rpx;" @click="publish"></u-button>
		</u--form>
		<u-action-sheet :show="showGrade" :actions="gradeActions" title="请选择学生年级" @close="showGrade = false"
			@select="gradeSelect">
		</u-action-sheet>
		<u-action-sheet :show="showSubject" :actions="subjectActions" title="请选择学科" @close="showSubject = false"
			@select="subjectSelect">
		</u-action-sheet>
		<u-action-sheet :show="showCity" :actions="cityActions" title="请选择城市" @close="showCity = false"
			@select="citySelect">
		</u-action-sheet>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showGrade: false,
				showSubject: false,
				showCity: false,
				rules: {
					'grade': {
						type: 'string',
						required: true,
						message: '请选择年级',
						trigger: ['blur']
					},
					'subject': {
						type: 'string',
						required: true,
						message: '请选择学科',
						trigger: ['blur']
					},
					'task_time': {
						type: 'string',
						required: true,
						message: '请填写家教时间',
						trigger: ['blur']
					},
					'city': {
						type: 'string',
						required: true,
						message: '请选择城市',
						trigger: ['blur']
					},
					'address': {
						type: 'string',
						required: true,
						message: '请填写详细地址',
						trigger: ['blur']
					},
					'salary': {
						type: 'string',
						required: true,
						message: '请填写薪资',
						trigger: ['blur']
					},
					'remark': {
						type: 'string',
						required: true,
						message: '请填写备注',
						trigger: ['blur']
					},
				},
				form: {
					grade: '',
					subject: '',
					task_time: '',
					city: '',
					address: '',
					salary: '',
					remark: ''
				},
				cityActions: [{
					name: '杭州市',
				}, {
					name: '宁波市',
				}, {
					name: '温州市',
				}, {
					name: '嘉兴市',
				}, {
					name: '湖州市',
				}, {
					name: '绍兴市',
				}, {
					name: '金华市',
				}, {
					name: '衢州市',
				}, {
					name: '舟山市',
				}, {
					name: '台州市',
				}, {
					name: '丽水市',
				}],
				subjectActions: [{
						name: '数学'
					},
					{
						name: '英语'
					},
					{
						name: '物理'
					},
					{
						name: '化学'
					},
					{
						name: '生物'
					},
					{
						name: '科学综合'
					},
					{
						name: '技术'
					},
					{
						name: '历史'
					},
					{
						name: '地理'
					},
					{
						name: '政治'
					},
					{
						name: '社会综合'
					},
					{
						name: '艺术'
					},
					{
						name: '其他'
					}
				],
				gradeActions: [{
						name: '小学',
					},
					{
						name: '初中',
					},
					{
						name: '高中',
					},
					{
						name: '其他'
					}
				],
				radio: '',
				switchVal: false
			};
		},
		methods: {
			gradeSelect(e) {
				this.form.grade = e.name
			},
			subjectSelect(e) {
				this.form.subject = e.name
			},
			citySelect(e) {
				this.form.city = e.name
			},
			publish() {
				this.$refs.form1.validate().then((res) => {
					this.$axios({
						method: 'post',
						url: 'user/publish',
						data: {
							phone: this.userInfo.phone,
							...this.form
						}
					}).then((res) => {
						uni.showToast({
							title: '发布成功',
							icon: 'none',
						})
						this.$refs.form1.resetFields()
					}).catch((err) => {
						uni.showToast({
							title: err,
							icon: 'error',
						})
					})
				}).catch(errors => {
					uni.$u.toast('请填写完整信息')
				})
			},
		},
		onReady() {
			// 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			this.$refs.form1.setRules(this.rules)
		},
	};
</script>
