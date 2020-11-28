<template>
	<view class = "find-root">
		
		<!-- 头部导航栏 组件 -->
		<view class = "navbar">
			<hx-navbar 
				title = "找回密码" 
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
		
		
		<!-- 找回密码 -->
		<view class = "page_login">
			<!-- 头部logo -->
			<view class = "head">
				<!-- 头像 -->
				<view class = "head_bg">
					<view class = "head_inner_bg">
						<image style = "width: 55px; height: 65px" :src = "imgInfo.head" class = "head_logo" />
					</view>
				</view>
				
				<!-- 信息提示 -->
				<view class = "head_info">{{ this.tipMessage }}</view>
			</view>
			
			<!-- form -->
			<!-- 手机号 -->
			<view class = "form">
				<view class = "input">
					<input
					type = "text"
					v-model = "phoneNo"
					placeholder = "请输入手机号"
					@blur = "verifyPhoneNum"
					/>
					<view class = "img">
						<image @tap = "delUser" class = "img_del" :src = "imgInfo.icon_del" />
					</view>
				</view>
				
				<!-- 验证码 -->
				<view class = "code">
					<input
					type = "text"
					:value = "code"
					placeholder = "请输入验证码"
					@blur = "verifyCode"
					/>
					<button
					class = "verify_submit"
					type = "primary"
					:class = "{ 'verifyPhone': verifyPhone }"
					:disabled = "verifyPhone"
					@tap = "waitVerify"
					:data-ID = "verifyID"
					>获取验证码</button>
				</view>
				
				<!-- 密码 -->
				<view class = "input">
					<input
					:password = "pwdType"
					v-model = "userpwd"
					placeholder = "请输入密码"
					@blur = "verifyPassword"
					>
					<view class = "img" @tap = "pwdType = !pwdType">
						<image class = "img_pwd_switch" :src = "imgInfo.icon_pwd_switch" />
					</view>
				</view>
			</view>
			
			
			<!-- 登录提交 -->
			<button class = "submit" type = "primary" @tap = "modifyPwd">修改密码</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 导航栏 渐变色
				navbarColor: [[28, 187, 180], [141, 198, 63]],
				
				// 提示信息
				tipMessage: '',
				
				// 手机号
				phoneNo: '',
				// 密码
				userpwd: '',
				// 验证码
				code: '',
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
				
				// 图标地址
				imgInfo: {
					head: '/static/person/head.png',
					icon_del: '/static/person/icon_del.png',
					icon_pwd_switch: '/static/person/icon_pwd_switch.png'
				},
				
				// 验证通过与否：默认 不通过
				// 手机号
				Verify_phoneNumber: false,
				// 验证码
				Verify_verifyNumber: false,
				// 密码
				Verify_userpwd: false,
				
				// 用户修改密码 绝对路径
				UserModify: '/modify/account/',
				// 表单数据重复性验证地址
				repeatVerify: '/repeatVerify/'
			}
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
			
			// 手机号码验证
			verifyPhoneNum: async function() {
				// 检验输入 是否为空
				if (this.phoneNo === '') {
					this.tipMessage = '请填写手机号';
					return
				};
				// 获取验证结果
				let result = this.$verify.Phone(this.phoneNo);
				// 设置验证提示
				this.tipMessage = result.message;
				// 设置验证状态
				this.Verify_phoneNumber = result.type;
				
				// 验证手机 存不存在
				if (this.Verify_phoneNumber) {
					// 发送数据
					let result = await this.$DataHandle({
						url: this.repeatVerify,
						data: {
							'Phone': this.phoneNo
						},
						method: 'post'
					});
					// 设置验证提示
					this.tipMessage = result.message;
					// 设置验证状态
					(result.status === -1) && (
						this.Verify_phoneNumber = false
					)
				}
			},
			// 清空输入框
			delUser() {
				this.phoneNo = ''
			},
			// 验证码按钮 点击事件
			waitVerify: async function() {
				// 发送验证码请求
				// 封装用户数据
				let user = {
					'Phone': this.phoneNo
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
				if (this.code === '') {
					this.tipMessage = '请填写验证码';
					return
				};
				// 验证结果
				let result = this.$verify.VerifyNumber(this.code);
				// 设置验证提示
				this.tipMessage = result.message;
				// 设置验证状态
				this.Verify_verifyNumber = result.type
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
			
			// 修改密码 数据提交
			async modifyPwd() {
				// 检查输入数据
				// 手机号
				if (!this.Verify_phoneNumber) {
					this.verifyPhoneNum();
					return
				};
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
				
				// 封装 上传数据
				let user = {
					'Phone': this.phoneNo,
					'Verify': this.code,
					'Password': this.userpwd
				};
				// 发送数据
				let result = await this.$DataHandle({
					url: this.UserModify,
					data: user,
					method: 'post'
				});
				// 数据请求成功
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
	$logo-padding: 60px;
	$form-border-color: rgba(214, 214, 214, 1);

	// 根节点
	.find-root {
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

	// 找回密码
	.page_login {
		padding: 10px
	}

	// 头像
	.head {
		display: flex;
		align-items: center;
		justify-content: center;
		padding-top: $logo-padding;
		flex-direction: column;
		
		// 头像
		.head_bg {
			border: 1px solid #fbecf1;
			border-radius: 50px;
			width: 100px;
			height: 100px;
			display: flex;
			align-items: center;
			justify-content: center;

			.head_inner_bg {
				border-radius: 40px;
				width: 80px;
				height: 80px;
				display: flex;
				background-color: #66CDAA;
				align-items: flex-end;
				justify-content: center;
				overflow: hidden
			}
		}
		
		// 信息提示
		.head_info {
			display: flex;
			position: relative;
			width: 100%;
			height: $logo-padding;
			font-size: $uni-font-size-base;
			color: #DC143C;
			justify-content: center;
			align-items: center;
			box-sizing: border-box
		}
	}

	// 表单区域
	.form {
		display: flex;
		margin: 20px;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		// 验证码
		.code {
			width: 102%;
			min-height: 50px;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;

			// 输入框
			input {
				outline: none;
				height: 50px;
				border: 1px solid $form-border-color;
				border-radius: 5px;
				padding-left: 10px;
				margin-right: 15px;

				&:focus {
					outline: none
				}
			}
			
			// 按钮
			.verify_submit {
				display: flex;
				position: relative;
				color: white;
				background-color: rgba($color: #5F9EA0, $alpha: 1.0);
				-webkit-tap-highlight-color: rgba($color: #5F9EA0, $alpha: 1.0);
				height: 52px;
				align-items: center
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

		// 手机号 密码
		.input {
			width: 100%;
			min-height: 50px;
			margin: 10px;
			display: flex;
			padding: 3px;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			border: 1px solid $form-border-color;
			border-radius: 5px;

			input {
				outline: none;
				margin-left: 10px;
				height: 40px;
				width: 100%;

				&:focus {
					outline: none
				}
			}

			// 图标
			.img {
				min-width: 40px;
				min-height: 40px;
				margin: 5px;
				display: flex;
				align-items: center;
				justify-content: center
			}

			.img_del {
				width: 21px;
				height: 21px
			}

			.img_pwd_switch {
				width: 28px;
				height: 12px
			}
		}
	}

	// 提交按钮
	.submit {
		margin-top: 30px;
		margin-left: 20px;
		margin-right: 20px;
		color: white;
		background-color: rgba($color: #008080, $alpha: 1.0);
		-webkit-tap-highlight-color: rgba($color: #008080, $alpha: 1.0);

		&:active {
			color: #B6B6B6;
			background-color: rgba($color: #008080, $alpha: 0.8)
		}
	}
</style>