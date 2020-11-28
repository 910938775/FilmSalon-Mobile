<template>
	<view>
		
		<!-- 头部导航栏 -->
		<!-- 头部导航栏 组件 -->
		<view class = "navbar">
			<hx-navbar 
				title = "搜索" 
				back = "true"
				fixed = "true"
				color = "#ffffff"
				barPlaceholder = "auto"
				:background-color = "this.navbarColor"
				>
			</hx-navbar>
		</view>
		
		
		<!-- 搜索页 -->
		<view class = "search">
			<zy-search
			:is-focus = "false"
			:theme = "themeClass"
			:show-want = "true"
			:speechEngine = "speechEngine"
			:hot-list = "hotList"
			@getSearchText = "getSearchText">
			</zy-search>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 导航栏 渐变色
				navbarColor: [[28, 187, 180], [141, 198, 63]],
				
				// 搜索页：主题类型
				themeClass: 'circle',
				// 语音识别引擎
				speechEngine: 'baidu',
				// 初始化推荐列表
				hotList: ['电影','学术','视频','其他']
			}
		},
		methods: {
			// 搜索回调函数
			getSearchText(e) {
				
			}
		}
	}
</script>

<style lang = "scss" scoped>
	
</style>