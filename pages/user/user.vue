<template>
	<view>
		
		<!-- 用户信息区域 -->
		<view class = "header">
			<view class = "bg">
				<view class = "box">
					
					<!-- 用户名 头像 -->
					<view class = "box-hd">
						<view class = "avator" @click = "Login">
							<img :src = "MyHeadPortrait">
						</view>
						<view class = "user-name">{{ this.NickName }}</view>
					</view>
					
					<!-- 用户快捷中心 -->
					<view class = "box-bd">
						<view class = "item">
							<view class = "icon"><img src = "~@/static/user/message.png"></view>
							<view class = "text">我的通知</view>
						</view>
						<view class = "item">
							<view class = "icon"><img src = "~@/static/user/favorite.png"></view>
							<view class = "text">我的收藏</view>
						</view>
						<view class = "item">
							<view class = "icon"><img src = "~@/static/user/history.png"></view>
							<view class = "text">历史记录</view>
						</view>
					</view>
					
				</view>
			</view>
		</view>
		
		
		<!-- 设置选项 -->
		<view class = "list-content">
			
			<!-- 账号管理 -->
			<view class = "list">
				<view class = "li noborder" >
					<view class = "icon"><image src = "~@/static/user/account.png"></image></view>
					<view class = "text">账号管理</view>
					<image class = "to" src = "~@/static/user/to.png"></image>
				</view>
			</view>
			
			<view class = "list">
				<!-- 主题切换 -->
				<view class = "li " @click = "changeSkin">
					<view class = "icon"><image src = "~@/static/user/skin.png"></image></view>
					<view class = "text">主题切换</view>
					<image class = "to" src = "~@/static/user/to.png"></image>
				</view>
				
				<!-- 帮助中心 -->
				<view class = "li " >
					<view class = "icon"><image src = "~@/static/user/help.png"></image></view>
					<view class = "text">帮助中心</view>
					<image class = "to" src = "~@/static/user/to.png"></image>
				</view>
				
				<!-- 关于我们 -->
				<view class = "li " >
					<view class = "icon"><image src = "~@/static/user/about.png"></image></view>
					<view class = "text">关于我们</view>
					<image class = "to" src = "~@/static/user/to.png"></image>
				</view>
				
				<!-- 意见反馈 -->
				<view class = "li " >
					<view class = "icon"><image src = "~@/static/user/opinion.png"></image></view>
					<view class = "text">意见反馈</view>
					<image class = "to" src = "~@/static/user/to.png"></image>
				</view>
			</view>
			
			<!-- 系统设置：APP端 -->
			<!-- #ifdef APP-PLUS -->
			<view class = "list">
				<view class = "li noborder" >
					<view class = "icon"><image src = "~@/static/user/set.png"></image></view>
					<view class = "text">系统设置</view>
					<image class = "to" src = "~@/static/user/to.png"></image>
				</view>
			</view>
			<!-- #endif -->
			
		</view>
		
	</view>
</template>
<script>
	// 导入 vuex 状态管理
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		// 数据接口
		data() {
			return {
				// 用户数据
				UserData: '',
				// 用户头像
				MyHeadPortrait: '/static/user/face.jpg',
				// 用户名
				NickName: '请登录',
				
				// 用户身份验证绝对路径
				verifyPath: '/verify/'
			}
		},
		// 页面每次显示执行：初次加载，页面返回，浏览器最小化最大化
		onShow() {
			this.getData()
		},
		// 初始化加载
		onLoad() {
			// 用户身份验证
			this.userVerify()
		},
		// 方法接口
		methods: {
			// 更换个人中心皮肤
			changeSkin() {
				
			},
			// 登陆页面跳转
			Login: function() {
				// 未登录
				!this.hasLogin && (
					// 页面跳转
					this.$pageSkip({
						url: '/pages/person/login/login'
					})
				);
				// 登录
				this.hasLogin && (
					// 页面跳转：个人中心
					this.$pageSkip({
						url: '/pages/user/user'
					})
				)
			},
			// 用户身份验证
			userVerify: async function() {
				// 读取用户 token
				let token = uni.getStorageSync('userInfo');
				// 不存在
				!token && (token = '');
				// 发送数据请求
				let result = await this.$DataHandle({
					url: this.verifyPath,
					data: {
						token: token.token
					},
					method: 'post'
				});
				// 1. 数据请求成功
				(result.status === 0) && (
					// 储存数据
					this.userInfo = result.content
				);

				// 2. 数据获取失败
				(result.status === 2) && (
					// 注销登录状态
					this.logout()
				);
				
				// 3. 身份验证失败
				(result.status === 1) && (
					this.$InfoToast({
						title: result.message
					})
				)
			},
			// 挂载 注销方法
			...mapMutations(['logout']),
			// 设置 Data 初始化数据
			getData: function() {
				// 获取用户数据
				this.UserData = this.userInfo;
				// 设置用户头像
				this.MyHeadPortrait = this.UserData.MyHeadPortrait || this.MyHeadPortrait;
				// 设置用户名
				this.NickName = this.UserData.NickName || this.NickName
			}
		},
		// 挂载 用户 属性
		computed: mapState(['userInfo', 'hasLogin'])
	}
</script>

<style lang="scss" scoped>
	// 页面整体效果
	page {
		background-color: #f1f1f1;
		font-size: 30upx
	}
	
	// 用户信息区域
	.header {
		background: #fff;
		height: 290upx;
		padding-bottom: 110upx;
		
		.bg {
			width: 100%;
			height: 200upx;
			padding-top: 100upx;
			background-color: #4191ea
		}
	}
	
	// 用户信息
	.box {
		width: 650upx;
		height: 280upx;
		border-radius: 20upx;
		margin: 0 auto;
		background: #fff;
		box-shadow: 0 5upx 20upx 0upx rgba(0, 0, 150, .2);
		
		// 用户名 头像
		.box-hd {
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
			justify-content: center;
			
			.avator {
				width: 160upx;
				height: 160upx;
				background: #fff;
				border: 5upx solid #fff;
				border-radius: 50%;
				margin-top: -80upx;
				overflow: hidden;
				
				img {
					width: 100%;
					height: 100%
				}
			}
			
			.user-name {
				width: 100%;
				text-align: center
			}
		}
		
		// 用户快捷中心
		.box-bd {
			display: flex;
			flex-wrap: nowrap;
			flex-direction: row;
			justify-content: center;
			
			.item {
				flex: 1 1 auto;
				display: flex;
				flex-wrap: wrap;
				flex-direction: row;
				justify-content: center;
				border-right: 1px solid #f1f1f1;
				margin: 15upx 0;
				
				&:last-child {
					border: none
				}
				
				.icon {
					width: 60upx;
					height: 60upx;
					
					img{
						width: 100%;
						height: 100%
					}
				}
				
				.text {
					width: 100%;
					text-align: center;
					margin-top: 10upx
				}
			}
		}
	}
	
	// 设置选项 容器
	.list-content {
		background: #fff
	}
	
	// 设置选项 内容
	.list {
		width: 100%;
		border-bottom: 15upx solid  #f1f1f1;
		background: #fff;
		
		&:last-child {
			border: none
		}
		
		.li {
			width: 92%;
			height: 100upx;
			padding: 0 4%;
			border-bottom: 1px solid rgb(243,243,243);
			display: flex;
			align-items: center;
			
			&.noborder {
				border-bottom: 0
			}
				
			.icon {
				flex-shrink: 0;
				width: 50upx;
				height: 50upx;
				
				image {
					width: 50upx;
					height: 50upx
				}
			}
			
			.text {
				padding-left: 20upx;
				width: 100%;
				color: #666
			}
			
			.to {
				flex-shrink: 0;
				width: 40upx;
				height: 40upx
			}
		}
	}
</style>