<template>
	<!-- 根目录 -->
	<view class = "index-root">
		
		<!-- 头部导航栏 组件 -->
		<view class = "navbar">
			<hx-navbar 
				title = "拉片网" 
				:back = "false"
				:fixed = "true"
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
		
		
		<!-- 轮播区域 -->
		<view class = "swiper">
			<swiper
			:indicator-dots = "true"
			:autoplay = "true"
			:interval = "3000"
			:duration = "1000"
			circular = "true"
			@change = "swiperChange"
			class = "swiper-container">
				<swiper-item
				v-for = "(item, i) in this.swiperImages"
				:key = "i"
				class = "swiper-item"
				@tap = "scrollLink(item.link)"
				>
					<view class = "swiper-item-content">
						<image :src = "item.image">
					</view>
				</swiper-item>
			</swiper>	
		</view>
		
		
		<!-- 用户排行榜 横向列表 -->
		<view class = "userList" ref = "User">
			<Info-landscapeList
			class = "userList-content"
			title = "用户贡献榜"
			rootWidth = "95%"
			rootHeight = "100%"
			@titleClick = "userDisplay"
			:listData = "UserData"
			@listMore = "listMore"
			></Info-landscapeList>
		</view>
		
		
		<!-- 学术排行榜 横向列表 -->
		<view class = "acadList" ref = "Academic">
			<Info-landscapeList
			class = "acadList-content"
			title = "学术热度榜"
			rootWidth = "95%"
			rootHeight = "100%"
			@titleClick = "acadDisplay"
			:listData = "AcadData"
			@listMore = "listMore"
			></Info-landscapeList>
		</view>
		
		
		<!-- 影视排行榜 横向列表 -->
		<view class = "filmList" ref = "Film">
			<Info-landscapeList
			class = "filmList-content"
			title = "影视热度榜"
			rootWidth = "95%"
			rootHeight = "100%"
			@titleClick = "filmDisplay"
			:listData = "FilmData"
			@listMore = "listMore"
			></Info-landscapeList>
		</view>
		
		
		<!-- 影视视频课程排行榜 横向列表 -->
		<view class = "v_courList" ref = "v_Course">
			<Info-landscapeList
			class = "v_courList-content"
			title = "影视视频课程榜"
			rootWidth = "95%"
			rootHeight = "100%"
			@titleClick = "v_courDisplay"
			:listData = "v_CourseData"
			@listMore = "listMore"
			></Info-landscapeList>
		</view>
		
		
		<!-- 影视图文课程排行榜 横向列表 -->
		<view class = "it_courList" ref = "it_Course">
			<Info-landscapeList
			class = "it_courList-content"
			title = "影视图文课程榜"
			rootWidth = "95%"
			rootHeight = "100%"
			@titleClick = "it_courDisplay"
			:listData = "it_CourseData"
			@listMore = "listMore"
			></Info-landscapeList>
		</view>
		
		
		<!-- 其他视频课程排行榜 横向列表 -->
		<view class = "v_otherList" ref = "v_Other">
			<Info-landscapeList
			class = "v_otherList-content"
			title = "其他视频课程榜"
			rootWidth = "95%"
			rootHeight = "100%"
			@titleClick = "v_otherDisplay"
			:listData = "v_OtherData"
			@listMore = "listMore"
			></Info-landscapeList>
		</view>
		
		
		<!-- 其他图文课程排行榜 横向列表 -->
		<view class = "it_otherList" ref = "it_Other">
			<Info-landscapeList
			class = "it_otherList-content"
			title = "其他图文课程榜"
			rootWidth = "95%"
			rootHeight = "100%"
			@titleClick = "it_otherDisplay"
			:listData = "it_OtherData"
			@listMore = "listMore"
			></Info-landscapeList>
		</view>
		
	</view>
</template>

<script>
	export default {
		// 数据接口
		data() {
			return {
				// 导航栏 渐变色
				navbarColor: [[28, 187, 180], [141, 198, 63]],
				// 导航栏 滚动距离
				scrollData: {},
				
				// 轮播区 数据请求路径
				swiperPath: '/public/images/Scroll/',
				// 轮播区 图片数据
				swiperImages: [],
				
				// 用户排行榜 开关
				UserSwitch: true,
				// 用户排行榜 高度
				UserHeight: 0,
				// 用户排行榜 数据请求路径
				UserPath: '/index/contribution/',
				// 用户排行榜 数据
				UserData: [],
				
				// 学术排行榜 开关
				AcadSwitch: true,
				// 学术排行榜 高度
				AcadHeight: 0,
				// 学术排行榜 数据请求路径
				AcadPath: '/index/academic/',
				// 学术排行榜 数据
				AcadData: [],
				
				// 影视排行榜 开关
				FilmSwitch: true,
				// 影视排行榜 高度
				FilmHeight: 0,
				// 影视排行榜 数据请求路径
				FilmPath: '/index/film/',
				// 影视排行榜 数据
				FilmData: [],
				
				// 影视视频课程排行榜 开关
				v_CourSwitch: true,
				// 影视视频课程排行榜 高度
				v_CourHeight: 0,
				// 影视视频课程排行榜 数据
				v_CourseData: [],
				// 影视图文课程排行榜 开关
				it_CourSwitch: true,
				// 影视图文课程排行榜 高度
				it_CourHeight: 0,
				// 影视图文课程排行榜 数据
				it_CourseData: [],
				// 影视课程排行榜 数据请求路径
				CoursePath: '/index/filmCourse/',
				
				// 其他视频课程排行榜 开关
				v_OtherSwitch: true,
				// 其他视频课程排行榜 高度
				v_OtherHeight: 0,
				// 其他视频课程排行榜 数据
				v_OtherData: [],
				// 其他图文课程排行榜 开关
				it_OtherSwitch: true,
				// 其他图文课程排行榜 高度
				it_OtherHeight: 0,
				// 其他图文课程排行榜 数据
				it_OtherData: [],
				// 其他课程排行榜 数据请求路径
				OtherPath: '/index/otherCourse/'
			}
		},
		// 监听页面加载：传参数
		onLoad(data) {
			// 请求 轮播图数据
			this.swiperData();
			// 请求 用户排行榜数据
			this.userRequest();
			// 请求 学术排行榜数据
			this.acadRequest();
			// 请求 影视排行榜数据
			this.filmRequest();
			// 请求 影视课程排行榜数据
			this.courseRequest();
			// 请求 其他课程排行榜数据
			this.otherRequest()
		},
		// 监听页面滚动
		onPageScroll(e){
			// 传递滚动对象
		    this.scrollData = e
		},
		// 方法接口
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
			
			// 请求 轮播图数据
			async swiperData() {
				let result = await this.$DataHandle({
					url: this.swiperPath
				});
				// 数据请求成功
				!result.status && (
					this.swiperImages = result.content
				);
				// 数据请求失败
				result.status && (
					this.$InfoToast({
						title: '轮播图请求失败'
					})
				)
			},
			// 轮播图滚动 回调函数
			swiperChange (e) {
				
			},
			// 轮播图点击跳转
			scrollLink: function(data) {
				// 跳转页面
				this.$pageSkip({
					url: data
				})
			},
			
			// 用户排行隐藏
			userDisplay: function() {
				// 获取节点
				let usr = this.$refs.User;
				// 获取高度
				let Height = usr.$el.clientHeight;
				// 调整高度
				if (this.UserSwitch) {
					this.UserHeight = Height;
					usr.$el.style.height = Height * 0.15 + 'px';
					this.UserSwitch = !this.UserSwitch
				} else {
					usr.$el.style.height = this.UserHeight + 'px';
					this.UserSwitch = !this.UserSwitch
				}
			},
			// 用户排行数据请求
			userRequest: async function() {
				let result = await this.$DataHandle({
					url: this.UserPath
				});
				// 数据请求成功
				let transform = [];
				!result.status && (
					result.content.forEach((item, index) => {
						transform[index] = {};
						transform[index]['name'] = item.NickName;
						transform[index]['rank'] = item.Ranking;
						transform[index]['value'] = item.ContributionValue;
						transform[index]['image'] = item.MyHeadPortrait;
						transform[index]['tag'] = []
					}),
					this.UserData = transform
				);
				// 数据请求失败
				result.status && (
					this.$InfoToast({
						title: result.message
					})
				)
			},
			
			// 学术排行隐藏
			acadDisplay: function() {
				// 获取节点
				let cademic = this.$refs.Academic;
				// 获取高度
				let Height = cademic.$el.clientHeight;
				// 调整高度
				if (this.AcadSwitch) {
					this.AcadHeight = Height;
					cademic.$el.style.height = Height * 0.15 + 'px';
					this.AcadSwitch = !this.AcadSwitch
				} else {
					cademic.$el.style.height = this.AcadHeight + 'px';
					this.AcadSwitch = !this.AcadSwitch
				}
			},
			// 学术排行数据请求
			acadRequest: async function() {
				let result = await this.$DataHandle({
					url: this.AcadPath
				});
				// 数据请求成功
				let transform = [];
				!result.status && (
					result.content.forEach((item, index) => {
						transform[index] = {};
						transform[index]['name'] = item.Name;
						transform[index]['rank'] = item.Ranking;
						transform[index]['value'] = item.AcademicValue;
						transform[index]['image'] = item.AcadImage;
						transform[index]['tag'] = []
					}),
					this.AcadData = transform
				);
				// 数据请求失败
				result.status && (
					this.$InfoToast({
						title: result.message
					})
				)
			},
			
			// 影视排行隐藏
			filmDisplay: function() {
				// 获取节点
				let film = this.$refs.Film;
				// 获取高度
				let Height = film.$el.clientHeight;
				// 调整高度
				if (this.FilmSwitch) {
					this.FilmHeight = Height;
					film.$el.style.height = Height * 0.15 + 'px';
					this.FilmSwitch = !this.FilmSwitch
				} else {
					film.$el.style.height = this.FilmHeight + 'px';
					this.FilmSwitch = !this.FilmSwitch
				}
			},
			// 影视排行数据请求
			filmRequest: async function() {
				let result = await this.$DataHandle({
					url: this.FilmPath
				});
				// 数据请求成功
				let transform = [];
				!result.status && (
					result.content.forEach((item, index) => {
						transform[index] = {};
						transform[index]['name'] = item.Name;
						transform[index]['rank'] = item.Ranking;
						transform[index]['value'] = item.FilmsValue;
						transform[index]['image'] = item.FilmImage;
						transform[index]['tag'] = []
					}),
					this.FilmData = transform
				);
				// 数据请求失败
				result.status && (
					this.$InfoToast({
						title: result.message
					})
				)
			},
			
			// 影视视频课程排行隐藏
			v_courDisplay: function() {
				// 获取节点
				let v_course = this.$refs.v_Course;
				// 获取高度
				let Height = v_course.$el.clientHeight;
				// 调整高度
				if (this.v_CourSwitch) {
					this.v_CourHeight = Height;
					v_course.$el.style.height = Height * 0.15 + 'px';
					this.v_CourSwitch = !this.v_CourSwitch
				} else {
					v_course.$el.style.height = this.v_CourHeight + 'px';
					this.v_CourSwitch = !this.v_CourSwitch
				}
			},
			// 影视图文课程排行隐藏
			it_courDisplay: function() {
				// 获取节点
				let it_course = this.$refs.it_Course;
				// 获取高度
				let Height = it_course.$el.clientHeight;
				// 调整高度
				if (this.it_CourSwitch) {
					this.it_CourHeight = Height;
					it_course.$el.style.height = Height * 0.15 + 'px';
					this.it_CourSwitch = !this.it_CourSwitch
				} else {
					it_course.$el.style.height = this.it_CourHeight + 'px';
					this.it_CourSwitch = !this.it_CourSwitch
				}
			},
			// 影视课程排行数据请求
			courseRequest: async function() {
				let result = await this.$DataHandle({
					url: this.CoursePath
				});
				// 数据请求成功
				let v_transform = [];
				let it_transform = [];
				!result.status && (
					// 视频课程
					result.content.video.forEach((item, index) => {
						v_transform[index] = {};
						v_transform[index]['name'] = item.Name;
						v_transform[index]['rank'] = item.Ranking;
						v_transform[index]['value'] = item.CourseValue;
						v_transform[index]['image'] = item.src;
						v_transform[index]['tag'] = item.VideoTag
					}),
					this.v_CourseData = v_transform,
					// 图文课程
					result.content.imageText.forEach((item, index) => {
						it_transform[index] = {};
						it_transform[index]['name'] = item.Name;
						it_transform[index]['rank'] = item.Ranking;
						it_transform[index]['value'] = item.CourseValue;
						it_transform[index]['image'] = item.src;
						it_transform[index]['tag'] = item.ImageTextTag
					}),
					this.it_CourseData = it_transform
				);
				// 数据请求失败
				result.status && (
					this.$InfoToast({
						title: result.message
					})
				)
			},
			
			// 其他视频课程排行隐藏
			v_otherDisplay: function() {
				// 获取节点
				let v_other = this.$refs.v_Other;
				// 获取高度
				let Height = v_other.$el.clientHeight;
				// 调整高度
				if (this.v_OtherSwitch) {
					this.v_OtherHeight = Height;
					v_other.$el.style.height = Height * 0.15 + 'px';
					this.v_OtherSwitch = !this.v_OtherSwitch
				} else {
					v_other.$el.style.height = this.v_OtherHeight + 'px';
					this.v_OtherSwitch = !this.v_OtherSwitch
				}
			},
			// 其他图文课程排行隐藏
			it_otherDisplay: function() {
				// 获取节点
				let it_other = this.$refs.it_Other;
				// 获取高度
				let Height = it_other.$el.clientHeight;
				// 调整高度
				if (this.it_OtherSwitch) {
					this.it_OtherHeight = Height;
					it_other.$el.style.height = Height * 0.15 + 'px';
					this.it_OtherSwitch = !this.it_OtherSwitch
				} else {
					it_other.$el.style.height = this.it_OtherHeight + 'px';
					this.it_OtherSwitch = !this.it_OtherSwitch
				}
			},
			// 其他课程排行数据请求
			otherRequest: async function() {
				let result = await this.$DataHandle({
					url: this.OtherPath
				});
				// 数据请求成功
				let v_transform = [];
				let it_transform = [];
				!result.status && (
					// 视频课程
					result.content.video.forEach((item, index) => {
						v_transform[index] = {};
						v_transform[index]['name'] = item.Name;
						v_transform[index]['rank'] = item.Ranking;
						v_transform[index]['value'] = item.OtherValue;
						v_transform[index]['image'] = item.src;
						v_transform[index]['tag'] = item.VideoTag
					}),
					this.v_OtherData = v_transform,
					// 图文课程
					result.content.imageText.forEach((item, index) => {
						it_transform[index] = {};
						it_transform[index]['name'] = item.Name;
						it_transform[index]['rank'] = item.Ranking;
						it_transform[index]['value'] = item.OtherValue;
						it_transform[index]['image'] = item.src;
						it_transform[index]['tag'] = item.ImageTextTag
					}),
					this.it_OtherData = it_transform
				);
				// 数据请求失败
				result.status && (
					this.$InfoToast({
						title: result.message
					})
				)
			},
			
			// 排行榜详细页面跳转
			listMore: function(title, data) {
				// 设置 详细页标题
				getApp().globalData.MoreTitle = title;
				// 设置 详细页数据
				getApp().globalData.MoreData = data;
				// 跳转页面
				this.$pageSkip({
					url: '/pages/more/more'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 根目录
	.index-root > view:nth-child(odd) {
		background-color: $uni-bg-color-odd
	}
	.index-root > view {
		margin-bottom: 15px
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
	
	// 滚动栏样式
	.swiper {
		display: flex;
		position: relative;
		width: 100%;
		height: 180px;
		justify-content: center;
		
		&-container {
			display: flex;
			position: relative;
			width: 95%;
			height: 100%
		}
		
		&-item {
			display: flex;
			position: relative;
			width: 100%;
			height: 100%;
			
			&-content {
				display: flex;
				position: relative;
				width: 100%;
				height: 100%;
				margin: 0px 5px;
				
				& image {
					display: flex;
					position: relative;
					width: 100%;
					height: 180px;
					border-radius: 5px
				}
			}
		}
	}

	// 用户排行榜
	.userList {
		display: flex;
		position: relative;
		width: 100%;
		height: $uni-rank-container-height;
		justify-content: center;
		
		&-content {
			display: flex;
			position: relative
		}
	}
	
	// 学术排行榜
	.acadList {
		display: flex;
		position: relative;
		width: 100%;
		height: $uni-rank-container-height;
		justify-content: center;
		
		&-content {
			display: flex;
			position: relative
		}
	}
	
	// 影视排行榜
	.filmList {
		display: flex;
		position: relative;
		width: 100%;
		height: $uni-rank-container-height;
		justify-content: center;
		
		&-content {
			display: flex;
			position: relative
		}
	}
	
	// 影视视频课程排行榜
	.v_courList {
		display: flex;
		position: relative;
		width: 100%;
		height: $uni-rank-container-height;
		justify-content: center;
		
		&-content {
			display: flex;
			position: relative
		}
	}
	
	// 影视图文课程排行榜
	.it_courList {
		display: flex;
		position: relative;
		width: 100%;
		height: $uni-rank-container-height;
		justify-content: center;
		
		&-content {
			display: flex;
			position: relative
		}
	}
	
	// 其他视频课程排行榜
	.v_otherList {
		display: flex;
		position: relative;
		width: 100%;
		height: $uni-rank-container-height;
		justify-content: center;
		
		&-content {
			display: flex;
			position: relative
		}
	}
	
	// 其他图文课程排行榜
	.it_otherList {
		display: flex;
		position: relative;
		width: 100%;
		height: $uni-rank-container-height;
		justify-content: center;
		
		&-content {
			display: flex;
			position: relative
		}
	}
</style>