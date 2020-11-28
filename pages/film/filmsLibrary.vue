<template>
	<view class = "filmLib-root">
		
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
		
		
		<!-- 筛选器 -->
		<film-filter
		:basicType = "filterBasic"
		:detailType = "filterDatail"
		:slideSpeed = "slideSpeed"
		@Filter = "filmFilter"
		></film-filter>
		
		
		<!-- 列表内容 -->
		<film-list
		:listData = "filmData"
		@moreContent = "moreContent"
		></film-list>
		
		
		<!-- 分页 -->
		<view class = "paging">
			<uni-pagination
			title = "资料馆"
			show-icon = "true"
			:total = "totalData"
			:pageSize = "pageData"
			@change = "pageContent"
			></uni-pagination>
		</view>
		
	</view>
</template>

<script>
	// 导入 vuex 数据
	import { mapState } from 'vuex';
	export default {
		// 数据接口
		data() {
			return {
				// 导航栏 渐变色
				navbarColor: [[28, 187, 180], [141, 198, 63]],
				// 导航栏 滚动距离
				scrollData: {},
				
				// 筛选器基本类别
				filterBasic: ['默认', '热度值'],
				// 筛选器详细类别
				filterDatail: [
					{ 
						type: '国家地区',
						content: ['全部', '内地', '中国香港', '中国台湾', '美国', '日本', '韩国',
						'印度', '泰国', '英国', '法国', '德国', '意大利', '西班牙', '北欧', '加拿大',
						'澳大利亚', '墨西哥', '拉丁美洲', '欧洲', '东南亚', '其他']
					},
					{
						type: '类型',
						content: ['全部', '剧情', '喜剧', '动作', '爱情', '惊悚', '犯罪',
						'警匪', '悬疑', '战争', '科幻', '动画', '恐怖', '灾难', '家庭', '传记',
						'冒险', '公路', '奇幻', '武侠', '历史', '运动', '歌舞', '音乐', '记录',
						'伦理', '西部', '艺术', '武士剑戟', '风月', '粉红', '实验']
					},
					{
						type: '年代',
						content: ['全部', '2020', '2019', '2018', '2017', '2016', '2015',
						'2014', '2013-2011', '2010-2006', '2005-2000', '90年代', '80年代', '其他']
					}
				],
				// 筛选器滑动速度
				slideSpeed: 50,
				// 筛选器关键字
				KeyWord: {},
				// 筛选器绝对路径
				slidePath: '/FilmsLibrary/filter/',
				
				// 影视数据
				filmData: [],
				// 影视初始化绝对路径
				filmPath: '/FilmsLibrary/content/',
				
				// 分页 资源总数
				totalData: 0,
				// 分页 每页资源数
				pageData: 15,
				// 分页资源绝对路径
				pagingPath: '/FilmsLibrary/content/paging/'
			}
		},
		// 监听页面滚动
		onPageScroll(e){
			// 传递滚动对象
		    this.scrollData = e
		},
		// 页面初始化
		onLoad() {
			// 初始化 影视数据
			this.filmResorce()
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
			
			// 筛选器点击搜索事件
			filmFilter: async function(data) {
				// 保存关键字
				this.KeyWord = data;
				// 封装请求数据
				data.count = this.pageData;
				// 影视数据初始化请求
				let result = await this.$DataHandle({
					url: this.slidePath,
					data: data,
					method: 'post'
				});
				// 声明 中间变量
				let init = [];
				// 数据获取成功
				(result.status === 0) && (
					// 资源总数
					this.totalData = result.content.TotalContent,
					// 封装数据
					result.content.CurrentContent.forEach((item, index) => {
						// 初始化对象
						init[index] = {};
						// 数据处理
						init[index]['image'] = item.Src;
						init[index]['symbol'] = item.Symbol;
						init[index]['date'] = item.Time;
						init[index]['list'] = [item.Name, '导演：' + item.Director[0]]
					}),
					// 赋值
					this.filmData = init
				);
				
				// 数据获取失败
				(result.status === 1) && (
					this.$InfoToast({
						title: result.message
					})
				)
			},
			
			// 影视列表点击加载内容
			moreContent: function(data) {
				// 保存数据
				this.filmInfo = data;
				// 传参
				let name = data.list[0];
				// 页面跳转
				this.$pageSkip({
					url: '/pages/film/filmsInfo?name=' + name
				})
			},
			// 影视初始化数据获取
			filmResorce: async function() {
				// 封装请求数据
				let film = {
					CurrentCount: this.pageData
				};
				// 影视数据初始化请求
				let result = await this.$DataHandle({
					url: this.filmPath,
					data: film,
					method: 'post'
				});
				// 声明 中间变量
				let init = [];
				// 数据获取成功
				(result.status === 0) && (
					// 资源总数
					this.totalData = result.content.totalCount,
					// 封装数据
					result.content.contents.forEach((item, index) => {
						// 初始化对象
						init[index] = {};
						// 数据处理
						init[index]['image'] = item.Src;
						init[index]['symbol'] = item.Symbol;
						init[index]['date'] = item.Time;
						init[index]['list'] = [item.Name, '导演：' + item.Director[0]]
					}),
					// 赋值
					this.filmData = init
				);
				
				// 数据获取失败
				(result.status === 1) && (
					this.$InfoToast({
						title: result.message
					})
				)
			},
			
			// 分页点击事件
			pageContent: async function(e) {
				// 封装请求数据
				let page = this.KeyWord;
				// 添加页码与容量
				page.CurrentCount = this.pageData;
				page.Count = e.current;
				// 请求数据
				// 影视数据初始化请求
				let result = await this.$DataHandle({
					url: this.pagingPath,
					data: page,
					method: 'post'
				});
				// 声明 中间变量
				let init = [];
				// 数据获取成功
				(result.status === 0) && (
					// 封装数据
					result.content.forEach((item, index) => {
						// 初始化对象
						init[index] = {};
						// 数据处理
						init[index]['image'] = item.Src;
						init[index]['symbol'] = item.Symbol;
						init[index]['date'] = item.Time;
						init[index]['list'] = [item.Name, '导演：' + item.Director[0]]
					}),
					// 赋值
					this.filmData = init
				);
				
				// 数据获取失败
				(result.status === 1) && (
					this.$InfoToast({
						title: result.message
					})
				)
			}
		},
		// 监督数据
		computed: mapState(['filmInfo'])
	}
</script>

<style lang="scss" scoped>
	// 根路径
	.filmLib-root {
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
	
	// 分页
	.paging {
		display: flex;
		position: relative;
		width: 100%;
		justify-content: center;
		align-items: center;
		margin: 50px 0px 30px
	}
</style>