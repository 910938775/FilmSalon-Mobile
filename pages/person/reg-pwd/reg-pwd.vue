<template>
	<view class = "regPwd-root">
		
		<!-- 头部导航栏 组件 -->
		<view class = "navbar">
			<hx-navbar 
				title = "注册" 
				back = "true"
				fixed = "true"
				color = "#ffffff"
				barPlaceholder = "hidden"
				transparent = "auto"
				:background-color = "this.navbarColor"
				@click-right = "Search"
				>
					<!-- 右插槽：搜索框 -->
					<view  slot = "right" class = "navbar-right">
						<uni-icons type = "search" size = "22" color = "#666666" class = "navbar-right-icon" />
					</view>
			</hx-navbar>
		</view>
		
		
		<!-- 手机验证 密码设定 -->
		<view class = "page_reg">
			<!-- 信息提示 -->
			<text class = "tip">{{ this.tipMessage }}</text>
			
			<!-- 验证码 -->
			<view class = "code">
				<input type = "text" v-model = "verifyNumber" placeholder = "验证码" @blur = "verifyCode" />
				<button
				class = "submit"
				type = "primary"
				:class = "{ 'verifyPhone': verifyPhone }"
				:disabled = "verifyPhone"
				@tap = "waitVerify"
				:data-ID = "verifyID"
				>获取验证码</button>
			</view>
			
			<!-- 密码框 -->
			<view class = "pwd">
				<input
				:password = "pwdType"
				v-model = "userpwd"
				placeholder = "登录密码"
				@blur = "verifyPassword"
				/>
				<!-- 图标 -->
				<image
				src = "~@/static/person/icon_pwd_switch.png"
				class = "pwd-icon"
				@tap = "switchPwd"
				></image>
			</view>
			
			<!-- 用户协议 -->
			<view class = "checkbox">
				<!-- 单选框 -->
				<checkbox-group
				class = "checkbox-container"
				@change = "protocolSW = !protocolSW"
				>
					<checkbox :checked = "protocolSW" />
				</checkbox-group>
				<!-- 协议文本 -->
				<text class = "protocol_tip">我已阅读并同意</text>
				<text class = "protocol_tip link">《用户协议》</text>
			</view>
			
			<!-- 注册按钮 -->
			<button class = "reg-submit" type = "primary" @tap = "regist">注册</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 导航栏 渐变色
				navbarColor: [[28, 187, 180], [141, 198, 63]],
				
				// 注册手机号码
				PhoneNumber: '',
				
				// 信息提示
				tipMessage: '',
				
				// 验证码
				verifyNumber: '',
				// 验证码按钮 点击事件 开关
				verifyPhone: false,
				// 验证码按钮 倒计时
				verifyID: 59,
				// 验证码按钮 倒计时：默认 60 s
				verifyMID: 59,
				// 发送验证码 绝对路径
				verifyPath: '/verifyPhone/',
				
				// 密码框类型：默认 密码
				pwdType: true,
				// 密码框内容
				userpwd: '',
				
				// 协议开关
				protocolSW: false,
				
				// 数据验证通过与否：默认 通过
				// 验证码
				Verify_verifyNumber: false,
				// 密码
				Verify_userpwd: false,
				
				// 用户注册 绝对地址
				RegPath: '/register/'
			}
		},
		// 页面加载：传递数据
		onLoad(data) {
			// 获取手机号码
			this.PhoneNumber = data.phone
		},
		methods: {
			// 头部导航栏 搜索框点击事件
			Search: function(e) {
				// this 指向问题
				let that = this;
				// 页面跳转
				uni.navigateTo({
					// 路径
					url: '/pages/search/search',
					// 动画方式：APP支持
					animationType: 'pop-in',
					// 动画时间
					animationDuration: 200,
					// 失败回调
					fail: function(error) {
						that.$InfoToast({
							title: '系统错误'
						})
					}
				})
			},
			
			// 验证码按钮 点击事件
			waitVerify: async function() {
				// 发送验证码请求
				// 封装用户数据
				let user = {
					'Phone': this.PhoneNumber
				};
				// 发送数据
				let result = await this.$DataHandle({
					url: this.verifyPath,
					data: user,
					method: 'post'
				});
				// 1. 数据请求成功
				(result.status === 0) && (
					// 设置提示内容
					this.tipMessage = '短信验证码已发送至 ' + this.PhoneNumber + ' 请查收'
				);
				
				// 2. 数据请求失败
				// 3. 系统错误
				(result.status !== 0) && (
					this.$InfoToast({
						title: result.message
					})
				);
				
				// 设置初始值
				this.verifyID = this.verifyMID;
				// 保存 this 指向问题
				let that = this;
				// 关闭 验证码按钮 开关
				this.verifyPhone = !this.verifyPhone;
				// 动态改变倒计时
				let IDTime = setInterval(function() {
					// 设置倒计时
					that.verifyID -= 1;
					// 清除倒计时
					if (that.verifyID <= 0) {
						// 打开 验证码按钮 开关
						that.verifyPhone = !that.verifyPhone;
						clearInterval(IDTime)
					}
				}, 1000)
			},
			// 验证码 验证
			verifyCode: function() {
				// 检测数据输入 是否为空
				if (this.verifyNumber === '') {
					this.tipMessage = '请填写验证码';
					return
				};
				// 验证结果
				let result = this.$verify.VerifyNumber(this.verifyNumber);
				// 设置验证提示
				this.tipMessage = result.message;
				// 设置验证状态
				this.Verify_verifyNumber = result.type
			},
			// 密码框类型转换
			switchPwd: function() {
				this.pwdType = !this.pwdType
			},
			// 密码验证
			verifyPassword: function() {
				// 检测数据输入 是否为空
				if (this.userpwd === '') {
					this.tipMessage = '请填写密码';
					return
				};
				// 验证结果
				let result = this.$verify.Password(this.userpwd);
				// 设置验证提示
				this.tipMessage = result.message;
				// 设置验证状态
				this.Verify_userpwd = result.type
			},
			// 注册数据
			regist: async function() {
				// 检测数据输入 是否正确
				// 验证码
				if (!this.Verify_verifyNumber) {
					this.verifyCode();
					return
				};
				// 密码
				if (!this.Verify_userpwd) {
					this.verifyPassword();
					return
				};
				// 协议
				if (!this.protocolSW) {
					this.tipMessage = '请阅读用户协议';
					return
				};
				
				// 发送用户数据
				// 封装用户数据
				let user = {
					'Phone': this.PhoneNumber,
					'Verify': this.verifyNumber,
					'Password': this.userpwd
				};
				// 发送数据
				let result = await this.$DataHandle({
					url: this.RegPath,
					data: user,
					method: 'post'
				});
				// 1. 数据请求成功
				(result.status === 0) && (
					// 储存数据
					getApp().globalData.User_Data = user,
					// 页面跳转
					this.$pageSkip({
						url: '/pages/user/user'
					}, 'tabBar')
				);
				
				// 2. 数据请求失败
				// 3. 验证码错误
				(result.status !== 0) && (
					this.$InfoToast({
						title: result.message
					})
				)
			}
		}
	}
</script>

<style>
	/* 全局样式 */
	page {
		/* 全屏显示 */
		height: 100%
	}
</style>

<style lang="scss" scoped>
	$text-color: #B6B6B6;
	$form-border-color: rgba(214, 214, 214, 1);
	
	// 根节点
	.regPwd-root {
		display: flex;
		position: relative;
		flex-direction: column;
		background-color: #f5f6f8;
		width: 100%;
		height: 100%
	}
	
	// 头部导航栏
	.navbar {
		display: flex;
		position: relative;
		width: 100%;
		
		&-right {
			display: flex;
			position: relative;
			width: 70%;
			height: 70%;
			justify-content: center;
			
			// 点击效果：搜索框
			&:active {
				background-color: $uni-bg-color-odd;
				
				& .navbar-right-icon {
					-webkit-transform: scale(1.01);
					-ms-transform: scale(1.01);
					-moz-transform: scale(1.01);
					-o-transform: scale(1.01);
					transform: scale(1.01)
				}
			}
		}
	}
	
	// 手机验证 密码设定
	.page_reg {
		height: 70%;
		margin: 30px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center
	}
	
	// 信息提示
	.tip {
		margin-top: 30px;
		font-size: $uni-font-size-base;
		color: #DC143C
	}
	
	// 验证码
	.code {
		width: 100%;
		min-height: 65px;
		margin-top: 30px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid $form-border-color;
		
		// 验证码按钮
		.submit {
			color: white;
			background-color: rgba($color: #5F9EA0, $alpha: 1.0);
			-webkit-tap-highlight-color: rgba($color: #5F9EA0, $alpha: 1.0)
		}
	}
	
	// 验证码按钮点击事件
	.verifyPhone::after {
		content: attr(data-ID);
		display: flex;
		position: absolute;
		background-color: rgba($color: #808080, $alpha: 0.9);
		top: 0px;
		left: 0px;
		right: 0px;
		bottom: 0px;
		justify-content: center;
		align-items: center;
		// 原始组件 scale(0.5)
		width: 200%;
		height: 200%;
		font-size: 80rpx
	}
	
	// 密码
	.pwd {
		width: 100%;
		margin-top: 10px;
		min-height: 65px;
		display: flex;
		flex-direction: row;
		align-items: center;
		border-bottom: 1px solid $form-border-color;
		
		// 图标
		&-icon {
			display: flex;
			position: absolute;
			width: 38px;
			height: 20px;
			right: 45px
		}
	}
	
	// 用户协议
	.checkbox {
		display: flex;
		position: relative;
		width: 100%;
		height: 15%;
		align-items: center;
		justify-content: flex-start
	}
	
	.protocol_tip {
		font-size: 16px;
		color: $text-color
	}
	
	.link {
		color: #3a8de8
	}
	
	// 注册按钮
	.reg-submit {
		display: flex;
		position: relative;
		width: 100%;
		height: 10%;
		justify-content: center;
		align-items: center;
		color: white;
		background-color: rgba($color: #008080, $alpha: 1.0);
		-webkit-tap-highlight-color: rgba($color: #008080, $alpha: 1.0);
			
		&:active {
			color: #B6B6B6;
			background-color: rgba($color: #008080, $alpha: 0.8)
		}
	}
</style>