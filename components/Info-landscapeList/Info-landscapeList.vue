<template>
	<!-- 列表根容器 -->
	<view
	class = "list-root"
	ref = "root"
	:class = "{ 'yrdBold': font }"
	:style = "{ 'width': rootWidth, 'height': rootHeight }"
	>
	
		<!-- 列表外部容器 -->
		<view class = "list">
			
			<!-- 列表 标题区域 -->
			<view
			class = "list-title"
			:class = "gradientTitle"
			ref = "title"
			>
				<!-- 列表标题 -->
				<text class = "list-title-content" @click = "listDisplay">{{ this.title }}</text>
				<!--列表详细区入口 -->
				<text class = "list-title-more">详细</text>
				<!-- 列表标题图标 -->
				<view class = "list-title-icon" @click = "listMore">
					<image :src = "imageSrc" class = "list-title-icon-image"></image>
				</view>
			</view>
			
			
			<!-- 列表 内容区域 -->
			<movable-area class = "list-content" ref = "content">
				<view
				class = "list-content-move"
				ref = "move"
				:style = "{ 'left': i * 20 + 'px' }"
				@touchmove = "onChange"
				v-for = "(item, i) in this.listData"
				:key = "i"
				>
					<view
					class = "list-content-container"
					:class = "gradientContent"
					>
						<!-- 排行名次 -->
						<text class = "list-content-container-rank">{{ item.rank }}</text>
						<!-- 头像 -->
						<view class = "list-content-container-image">
							<image :src = "item.image"></image>
						</view>
						<!-- 名称 -->
						<view class = "list-content-container-name">
							<image src = "~@/static/Info-landscapeList/User.svg"></image>
							<text>{{ item.name }}</text>
						</view>
						<!-- 排行值 -->
						<view class = "list-content-container-value">
							<image src = "~@/static/Info-landscapeList/data.svg"></image>
							<text>{{ item.value }}</text>
						</view>
					</view>
				</view>
			</movable-area>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		name: 'Info-landscapeList',
		data() {
			return {
				// 列表信息模块 计数器
				listSwitch: 9,
				// 列表信息模块 计时器
				listTime: 0,
				// 列表信息模块 位置信息
				listSpace: 0,
				// 列表内容开关
				display: true
			}
		},
		props: {
			// .list-root：宽度
			rootWidth: {
				type: String,
				default: '100%'
			},
			// .list-root：高度
			rootHeight: {
				type: String,
				default: '250px'
			},
			// 列表标题
			title: {
				type: String,
				default: '标题'
			},
			// 列表标题图标地址
			imageSrc: {
				type: String,
				default: '/static/Info-landscapeList/More.svg'
			},
			// 字体样式
			font: {
				type: Boolean,
				default: true
			},
			// 标题区域渐变色
			gradientTitle: {
				type: String,
				default: 'bg-GreenJade'
			},
			// 内容区域渐变色
			gradientContent: {
				type: String,
				default: 'bg-River'
			},
			// 用户信息
			listData: {
				type: Array,
				default: function() {
					return [{
						'NickName': '用户名',
						'ContributionValue': 0,
						'Ranking': 1,
						'MyHeadPortrait': '/'
					}]
				}
			}
		},
		methods: {
			// 列表信息模块滑动
			onChange: function(e) {
				let event = e || window.event;
				// 调整计时模块
				++this.listTime;
				// 长时间触摸 时间间隔
				if (this.listTime < 20) {
					// 记录最后一次旧的 位置信息
					this.listSpace = event.changedTouches[0].clientX;
					return
				};
				this.listTime = 0;
				// 判断 左划还是右划
				let direction = event.changedTouches[0].clientX - this.listSpace;
				// 获取所有移动模块
				let moveNode = this.$refs.move;
				// 模块排序
				// 左滑动
				if (direction < 0) {
					moveNode[this.listSwitch].$el.style.right = '';
					moveNode[this.listSwitch].$el.style.left = this.listSwitch * 20 + 'px';
					// 调整模块 计数器
					++this.listSwitch;
					// 重置 计数器
					if (this.listSwitch > 9) {
						this.listSwitch = 9
					}
				};
				// 右滑动
				if (direction > 0) {
					moveNode[this.listSwitch].$el.style.left = '';
					moveNode[this.listSwitch].$el.style.right = (9 - this.listSwitch) * 20 + 'px';
					// 调整模块 计数器
					--this.listSwitch;
					// 重置 计数器
					if (this.listSwitch < 0) {
						this.listSwitch = 0
					}
				}
			},
			// 列表内容动画
			listDisplay: function() {
				// 获取列表内容节点
				let content = this.$refs.content;
				// 获取根节点
				let root = this.$refs.root;
				// 获取标题节点
				let title = this.$refs.title;
				// 隐藏列表内容节点
				if (this.display) {
					content.$el.style.display = 'none';
					// 调整开关
					this.display = !this.display;
					// 调用用户方法
					this.$emit('titleClick');
					// 调整根节点高度
					// px 数值
					this.rootHeight.endsWith('px') && (
						root.$el.style.height = Number(this.rootHeight.split('p')[0]) * 0.15 + 'px',
						title.$el.style.height = '100%'
					);
					// 调整标题高度
					this.rootHeight.endsWith('%') && (
						(title.$el.clientHeight === root.$el.parentNode.clientHeight * 0.15) && (
							root.$el.style.height = Number(this.rootHeight.split('%')[0]) * 0.15 + '%'
						)
					);
					this.rootHeight.endsWith('%') && (
						title.$el.style.height = '100%'
					)
				} else {
					content.$el.style.display = 'flex';
					// 调整开关
					this.display = !this.display;
					// 调用用户方法
					this.$emit('titleClick');
					// 调整根节点高度
					root.$el.style.height = this.rootHeight;
					// 调整标题高度
					title.$el.style.height = '15%'
				}
			},
			// 列表更多页面跳转
			listMore: function() {
				// 触发父组件页面跳转
				this.$emit('listMore', this.title, this.listData)
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 导入字体文件
	@import url('~@/static/Info-landscapeList/yrdBold.css');
	// 导入渐变色插件
	@import url('../Xiaohuixiong-Gcolor/Gcolor.min.css');
	
	// 列表外部容器
	.list {
		display: flex;
		position: relative;
		flex-direction: column;
		width: 100%;
		height: 100%;
		font-size: $uni-font-size-lg
	}
	
	// 列表标题区域
	.list-title {
		display: flex;
		position: relative;
		width: 100%;
		height: 15%;
		
		// 列表标题
		&-content {
			display: flex;
			position: relative;
			width: 50%;
			height: 100%;
			align-items: center;
			justify-content: flex-start
		}
		
		// 列表详细区入口
		&-more {
			display: flex;
			position: relative;
			width: 45%;
			height: 100%;
			align-items: center;
			justify-content: flex-end
		}
		
		// 列表标题图标
		&-icon {
			display: flex;
			position: relative;
			width: 5%;
			height: 100%;
			align-items: center;
			justify-content: flex-end;
			
			&-image {
				display: flex;
				position: relative;
				width: 100%;
				height: 50%
			}
		}
	}
	
	// 列表标题区域 立体效果
	.list-title::after {
		content: '';
		background: $uni-bg-color-border;
		position: absolute;
		top: 2px;
		bottom: 2px;
		left: -1px;
		right: -1px;
		-webkit-filter: blur(1.5px);
		filter: blur(1.5px);
		z-index: -1;
		transform: skew(0deg, 1deg)
	}
	
	// 列表内容区域
	.list-content {
		display: flex;
		position: relative;
		width: 100%;
		height: 85%;
		justify-content: center;
		align-items: center;
		
		&-move {
			display: flex;
			position: absolute;
			width: 33%;
			height: 80%;
			top: 10%
		}
		
		// 背景阴影效果
		&-container::after {
			content: '';
			display: flex;
			position: absolute;
			height: 100%;
			width: 100%;
			box-shadow: -5px 5px 5px $uni-bg-color-mask;
			z-index: -1;
			perspective: 100px
		}
		
		&-container {
			display: flex;
			position: relative;
			width: 100%;
			height: 100%;
			border: 1px solid $uni-border-color;
			flex-direction: column;
			transform: rotateY(30deg);
			perspective: 100px;
			
			// 排行名次
			&-rank {
				display: flex;
				position: relative;
				width: 20%;
				height: 15%;
				font-size: 55rpx;
				font-family: $uni-text-font-rank;
				color: $uni-text-color-rank;
				padding: 3px
			}
			
			// 头像
			&-image {
				display: flex;
				position: relative;
				width: 100%;
				height: 55%;
				justify-content: center;
				align-items: center;
				
				& image {
					display: flex;
					position: relative;
					width: 65%;
					height: 85%;
					border-radius: 100px
				}
			}
			
			// 名称
			&-name {
				display: flex;
				position: relative;
				width: 100%;
				height: 15%;
				font-size: 38rpx;
				font-family: $uni-text-font-name;
				padding: 0px 5px;
				box-sizing: border-box;
				
				& image {
					display: flex;
					position: relative;
					width: 20%;
					height: 100%;
					justify-content: center;
					align-items: center
				}
				
				& text {
					display: inline-block;
					position: relative;
					width: 80%;
					height: 100%;
					overflow: hidden;
					padding: 0px 5px;
					white-space: nowrap;
					text-overflow: ellipsis
				}
			}
			
			// 排行值
			&-value {
				display: flex;
				position: relative;
				width: 100%;
				height: 15%;
				font-size: 38rpx;
				padding: 0px 5px;
				box-sizing: border-box;
				
				& image {
					display: flex;
					position: relative;
					width: 20%;
					height: 100%;
					justify-content: center;
					align-items: center
				}
				
				& text {
					display: inline-block;
					position: relative;
					width: 80%;
					height: 100%;
					overflow: hidden;
					padding: 0px 5px;
					white-space: nowrap;
					text-overflow: ellipsis
				}
			}
		}
	}
</style>