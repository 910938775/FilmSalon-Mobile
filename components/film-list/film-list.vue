<template>
	<view
	class = "list-root"
	:style = "{ width: listWidth, height: listHeight }"
	ref = "root"
	>
		
		<!-- 列表外部容器 -->
		<view class = "list" v-for = "(item, i) in this.listData" :key = "'list' + i">
			
			<!-- 列表上部 -->
			<view class = "list-top">
				<!-- 背景图片 -->
				<image :src = "item.image" class = "list-top-image" @tap = "listContent(item)"></image>
				
				<!-- 特殊标志 -->
				<view class = "list-top-symbol">{{ item.symbol }}</view>
				
				<!-- 日期 -->
				<view class = "list-top-date">{{ item.date }}</view>
			</view>
			
			
			<!-- 列表下部 -->
			<view class = "list-bottom">
				<!-- 信息列表项 -->
				<view class = "list-bottom-item" v-for = "(result, j) in item.list" :key = "'item' + j">
					{{ result }}
				</view>
			</view>
			
		</view>
		
		
		<!-- 补空白 -->
		<view class = "white" ref = "white"></view>
		
	</view>
</template>

<script>
	export default {
		// 组件名称
		name: 'film-list',
		// 数据接口
		data() {
			return {
				// 元素的宽度：%
				whiteWidth: 30,
				// 元素的高度：px
				whiteHeight: 180,
				// 元素的外边距：px
				whiteMargin: 5,
				// 单行元素个数
				whiteRow: 3
			}
		},
		// 父子传值
		props: {
			// 列表的宽度
			listWidth: {
				type: String,
				default: '100%'
			},
			// 列表的高度
			listHeight: {
				type: String,
				default: 'max-content'
			},
			// 列表数据
			listData: {
				type: Array,
				default: function() {
					return [
						{
							image: '/',
							symbol: 'Top1',
							date: '2020-1-1',
							list: [ '名称', '其他' ]
						}
					]
				}
			}
		},
		// 页面渲染完成
		mounted() {
			// 补齐空白
			this.whiteSpace()
		},
		// 页面更新
		updated() {
			// 补齐空白
			this.whiteSpace()
		},
		// 方法接口
		methods: {
			// 列表中间对齐补空白
			whiteSpace: function() {
				// 获取根节点
				let rootNode = this.$refs.root.$el;
				// 获取列表个数
				let count = rootNode.children.length - 1;
				// 获取空白个数
				let white = (count % this.whiteRow === 0) ? 0 : (this.whiteRow - count % this.whiteRow);
				
				// 计算空白宽度
				let width = this.whiteWidth * white;
				// 计算空白外边距
				let margin = this.whiteMargin * white;
				// 获取空白节点
				let node = this.$refs.white.$el;
				// 设置空白节点样式
				node.style.display = 'flex';
				node.style.width = width + '%';
				node.style.margin = margin + 'px'
			},
			// 图片点击加载内容
			listContent: function(data) {
				// 触发父组件 加载内容函数
				this.$emit('moreContent', data)
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 根路径
	.list-root {
		display: flex;
		position: relative;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center
	}
	
	// 列表容器
	.list {
		display: flex;
		position: relative;
		flex-direction: column;
		width: 30%;
		margin: 5px;
		box-sizing: border-box;
		
		// 列表上部
		&-top {
			display: flex;
			position: relative;
			width: 100%;
			height: 180px;
			color: $uni-film-symbol-color;
			
			// 添加阴影效果
			&::after {
				content: '';
				display: flex;
				position: absolute;
				background-color: $uni-film-BC;
				top: -1px;
				bottom: -1px;
				left: -1px;
				right: -1px;
				z-index: -1;
				border-radius: 5px;
				filter: blur(2px)
			}
			
			// 图片
			&-image {
				display: flex;
				position: relative;
				width: 100%;
				height: 100%;
				border-radius: 5px
			}
			
			// 特殊标志
			&-symbol {
				display: flex;
				position: absolute;
				width: max-content;
				height: 12%;
				background-color: $uni-film-symbol-BC;
				top: 0px;
				right: 0px;
				border-top-right-radius: 5px;
				border-bottom-left-radius: 5px;
				font-size: $uni-font-size-sm;
				font-weight: bold;
				font-family: $uni-film-symbol-font;
				align-items: center;
				justify-content: center
			}
			
			// 日期
			&-date {
				display: flex;
				position: absolute;
				width: 100%;
				height: 15%;
				bottom: 0px;
				padding: 0px 5px;
				font-size: $uni-font-size-base;
				align-items: center;
				box-sizing: border-box
			}
		}
		
		// 列表下部
		&-bottom {
			display: flex;
			position: relative;
			flex-direction: column;
			width: 100%;
			font-size: $uni-font-size-lg;
			
			// 信息列表项
			&-item {
				display: inline-block;
				position: relative;
				width: 100%;
				box-sizing: border-box;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				padding: 0px 5px 5px;
				color: $uni-text-color-grey
			}
			
			// 信息列表项：第一个
			&-item:nth-child(1) {
				padding: 5px;
				color: #000000;
				font-weight: bold
			}
		}
	}
	
	// 补空白
	.white {
		display: none;
		position: relative;
		height: 180px
	}
	
</style>