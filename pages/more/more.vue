<template>
	<view class = "more-root">
		
		<!-- 头部导航栏 组件 -->
		<view class = "navbar">
			<hx-navbar 
				:title = "navbarTitle" 
				back = "true"
				fixed = "true"
				color = "#ffffff"
				barPlaceholder = "auto"
				transparent = "auto"
				:background-color = "this.navbarColor"
				:pageScroll.sync = "this.scrollData"
				@click-right = "Search"
				>
					<!-- 右插槽：搜索框 -->
					<view  slot = "right" class = "navbar-right">
						<uni-icons type = "search" size = "22" color = "#666666" class = "navbar-right-icon" />
					</view>
			</hx-navbar>
		</view>
		
		
		<!-- 竖向信息栏 -->
		<view class = "Morelist">
			<Info-portraitList
			:listData = "M_listData"
			>
			</Info-portraitList>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 导航栏 渐变色
				navbarColor: [[28, 187, 180], [141, 198, 63]],
				// 导航栏 滚动距离
				scrollData: {},
				// 导航栏 标题
				navbarTitle: '详细',
				
				// 信息栏数据
				M_listData: []
			}
		},
		// 监听页面加载：传参数
		onLoad(data) {
			// 设置 导航栏标题
			this.navbarTitle = getApp().globalData.MoreTitle;
			// 设置 信息栏数据
			this.M_listData = getApp().globalData.MoreData
		},
		// 监听页面滚动
		onPageScroll(e) {
			// 传递滚动对象
		    this.scrollData = e
		},
		// 页面数据加载
		created() {
			// 检测数据为空
			this.refresh()
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
			// 检测数据是否为空：刷新页面数据为空
			refresh: function() {
				// 检测数据为空
				!this.M_listData.length && (
					// 跳转首页
					this.$pageSkip({
						url: '/pages/index/index'
					}, 'tabBar')
				)
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 根节点
	.more-root {
		display: flex;
		position: relative;
		flex-direction: column;
		width: 100%
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
	
	// 竖向信息栏
	.Morelist {
		display: flex;
		position: relative;
		width: 100%
	}
</style>