<template>
	<view class = "login-root">
		
		<!-- 头部导航栏 组件 -->
		<view class = "navbar">
			<hx-navbar 
				title = "登陆" 
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
		
		
		<!-- 登陆区域 -->
		<view class = "page_login">
			
			<!-- 头部logo -->
			<view class = "head">
				<!-- 头像 -->
				<view class = "head_bg">
					<view class = "head_inner_bg">
						<image
						style = "width: 55px; height: 65px"
						:src = "imgInfo.head"
						class = "head_logo"
						/>
					</view>
				</view>
				
				<!-- 错误提示 -->
				<view class = "error">{{ this.errorMessage }}</view>
			</view>
			
			
			<!-- 登录form -->
			<view class = "login_form">
				<view class = "input">
					<view class = "img">
						<image style = "width:27px; height: 27px" :src = "imgInfo.icon_user" />
					</view>
					<input
					type = "text"
					v-model = "username"
					placeholder = "请输入用户账号或手机号"
					@blur = "verifyUsername"
					>
					<view class = "img">
						<image @tap = "delUser" class = "img_del" :src = "imgInfo.icon_del" />
					</view>
				</view>
				
				<view class = "line" />
				
				<view class = "input">
					<view class = "img">
						<image style = "width:20px; height: 25px" :src = "imgInfo.icon_pwd" />
					</view>
					<input
					:password = "pwdType"
					v-model = "userpwd"
					placeholder = "请输入密码"
					@blur = "verifyPassword"
					>
					<view class = "img" @tap = "switchPwd">
						<image class = "img_pwd_switch" :src = "imgInfo.icon_pwd_switch" />
					</view>
				</view>
			</view>
			
			
			<!-- 登录提交 -->
			<button class = "submit" type = "primary" @tap = "userLogin">登录</button>
			<view class = "opts">
				<text @tap = "goReg" class = "text">立即注册</text>
				<text @tap = "findPwd" class = "text">忘记密码？</text>
			</view>
			
			
			<!-- 分界线 -->
			<view class = "quick_login_line">
				<view class = "line" />
				<text class = "text">快速登录</text>
				<view class = "line" />
			</view>
		
			<!-- 其他快捷登陆 -->
			<view class = "quick_login_list">
				<image @tap = "thirdLogin('qq')" class = "item" :src = "imgInfo.qq" />
				<image @tap = "thirdLogin('wechat')" class = "item" :src = "imgInfo.wechat" />
				<image @tap = "thirdLogin('weibo')" class = "item" :src = "imgInfo.weibo" />
			</view>
			
		</view>
		
	</view>
</template>

<script>
	// 导入 vuex 状态管理
	import {
		mapMutations
	} from 'vuex';
	export default {
		data() {
			// 判断是否为 uni-app 环境
			const isUni = typeof(uni) !== 'undefined';
			return {
				// 导航栏 渐变色
				navbarColor: [[28, 187, 180], [141, 198, 63]],
				
				// 错误提示
				errorMessage: '',
				
				// 用户名
				username: '',
				// 密码
				userpwd: '',
				// 密码框类型
				pwdType: true,
				// 图标位置
				imgInfo: {
					head: isUni ? '/static/person/head.png' : require('./images/head.png'),
					icon_user: isUni ? '/static/person/icon_user.png' : require('./images/icon_user.png'),
					icon_del: isUni ? '/static/person/icon_del.png' : require('./images/icon_del.png'),
					icon_pwd: isUni ? '/static/person/icon_pwd.png' : require('./images/icon_pwd.png'),
					icon_pwd_switch: isUni ? '/static/person/icon_pwd_switch.png' : require('./images/icon_pwd_switch.png'),
					qq: isUni ? '/static/person/qq.png' : require('./images/qq.png'),
					wechat: isUni ? '/static/person/wechat.png' : require('./images/wechat.png'),
					weibo: isUni ? '/static/person/weibo.png' : require('./images/weibo.png')
				},
				
				// 验证通过与否：默认 不通过
				// 用户名
				Verify_username: false,
				// 密码
				Verify_userpwd: false,
				
				// 用户登录绝对路径
				Login_path: '/login/'
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
			
			// 清空 用户名输入框
			delUser() {
				this.username = ''
			},
			// 密码框 明暗文转换
			switchPwd() {
				this.pwdType = !this.pwdType
			},
			
			// 找回密码 页面跳转
			findPwd() {
				this.$pageSkip({
					url: '/pages/person/find-pwd/find-pwd'
				})
			},
			// 注册页面 跳转
			goReg() {
				this.$pageSkip({
					url: '/pages/person/reg/reg'
				})
			},
			// 其他注册方式 跳转
			thirdLogin(type) {
				
			},
			
			// 登陆获取数据
			async userLogin() {
				// 检测用户数据 是否正确
				// 用户名
				if (!this.Verify_username) {
					this.verifyUsername();
					return
				};
				// 密码
				if (!this.Verify_userpwd) {
					this.verifyPassword();
					return
				};
				// 用户数据 正确
				// 用户上传数据
				let user = {
					'Account': this.username,
					'Password': this.userpwd
				};
				// 发送数据请求
				let result = await this.$DataHandle({
					url: this.Login_path,
					data: user,
					method: 'post'
				});
				// 1. 数据请求成功
				(result.status === 0) && (
					// 储存数据
					// 保存登录状态
					this.login(result.content),
					// 页面跳转
					this.$pageSkip({}, 'back')
				);
				
				// 2. 数据获取失败
				// 3. 密码错误
				// 4. 用户名不存在
				(result.status !== 0) && (
					this.$InfoToast({
						title: result.message
					})
				)
			},
			// 挂载登录状态
			...mapMutations(['login']),
			// 用户名验证
			verifyUsername: function() {
				// 检测输入是否为空
				if (this.username === '') {
					this.errorMessage = '请输入用户名或手机号';
					return
				};
				// 检测用户输入的是 手机号 还是 账户名
				let type = /^[0-9]+$/.test(this.username);
				// 获取验证结果
				let result = '';
				// 手机号
				type && (
					result = this.$verify.Phone(this.username)
				);
				// 账户名
				!type && (
					result = this.$verify.Account(this.username)
				);
				// 设置验证提示
				this.errorMessage = result.message;
				// 设置验证状态
				this.Verify_username = result.type
			},
			// 密码验证
			verifyPassword: function() {
				// 检测输入是否为空
				if (this.userpwd === '') {
					this.errorMessage = '请输入密码';
					return
				};
				// 获取验证结果
				let result = this.$verify.Password(this.userpwd);
				// 设置验证提示
				this.errorMessage = result.message;
				// 设置验证状态
				this.Verify_userpwd = result.type
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
	$text-color: #B6B6B6;

	// 根节点
	.login-root {
		display: flex;
		position: relative;
		width: 100%;
		height: 100%;
		background-color: #f5f6f8;
		flex-direction: column
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

	// 登陆组件
	.page_login {
		padding: 10px;
		width: 100%;
		height: 100%;
		box-sizing: border-box
	}

	// 头部 logo
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
		
		// 错误提示
		.error {
			display: flex;
			position: relative;
			width: 100%;
			height: $logo-padding;
			justify-content: center;
			align-items: center;
			font-size: $uni-font-size-base;
			color: #DC143C
		}
	}

	// 登录 form
	.login_form {
		display: flex;
		margin: 20px;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border: 1px solid $form-border-color;
		border-radius: 10px;

		.line {
			width: 100%;
			height: 1px;
			background-color: $form-border-color
		}

		.input {
			width: 100%;
			max-height: 45px;
			display: flex;
			padding: 3px;
			flex-direction: row;
			align-items: center;
			justify-content: center;

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

			input {
				outline: none;
				height: 30px;
				width: 100%;

				&:focus {
					outline: none
				}
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

	// 注册 忘记密码
	.opts {
		margin-top: 5px;
		margin-left: 25px;
		margin-right: 25px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;

		.text {
			font-size: 13px;
			color: $text-color
		}
	}

	// 快速登录分界线
	.quick_login_line {
		margin-top: 40px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		.line {
			height: 1px;
			width: 38%;
			background-color: rgba(211, 211, 213, 1)
		}

		.text {
			font-size: 13px;
			color: rgba(200, 200, 200, 1);
			margin: 2px
		}
	}

	// 其他登陆项
	.quick_login_list {
		margin-top: 30px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		.item {
			width: 50px;
			height: 50px;
			margin: 20px
		}
	}
</style>