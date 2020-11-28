<template>
	<view class = "filmInfo-list">
		
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
		
		
		<!-- 简略信息栏 -->
		<view class = "brief">
			<!-- 海报 -->
			<view class = "brief-poster">
				<image src = "~@/static/影视1.jpg"></image>
			</view>
			
			<!-- 简略信息 -->
			<view class = "brief-info">
				<!-- 名称 -->
				<view class = "brief-info-name">名称</view>
				<!-- 国家地区 -->
				<view class = "brief-info-country">国家地区</view>
				<!-- 上映年代 -->
				<view class = "brief-info-time">上映年代</view>
				<!-- 导演 -->
				<view class = "brief-info-director">导演</view>
			</view>
		</view>
		
		
		<!-- 评分栏 -->
		<view class = "grade">
			<!-- 评分类别 -->
			<view class = "grade-title">
				<!-- 图标 -->
				<image src = "~@/static/film/grade.svg" class = "grade-title-icon"></image>
				
				<!-- 下拉选择区 -->
				<view class = "grade-title-select" @tap = "selectClick">
					{{ this.selectVisible }}
					<!-- 下拉图标 -->
					<image src = "~@/static/film/pullDown.svg"></image>
					<!-- 下拉框 -->
					<view
					class = "grade-title-select-content"
					v-show = "selectDisplay"
					>
						<view
						class = "grade-title-select-content-item"
						v-for = "(item, i) in this.selectData"
						:key = "i"
						:class = "{ selected: i === 0 ? true : false }"
						@tap = "selectItem"
						>
							{{ item }}
						</view>
					</view>
				</view>
			</view>
			
			
			<!-- 评分内容 -->
			<view class = "grade-content">
				<!-- 数字评分 -->
				<view class = "grade-content-number">
					<!-- 数字 -->
					<view class = "grade-content-number-top">{{ this.rate }}</view>
					<!-- 星星 -->
					<uniRate
					class = "grade-content-number-bottom"
					:value = "rateStar"
					disabled = "true"
					size = "12"
					></uniRate>
				</view>
				
				
				<!-- 图形评分 -->
				<view class = "grade-content-graphic">
					<!-- 图形区 -->
					<view
					class = "grade-content-graphic-content"
					v-for = "(item, j) in this.selectGraphic"
					:key = "'star' + j"
					>
						<!-- 星星 -->
						<uniRate
						class = "grade-content-graphic-content-top"
						:max = "item.star"
						disabled = "true"
						size = "5"
						active-color = "#ececec"
						></uniRate>
						<!-- 条形图 -->
						<view
						class = "grade-content-graphic-content-bottom"
						>
							<view
							class = "grade-content-graphic-content-bottom-fill"
							:style = "{ width: (item.count / graphicCount) * 100 + '%' }"
							></view>
						</view>
					</view>
					
					<!-- 总评分人数 -->
					<view class = "grade-content-graphic-count">
						{{ this.graphicCount }}人评价
					</view>
				</view>
			</view>
		</view>
		
		
		<!-- 剧情简介 -->
		<view class = "plot">
			<!-- 标题区域 -->
			<view class = "plot-title">
				剧情简介
			</view>
			
			<!-- 内容区域 -->
			<view class = "plot-content" ref = "plot" @tap = "hiddenContent('plotDisplay')">
				这是情节区域
				<!-- 加载更多 -->
				<view
				class = "plot-content-more"
				@tap.stop = "moreContent('plotDisplay')"
				v-show = "plotDisplay"
				>
					<image src = "~@/static/film/more.svg"></image>
				</view>
			</view>
		</view>
		
		
		<!-- 演职人员 -->
		<view class = "staff">
			<!-- 标题区域 -->
			<view class = "staff-title">
				演职员表
			</view>
			
			<!-- 内容区域 -->
			<view class = "staff-content" ref = "staff" @tap = "hiddenContent('staffDisplay')">
				<!-- 职员标题 -->
				<view class = "staff-content-title">
					------ 职员表 ------
				</view>
				<!-- 职员表 -->
				<view class = "staff-content-list">
					导演：xxx
				</view>
				
				<!-- 演员标题 -->
				<view class = "staff-content-cast">
					------ 演员表 ------
				</view>
				<!-- 演员表 -->
				<view class = "staff-content-castList">
					角色 --- 演员
				</view>
				
				<!-- 加载更多 -->
				<view
				class = "staff-content-more"
				@tap.stop = "moreContent('staffDisplay')"
				v-show = "staffDisplay"
				>
					<image src = "~@/static/film/more.svg"></image>
				</view>
			</view>
		</view>
		
		
		<!-- 票房统计 -->
		<view class = "boxOffice">
			<!-- 标题区域 -->
			<view class = "boxOffice-title">
				票房
			</view>
			
			<!-- 内容区域 -->
			<view class = "boxOffice-content">
				<!-- 全球票房 -->
				<view class = "boxOffice-content-W_boxOffice">
					<ArcbarChart
					:dataAs = "W_boxOffice"
					canvasId = "W_boxOffice"
					labelKey = "label"
					valueKey = "value"
					:basicAs = "basicAs"
					:width = "chartWidth"
					:height = "chartHeight"
					class = "boxOffice-content-W_boxOffice-W_graph"
					></ArcbarChart>
					<!-- 数字 -->
					<view class = "boxOffice-content-W_boxOffice-W_text">100,000,000</view>
				</view>
				
				<!-- 中国票房 -->
				<view class = "boxOffice-content-C_boxOffice">
					<ArcbarChart
					:dataAs = "C_boxOffice"
					canvasId = "C_boxOffice"
					labelKey = "label"
					valueKey = "value"
					:basicAs = "basicAs"
					:width = "chartWidth"
					:height = "chartHeight"
					class = "boxOffice-content-C_boxOffice-C_graph"
					></ArcbarChart>
					<!-- 数字 -->
					<view class = "boxOffice-content-C_boxOffice-C_text">100,000,000</view>
				</view>
				
				<!-- 本地票房 -->
				<view class = "boxOffice-content-N_boxOffice">
					<ArcbarChart
					:dataAs = "N_boxOffice"
					canvasId = "N_boxOffice"
					labelKey = "label"
					valueKey = "value"
					:basicAs = "basicAs"
					:width = "chartWidth"
					:height = "chartHeight"
					class = "boxOffice-content-N_boxOffice-N_graph"
					></ArcbarChart>
					<!-- 数字 -->
					<view class = "boxOffice-content-N_boxOffice-N_text">100,000,000</view>
				</view>
			</view>
		</view>
		
		
		<!-- 相关影视 -->
		<view class = "relateFilm">
			<!-- 标题区域 -->
			<view class = "relateFilm-title">
				相关影视
			</view>
			
			<!-- 内容区域 -->
			<view class = "relateFilm-content">
				<relate-list></relate-list>
			</view>
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
				// 导航栏 标题
				navbarTitle: '',
				
				// 评分栏 下拉内容
				selectData: ['IMDB', '烂番茄专业评分', '烂番茄观众评分', 'MTC专业评分',
							'MTC观众评分', '豆瓣', '时光网'],
				// 评分栏 显示开关
				selectDisplay: false,
				// 评分栏 选中内容
				selectVisible: '',
				// 评分栏 图形评分数据
				selectGraphic: [
					{ star: 5, count: 300 },
					{ star: 4, count: 400 },
					{ star: 3, count: 150 },
					{ star: 2, count: 100 },
					{ star: 1, count: 50 }
				],
				// 评分栏 图形评分总人数
				graphicCount: 1000,
				// 评分栏 评分
				rate: '7.0',
				// 评分栏 星级
				rateStar: 3.5,
				
				// 内容框 内容高度
				contentHeight: 112,
				
				// 剧情简介 显示开关
				plotDisplay: false,
				
				// 演职员表 显示开关
				staffDisplay: false,
				
				// 环形图基本样式
				basicAs: {
					// 进度条颜色
					colors: ['#FF8C00']
				},
				chartWidth: 220,
				chartHeight: 220,
				// 全球票房
				W_boxOffice: {
					// 标签
					label: [],
					value: [
						{
							// 标题
							name: '全球票房',
							// 百分比：0-1
							data: [1.0]
						}
					]
				},
				// 中国票房
				C_boxOffice: {
					// 标签
					label: [],
					value: [
						{
							// 标题
							name: '中国票房',
							// 百分比：0-1
							data: [0.6]
						}
					]
				},
				// 本地票房
				N_boxOffice: {
					// 标签
					label: [],
					value: [
						{
							// 标题
							name: '本地票房',
							// 百分比：0-1
							data: [0.4]
						}
					]
				},
				
			}
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
			
			// 下拉框点击事件
			selectClick: function() {
				// 获取图标
				let icon = window.event.currentTarget.children[0] || event.currentTarget.children[0];
				// 设置图标旋转样式
				if (this.selectDisplay) {
					icon.style.transform = 'rotate(-90deg)'
				} else {
					icon.style.transform = 'rotate(0deg)'
				};
				// 显示下拉框
				this.selectDisplay = !this.selectDisplay
			},
			// 下拉框选项点击样式
			selectItem: function() {
				// 获取当前节点
				let node = window.event.currentTarget || event.currentTarget;
				// 获取父节点
				let parent = node.parentNode;
				// 判断当前点击节点是否已经选中
				if (!node.classList.contains('selected')) {
					// 删除 之前选中节点样式
					for (let i = 0; i < parent.children.length; i++) {
						if (parent.children[i].classList.contains('selected')) {
							parent.children[i].classList.remove('selected');
							break
						}
					};
					// 添加样式
					node.classList.add('selected');
					// 设置显示内容
					this.selectVisible = node.innerText;
					// 获取相应的数据
					this.selectRate(node.innerText)
				}
			},
			// 下拉框数据获取
			selectRate: function() {
				
			},
			
			// 内容框 加载隐藏内容
			moreContent: function(data) {
				// 获取父节点
				let parent = window.event.currentTarget.parentNode || event.currentTarget.parentNode;
				// 显示隐藏内容
				parent.style.overflow = 'visible';
				parent.style.height = 'max-content';
				// 动画效果
				parent.style.transition = 'all 0.3s ease';
				// 隐藏开关
				this[data] = false
			},
			// 内容框 隐藏内容
			hiddenContent: function(data) {
				// 获取节点
				let node = window.event.currentTarget || event.currentTarget;
				// 判断是否溢出
				let more = node.scrollHeight - this.contentHeight;
				// 隐藏内容
				if (more) {
					// 隐藏内容
					node.style.overflow = 'hidden';
					node.style.height = this.contentHeight + 'px';
					// 动画效果
					node.style.transition = 'all 0.3s ease';
					// 显示开关
					this[data] = true
				}
			},
			// 内容框 判断内容是否溢出
			overHidden: function(type, data) {
				// 获取节点
				let node = this.$refs[type].$el;
				// 判读是否溢出
				let more = node.scrollHeight - node.clientHeight;
				// 显示隐藏开关
				if (more) {
					this[data] = true
				}
			},
			
		},
		// 监听页面滚动
		onPageScroll(e){
			// 传递滚动对象
		    this.scrollData = e
		},
		// 页面加载：传参
		onLoad(data) {
			// 检测数据是否为空
			if (!data.name) {
				// 页面跳转
				this.$pageSkip({
					url: '/pages/film/filmsLibrary'
				}, 'tabBar');
				return
			};
			
			// 解析中文标题
			let title = data.name.split('[')[0];
			// 设置标题
			this.navbarTitle = title;
			
			// 设置下拉框 默认选择
			this.selectVisible = this.selectData[0]
		},
		// 页面显示
		onReady() {
			// 判断剧情简介 内容溢出
			this.overHidden('plot', 'plotDisplay');
			// 判断演职员表 内容溢出
			this.overHidden('staff', 'staffDisplay')
		}
	}
</script>

<style lang="scss" scoped>
	// 变量
	$bottom_margin: 30px;
	
	// 根节点
	.filmInfo-list {
		display: flex;
		position: relative;
		flex-direction: column;
		width: 100%;
		align-items: center
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
	
	// 简略信息栏
	.brief {
		display: flex;
		position: relative;
		width: 100%;
		margin: 10px 0px 20px;
		
		// 海报
		&-poster {
			display: flex;
			position: relative;
			width: 40%;
			min-height: 180px;
			padding: 0px 10px;
			box-sizing: border-box;
			
			& image {
				width: 100%;
				height: 100%
			}
		}
		
		// 简略信息
		&-info {
			display: flex;
			position: relative;
			width: 60%;
			min-height: 180px;
			flex-direction: column;
			font-size: $uni-font-size-lg;
			color: $uni-text-color-grey;
			
			// 名称
			&-name {
				display: inline-block;
				position: relative;
				width: 100%;
				margin-bottom: 10px;
				font-size: $uni-title-font-size;
				font-weight: bold;
				text-overflow: ellipsis;
				white-space: nowrap;
				color: $uni-text-color
			}
			
			// 国家地区
			&-country {
				display: inline-block;
				position: relative;
				width: 100%;
				margin-bottom: 8px;
				text-overflow: ellipsis;
				white-space: nowrap
			}
			
			// 上映年代
			&-time {
				@extend .brief-info-country;
			}
			
			// 导演
			&-director {
				@extend .brief-info-country;
			}
		}
	}
	
	// 评分栏
	.grade {
		display: flex;
		position: relative;
		width: 90%;
		height: 180px;
		border: 1px solid #4682B4;
		border-radius: 5px;
		flex-direction: column;
		background-color: rgba($color: $uni-bg-color-grey, $alpha: 0.3);
		margin-bottom: $bottom_margin;
		
		// 评分类别
		&-title {
			display: flex;
			position: relative;
			width: 100%;
			height: 20%;
			border-bottom: 1px solid $uni-border-color;
			align-items: center;
			
			// 图标
			&-icon {
				display: flex;
				position: relative;
				width: 15%;
				height: 80%
			}
			
			// 下拉选择区
			&-select {
				display: flex;
				position: relative;
				width: 85%;
				height: 100%;
				align-items: center;
				justify-content: space-between;
				
				// 图标
				& image {
					display: flex;
					position: relative;
					width: 15%;
					height: 50%;
					transform: rotate(-90deg)
				}
				
				// 下拉框
				&-content {
					display: flex;
					position: absolute;
					width: 80%;
					height: max-content;
					top: 100%;
					flex-direction: column;
					border: 1px solid $uni-border-color;
					overflow: hidden;
					background-color: rgba($color: #E6E6FA, $alpha: 0.2);
					border-bottom-left-radius: 5px;
					border-bottom-right-radius: 5px;
					z-index: 1000;
					
					// 下拉选项
					&-item {
						display: flex;
						position: relative;
						width: 100%;
						flex: 1;
						align-items: center;
						justify-content: center;
						padding: 5px 0px
					}
					
					// 下拉选项 选中样式
					.selected {
						background-color: rgba($color: #8FBC8F, $alpha: 0.3);
						color: #2F4F4F;
						font-weight: bold
					}
				}
			}
		}
		
		// 评分内容
		&-content {
			display: flex;
			position: relative;
			width: 100%;
			height: 80%;
			
			// 数字评分
			&-number {
				display: flex;
				position: relative;
				width: 30%;
				height: 100%;
				flex-direction: column;
				
				// 数字
				&-top {
					display: flex;
					position: relative;
					width: 100%;
					height: 50%;
					justify-content: center;
					align-items: flex-end;
					font-size: $uni-rate-font-size;
					padding: 15px 15px 10px;
					box-sizing: border-box;
					color: #DAA520
				}
				
				// 星星
				&-bottom {
					display: flex;
					position: relative;
					width: 100%;
					height: 50%;
					justify-content: center;
					align-items: flex-start;
					padding: 10px;
					box-sizing: border-box
				}
			}
			
			// 图形评分
			&-graphic {
				display: flex;
				position: relative;
				width: 70%;
				height: 100%;
				flex-direction: column;
				
				// 图形区
				&-content {
					display: flex;
					position: relative;
					width: 100%;
					flex: 1;
					align-items: center;
					
					// 星星
					&-top {
						display: flex;
						position: relative;
						width: 30%;
						height: 100%;
						align-items: center
					}
					
					// 条形图
					&-bottom {
						display: flex;
						position: relative;
						width: 70%;
						height: 50%;
						border: 1px solid $uni-border-color;
						margin: 0px 5px;
						border-radius: 10px;
						background-color: $uni-bg-color-hover;
						
						// 条形图填充
						&-fill {
							display: flex;
							position: relative;
							height: 100%;
							background-color: #FFA500;
							border-radius: 10px
						}
					}
				}
				
				// 总人数
				&-count {
					display: flex;
					position: relative;
					width: 100%;
					height: 20%;
					justify-content: flex-end;
					align-items: center;
					padding: 0px 10px;
					box-sizing: border-box;
					font-size: $uni-font-size-base;
					color:	#2F4F4F
				}
			}
		}
	}
	
	// 剧情简介
	.plot {
		display: flex;
		position: relative;
		width: 95%;
		height: max-content;
		flex-direction: column;
		margin-bottom: $bottom_margin;
		
		// 标题
		&-title {
			display: flex;
			position: relative;
			width: 100%;
			min-height: 38px;
			border-left: 8px solid #008B8B;
			font-size: $uni-title-font-size;
			align-items: center;
			padding: 5px;
			box-sizing: border-box;
			color: #778899
		}
		
		// 内容
		&-content {
			display: flex;
			position: relative;
			width: 100%;
			height: 112px;
			padding: 10px;
			box-sizing: border-box;
			// 首行缩进
			text-indent: 2em;
			overflow: hidden;
			font-size: $uni-font-size-base;
			
			// 加载更多
			&-more {
				display: flex;
				position: absolute;
				width: 30px;
				height: 30px;
				bottom: 0px;
				left: 50%;
				transform: translate(-50%);
				justify-content: center;
				background-color: rgba($color: #E6E6FA, $alpha: 0.8);
				border-radius: 100px;
				z-index: 1;
				
				// 图标
				& image {
					width: 30px;
					height: 30px;
					transform: rotate(180deg)
				}
			}
		}
	}
	
	// 演职员表
	.staff {
		@extend .plot;
		
		// 标题
		&-title {
			@extend .plot-title;
		}
		
		// 内容
		&-content {
			@extend  .plot-content;
			text-indent: 0;
			flex-direction: column;
			
			// 职员表标题
			&-title {
				display: flex;
				position: relative;
				width: 100%;
				height: 40px;
				justify-content: center;
				align-items: center;
				font-size: $uni-font-size-lg;
				color: $uni-text-color-grey
			}
			
			// 职员表
			&-list {
				display: flex;
				position: relative;
				width: 100%;
				height: max-content;
				align-items: center;
				padding: 10px;
				box-sizing: border-box
			}
			
			// 演员表标题
			&-cast {
				@extend .staff-content-title;
			}
			
			// 演员表
			&-castList {
				@extend .staff-content-list;
			}
			
			// 加载更多
			&-more {
				@extend .plot-content-more;
				
				// 图标
				& image {
					width: 30px;
					height: 30px;
					transform: rotate(180deg)
				}
			}
		}
	}
	
	// 票房
	.boxOffice {
		display: flex;
		position: relative;
		width: 95%;
		height: 358px;
		flex-direction: column;
		margin-bottom: $bottom_margin;
		
		// 标题区域
		&-title {
			@extend .plot-title;
		}
		
		// 内容区域
		&-content {
			display: flex;
			position: relative;
			width: 100%;
			height: 320px;
			padding: 10px;
			box-sizing: border-box;
			flex-wrap: wrap;
			
			// 全球票房
			&-W_boxOffice {
				display: flex;
				position: relative;
				height: 50%;
				width: 100%;
				flex-direction: column;
				overflow: hidden;
				justify-content: center;
				align-items: center;
				
				// 环形图
				&-W_graph {
					display: flex;
					position: relative;
					width: 100%;
					height: 80%;
					padding: 3px;
					box-sizing: border-box;
					align-items: center;
					justify-content: center
				}
				
				// 文字
				&-W_text {
					display: flex;
					position: relative;
					width: 100%;
					height: 20%;
					align-items: center;
					justify-content: center;
					font-size: $uni-font-size-lg;
					color: $uni-text-color-grey
				}
			}
			
			// 中国票房
			&-C_boxOffice {
				@extend .boxOffice-content-W_boxOffice;
				width: 50%;
				
				// 环形图
				&-C_graph {
					@extend .boxOffice-content-W_boxOffice-W_graph;
				}
				
				// 文字
				&-C_text {
					@extend .boxOffice-content-W_boxOffice-W_text;
				}
			}
			
			// 本地票房
			&-N_boxOffice {
				@extend .boxOffice-content-W_boxOffice;
				width: 50%;
				
				// 环形图
				&-N_graph {
					@extend .boxOffice-content-W_boxOffice-W_graph;
				}
				
				// 文字
				&-N_text {
					@extend .boxOffice-content-W_boxOffice-W_text;
				}
			}
		}
	}
</style>