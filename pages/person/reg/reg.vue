<template>
	<view class = "reg-root">
		
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
		
		
		<!-- 注册方式选择 -->
		<view class = "reg-way">
			<!-- 错误提示 -->
			<view class = "reg-way-error">{{ this.errorMessage }}</view>
			
			<!-- 注册方式选择 -->
			<view class = "reg-way-by">
				<!-- 手机号 -->
				<view
				class = "reg-way-by-phone"
				:class = "{ 'reg_choose': Reg_Way }"
				@tap = "Reg_Phone"
				>手机号</view>
				<!-- 账号密码 -->
				<view
				class = "reg-way-by-account"
				:class = "{ 'reg_choose': !Reg_Way }"
				@tap = "Reg_Account"
				>账号密码</view>
			</view>
		</view>
		
		
		<!-- 手机号注册 -->
		<view class = "page_reg" v-if = "Reg_Way">
			<input
			class = "phone"
			type = "text"
			placeholder = "手机号"
			v-model = "phoneNumber"
			@blur = "verifyPhone"
			/>
			<button class = "submit" type = "primary" @tap = "nextPage">下一步</button>
			<text class = "tip">我们将向您的手机发送验证短信</text>
		</view>
		
		
		<!-- 账号密码注册 -->
		<view class = "reg-account" v-else>
			<!-- 昵称 -->
			<view class = "reg-account-nickName">
				<!-- 左图标 -->
				<view class = "reg-account-nickName-img">
					<image src = "~@/static/person/icon_nickName.png" />
				</view>
				<!-- 输入框 -->
				<input
				type = "text"
				v-model = "nickName"
				placeholder = "请输入昵称"
				class = "reg-account-nickName-input"
				@blur = "verifyNickName"
				>
				<!-- 右图标 -->
				<view class = "reg-account-nickName-img">
					<image @tap = "delValue('nickName')" src = "~@/static/person/icon_del.png" />
				</view>
			</view>
			
			<!-- 账户名 -->
			<view class = "reg-account-account">
				<!-- 左图标 -->
				<view class = "reg-account-account-img">
					<image src = "~@/static/person/icon_user.png" />
				</view>
				<!-- 输入框 -->
				<input
				type = "text"
				v-model = "account"
				placeholder = "请输入账户名"
				class = "reg-account-account-input"
				@blur = "verifyAccount"
				>
				<!-- 右图标 -->
				<view class = "reg-account-account-img">
					<image @tap = "delValue('account')" src = "~@/static/person/icon_del.png" />
				</view>
			</view>
			
			<!-- 密码 -->
			<view class = "reg-account-password">
				<!-- 左图标 -->
				<view class = "reg-account-password-img">
					<image src = "~@/static/person/icon_pwd.png" />
				</view>
				<!-- 输入框 -->
				<input
				:password = "pwdType"
				v-model = "userpwd"
				placeholder = "请输入密码"
				class = "reg-account-password-input"
				@blur = "verifyPassword"
				>
				<!-- 右图标 -->
				<view class = "reg-account-password-img reg-account-password-rightImg">
					<image @tap = "switchPwd" src = "~@/static/person/icon_pwd_switch.png" />
				</view>
			</view>
			
			<!-- 用户协议 -->
			<view class = "reg-account-protocol">
				<!-- 单选框 -->
				<checkbox-group @change = "protocolSW = !protocolSW" class = "reg-account-protocol-container">
					<label>
						<checkbox :checked = "protocolSW" class = "reg-account-protocol-container-checkbox" />
					</label>
				</checkbox-group>
				
				<!-- 文本 -->
				<text class = "reg-account-protocol-text">
					我已阅读并同意
					<a :href = "protocol">用户协议</a>
				</text>
			</view>
			
			<!-- 提交按钮 -->
			<button class = "reg-account-submit" type = "primary" @tap = "reg">注册</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 导航栏 渐变色
				navbarColor: [[28, 187, 180], [141, 198, 63]],
				
				// 错误信息
				errorMessage: '',
				
				// 手机号码
				phoneNumber: '',
				
				// 昵称
				nickName: '',
				// 账户名
				account: '',
				// 密码框类型：默认 密码
				pwdType: true,
				// 密码框内容
				userpwd: '',
				// 注册方式选择：默认 手机号
				Reg_Way: true,
				// 协议地址
				protocol: '/',
				// 协议开关
				protocolSW: false,
				// 表单数据重复性验证地址
				repeatVerify: '/repeatVerify/',
				// 用户注册 绝对地址
				RegPath: '/register/',
				
				// 验证通过与否：默认 不通过
				// 手机号
				Verify_phoneNumber: false,
				// 昵称
				Verify_nickName: false,
				// 账户名
				Verify_account: false,
				// 密码
				Verify_userpwd: false
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
			
			// 手机注册 页面跳转
			nextPage() {
				// 手机号验证
				if (!this.Verify_phoneNumber) {
					this.verifyPhone();
					return
				};
				// 传递手机号
				this.$pageSkip({
					url: '/pages/person/reg-pwd/reg-pwd?phone=' + this.phoneNumber
				})
			},
			// 手机号注册
			Reg_Phone: function() {
				this.Reg_Way = true
			},
			// 账号密码注册
			Reg_Account: function() {
				this.Reg_Way = false
			},
			
			// 手机号码验证
			verifyPhone: function() {
				// 检验输入 是否为空
				if (this.phoneNumber === '') {
					this.errorMessage = '请填写手机号';
					return
				};
				// 获取验证结果
				let result = this.$verify.Phone(this.phoneNumber);
				// 设置验证提示
				this.errorMessage = result.message;
				// 设置验证状态
				this.Verify_phoneNumber = result.type
			},
			
			// 清空输入框
			delValue: function(type) {
				// 昵称
				(type === 'nickName') && (
					this.nickName = ''
				);
				// 账户名
				(type === 'account') && (
					this.account = ''
				)
			},
			// 密码框类型转换
			switchPwd: function() {
				this.pwdType = !this.pwdType
			},
			// 昵称验证
			verifyNickName: function() {
				// 检测数据输入 是否为空
				if (this.nickName === '') {
					this.errorMessage = '请填写昵称';
					return
				};
				// 获取验证结果
				let result = this.$verify.NickName(this.nickName);
				// 设置验证提示
				this.errorMessage = result.message;
				// 设置验证状态
				this.Verify_nickName = result.type;
				// 重复性检测
				this.Verify_nickName && (
					this.RepeatNickName({
						'NickName': this.nickName
					})
				)
			},
			// 表单重复性检测
			RepeatNickName: async function(data) {
				// 发送数据
				let result = await this.$DataHandle({
					url: this.repeatVerify,
					data: data,
					method: 'post'
				});
				// 设置验证提示
				this.errorMessage = result.message;
				// 设置验证状态
				(result.status === -2) && (
					data.NickName && (this.Verify_nickName = false),
					data.Account && (this.Verify_account = false)
				)
			},
			// 账户名验证
			verifyAccount: function() {
				// 检测数据输入 是否为空
				if (this.account === '') {
					this.errorMessage = '请填写账户名';
					return
				};
				// 获取验证结果
				let result = this.$verify.Account(this.account);
				// 设置验证提示
				this.errorMessage = result.message;
				// 设置验证状态
				this.Verify_account = result.type;
				// 重复性检测
				this.Verify_account && (
					this.RepeatNickName({
						'Account': this.account
					})
				)
			},
			// 密码验证
			verifyPassword: function() {
				// 检测数据输入 是否为空
				if (this.userpwd === '') {
					this.errorMessage = '请填写密码';
					return
				};
				// 获取验证结果
				let result = this.$verify.Password(this.userpwd);
				// 设置验证提示
				this.errorMessage = result.message;
				// 设置验证状态
				this.Verify_userpwd = result.type
			},
			
			// 注册数据
			reg: async function() {
				// 检测数据输入 是否正确
				// 昵称
				if (!this.Verify_nickName) {
					this.verifyNickName();
					return
				};
				// 账户名
				if (!this.Verify_account) {
					this.verifyAccount();
					return
				};
				// 密码
				if (!this.Verify_userpwd) {
					this.verifyPassword();
					return
				};
				// 协议
				if (!this.protocolSW) {
					this.errorMessage = '请阅读用户协议';
					return
				};
				
				// 发送用户数据
				// 封装用户数据
				let user = {
					'NickName': this.nickName,
					'Account': this.account,
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
				(result.status === 1) && (
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
		/* 全屏布局 */
		height: 100%
	}
</style>

<style lang="scss" scoped>
	$form-border-color: rgba(214, 214, 214, 1);
	$text-color: #B6B6B6;
	
	// 根节点
	.reg-root {
		display: flex;
		position: relative;
		flex-direction: column;
		background-color: #f5f6f8;
		align-items: center;
		justify-content: center;
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
	
	// 注册方式
	.reg-way {
		display: flex;
		position: relative;
		width: 100%;
		height: 25%;
		font-size: 40rpx;
		color: 	#2F4F4F;
		justify-content: center;
		flex-direction: column;
		
		// 错误提示框
		&-error {
			display: flex;
			position: relative;
			width: 100%;
			height: 70%;
			align-items: flex-end;
			justify-content: center;
			padding-bottom: 10px;
			box-sizing: border-box;
			font-size: $uni-font-size-base;
			color: #DC143C
		}
		
		&-by {
			display: flex;
			position: relative;
			width: 100%;
			height: 30%;
			align-items: center;
			justify-content: center;
			font-weight: bold;
			
			// 手机号
			&-phone {
				display: flex;
				position: relative;
				width: 30%;
				height: 100%;
				align-items: flex-end;
				justify-content: center;
				padding-bottom: 10px;
				box-sizing: border-box
			}
			
			// 账号密码
			&-account {
				display: flex;
				position: relative;
				width: 30%;
				height: 100%;
				align-items: flex-end;
				justify-content: center;
				padding-bottom: 10px;
				margin-left: 3px;
				box-sizing: border-box
			}
		}
	}
	
	// 注册方式 选择样式
	.reg_choose {
		border-bottom: 5px solid #008B8B;
		padding-bottom: 5px;
		color: 	#008080
	}
	
	// 手机注册
	.page_reg {
		width: 90%;
		height: 75%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start
	}
	
	// 手机注册 输入框
	.phone {
		width: 100%;
		margin-top: 25%;
		border-bottom: 1px solid $form-border-color
	}
	
	// 手机注册 提交按钮
	.submit {
		width: 100%;
		margin-top: 30px;
		color: white;
		background-color: rgba($color: #008080, $alpha: 1.0);
		-webkit-tap-highlight-color: rgba($color: #008080, $alpha: 1.0);
	
		&:active {
			color: #B6B6B6;
			background-color: rgba($color: #008080, $alpha: 0.8)
		}
	}
	
	// 手机注册 提示文本
	.tip {
		margin-top: 30px;
		font-size: 13px;
		color: $text-color
	}
	
	// 账号密码
	.reg-account {
		width: 90%;
		height: 75%;
		display: flex;
		position: relative;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		
		// 昵称
		&-nickName {
			display: flex;
			position: relative;
			width: 100%;
			height: 12%;
			border: 1px solid $uni-border-color;
			justify-content: center;
			align-items: center;
			margin-top: 10%;
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
			
			// 图标
			&-img {
				display: flex;
				position: relative;
				width: 10%;
				height: 50%;
				margin: 0px 10px;
				box-sizing: border-box;
				
				& image {
					display: flex;
					position: relative;
					width: 100%;
					height: 100%
				}
			}
			
			// 输入框
			&-input {
				display: flex;
				position: relative;
				width: 80%;
				height: 100%
			}
		}
		
		// 账户名
		&-account {
			display: flex;
			position: relative;
			width: 100%;
			height: 12%;
			border: 1px solid $uni-border-color;
			justify-content: center;
			align-items: center;
			
			// 图标
			&-img {
				display: flex;
				position: relative;
				width: 10%;
				height: 50%;
				margin: 0px 10px;
				box-sizing: border-box;
				
				& image {
					display: flex;
					position: relative;
					width: 100%;
					height: 100%
				}
			}
			
			// 输入框
			&-input {
				display: flex;
				position: relative;
				width: 80%;
				height: 100%
			}
		}
		
		// 密码
		&-password {
			display: flex;
			position: relative;
			width: 100%;
			height: 12%;
			border: 1px solid $uni-border-color;
			justify-content: center;
			align-items: center;
			border-bottom-left-radius: 10px;
			border-bottom-right-radius: 10px;
			
			// 图标
			&-img {
				display: flex;
				position: relative;
				width: 10%;
				height: 55%;
				margin: 0px 10px;
				box-sizing: border-box;
				
				& image {
					display: flex;
					position: relative;
					width: 100%;
					height: 100%
				}
			}
			
			// 调整密码图标
			&-rightImg image {
				height: 50%;
				align-self: center
			}
			
			// 输入框
			&-input {
				display: flex;
				position: relative;
				width: 80%;
				height: 100%
			}
		}
		
		// 用户协议
		&-protocol {
			display: flex;
			position: relative;
			width: 100%;
			height: 15%;
			font-size: $uni-font-size-lg;
			
			// 单选框
			&-container {
				display: flex;
				position: relative;
				width: 15%;
				height: 100%;
				justify-content: center;
				
				&-checkbox {
					display: flex;
					position: relative;
					width: 100%;
					height: 100%
				}
			}
				
			// 协议文本
			&-text {
				display: flex;
				position: relative;
				width: 85%;
				height: 100%;
				align-items: center;
				
				& a {
					display: inline-block;
					position: relative;
					height: 100%;
					text-decoration: none;
					color: #2E8B57
				}
			}
		}
		
		// 注册按钮
		&-submit {
			display: flex;
			position: relative;
			width: 100%;
			height: 10%;
			color: white;
			justify-content: center;
			align-items: center;
			background-color: rgba($color: #008080, $alpha: 1.0);
			-webkit-tap-highlight-color: rgba($color: #008080, $alpha: 1.0);
			
			&:active {
				color: #B6B6B6;
				background-color: rgba($color: #008080, $alpha: 0.8)
			}
		}
	}
</style>
