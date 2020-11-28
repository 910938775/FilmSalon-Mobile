<template>
	<view
	class = "filter-root"
	:style = "{ width: filterWidth, height: filterHeight }"
	>
		
		<!-- 基本筛选类型 -->
		<view class = "basic">
			<!-- 类别 -->
			<view
			class = "basic-type"
			:class = "{ 'choose': i === 0 ? true : false }"
			v-for = "(item, i) in this.basicType"
			:key = "'basic' + i"
			@tap = "chooseType($event, item)"
			>{{ item }}</view>
		</view>
		
		
		<!-- 详细筛选类型 -->
		<view class = "detail" v-for = "(result, j) in this.detailType" :key = "'detail' + j">
			<!-- 类别名 -->
			<view class = "detail-name">{{ result.type }}</view>
			
			<!-- 筛选内容 -->
			<view class = "detail-content" @touchmove = "slide">
				<!-- 筛选子项 -->
				<view
				class = "detail-content-child"
				:class = "{ 'choose': k === 0 ? true : false }"
				v-for = "(data, k) in result.content"
				:key = "'child' + k"
				@tap = "chooseType(result.type, data)"
				>{{ data }}</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		name: 'film-filter',
		data() {
			return {
				// 筛选项滑动 计时器
				slideNumber: 10,
				// 筛选项滑动 位置记录
				slideSpace: 0,
				// 筛选项滑动 定时器
				slideTime: '',
				// 筛选项滑动 定时器时间
				slideLong: 1500,
				// 筛选器 选中的关键字：默认 为空
				keyWord: {
					CountryArea: '',
					Type: '',
					Time: '',
					Other: ''
				}
			}
		},
		props: {
			// 筛选器宽度
			filterWidth: {
				type: String,
				default: '100%'
			},
			// 筛选器高度
			filterHeight: {
				type: String,
				default: '200px'
			},
			// 基本筛选类别
			basicType: {
				type: Array,
				default: function() {
					return ['默认', '其他1', '其他2', '其他3']
				}
			},
			// 详细筛选类别
			detailType: {
				type: Array,
				default: function() {
					return [
						{type: '国家地区', content: ['全部', '国家1', '国家2', '国家3', '国家4', '国家5']},
						{type: '类型', content: ['全部', '类型1', '类型2', '类型3', '类型4', '类型5']},
						{type: '年代', content: ['全部', '年代1', '年代2', '年代3', '年代4', '年代5']}
					]
				}
			},
			// 筛选器滑动到最大距离后 可滑动距离
			slideMax: {
				type: Number,
				default: 20
			},
			// 筛选器滑动速度
			slideSpeed: {
				type: Number,
				default: 20
			}
		},
		methods: {
			// 自动添加选中样式
			chooseType: function(type, data) {
				// 获取节点
				let node = window.event.currentTarget || event.currentTarget;
				// 当前点击对象 是否已选中
				if (!node.classList.contains('choose')) {
					// 获取当前节点所有的 兄弟节点
					let brother = node.parentNode.children;
					// 删除选择样式
					for (let i = 0; i < brother.length; i++) {
						// 获取样式
						let className = brother[i].classList;
						// 删除样式
						if (className.contains('choose')) {
							className.remove('choose');
							break
						}
					};
					// 添加样式
					node.classList.add('choose');
					// 保存关键字
					switch (type) {
						case '国家地区':
							this.keyWord.CountryArea = data;
							(data === '全部') && (
								this.keyWord.CountryArea = ''
							);
							break;
						case '类型':
							this.keyWord.Type = data;
							(data === '全部') && (
								this.keyWord.Type = ''
							);
							break;
						case '年代':
							this.keyWord.Time = data;
							(data === '全部') && (
								this.keyWord.Time = ''
							);
							break;
						default:
							this.keyWord.Other = data;
							(data === '默认') && (
								this.keyWord.Other = ''
							);
							break
					};
					// 触发搜索函数
					this.$emit('Filter', this.keyWord)
				}
			},
			// 筛选项滑动动画
			slide: function(e) {
				// 获取事件对象
				let event = window.event || event;
				// 获取当前触发节点
				let node = event.currentTarget;
				// 调整计时器
				--this.slideNumber;
				// 存在时间间隔
				if (this.slideNumber) {
					// 保存当前位置信息
					this.slideSpace = event.changedTouches[0].clientX;
					return
				};
				
				// 还原间隔时间
				this.slideNumber = 20;
				// 判断滑动方向
				let direction = event.changedTouches[0].clientX - this.slideSpace;
				
				// 获取该节点 第一个子节点
				let first = node.firstChild;
				// 获取该节点 最后一个子节点
				let last = node.lastChild;
				// 获取第一个节点 右滑动距离
				let firstMax = first.offsetLeft;
				// 获取第一个节点 marginLeft
				let firstMargin = parseInt(first.style.marginLeft) || 0;
				// 获取最后一个节点 左滑动距离
				let lastMax = node.clientWidth - (last.offsetLeft + last.clientWidth);
				
				// 添加移动效果
				// 右滑动
				if (direction > 0 && firstMax <= this.slideMax) {
					first.style.marginLeft = firstMargin + this.slideSpeed + 'px'
				};
				// 左滑动
				if (direction < 0 && lastMax <= this.slideMax) {
					first.style.marginLeft = firstMargin - this.slideSpeed + 'px'
				};
				
				// 回弹动画
				// 右滑动
				if (firstMax > 0) {
					// 清除定时器
					clearTimeout(this.slideTime);
					// 设置定时器
					this.slideTime = setTimeout(function() {
						first.style.marginLeft = '0px';
						first.style.transition = 'all 0.5s ease'
					}, this.slideLong)
				};
				// 左滑动
				if (lastMax > 0) {
					// 记录溢出宽度
					let slideOver = null;
					for (let i = 0; i < node.children.length; i++) {
						slideOver += node.children[i].clientWidth
					};
					slideOver -= node.clientWidth;
					
					// 清除定时器
					clearTimeout(this.slideTime);
					// 设置定时器
					this.slideTime = setTimeout(function() {
						// 筛选项没有溢出
						if (slideOver <= 0) {
							first.style.marginLeft = '0px'
						} else {
							first.style.marginLeft = -slideOver + 'px'
						};
						first.style.transition = 'all 0.5s ease'
					}, this.slideLong)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 根节点
	.filter-root {
		display: flex;
		position: relative;
		flex-direction: column;
		padding: 5px;
		box-sizing: border-box;
		font-size: $uni-filter-font-basic
	}
	
	// 基本筛选类型
	.basic {
		display: flex;
		position: relative;
		width: 100%;
		align-items: center;
		
		// 类别
		&-type {
			display: flex;
			position: relative;
			height: 80%;
			padding: 10px 20px;
			box-sizing: border-box;
			align-items: center
		}
	}
	
	// 详细筛选类型
	.detail {
		display: flex;
		position: relative;
		width: 100%;
		
		// 类别名
		&-name {
			display: flex;
			position: relative;
			width: 25%;
			padding: 10px 0px;
			box-sizing: border-box;
			font-weight: bold;
			color: $uni-text-color-grey;
			justify-content: center
		}
		
		// 筛选内容
		&-content {
			display: flex;
			position: relative;
			width: 75%;
			box-sizing: border-box;
			overflow: hidden;
			white-space: nowrap;
			align-items: center;
			
			// 筛选子项
			&-child {
				display: flex;
				position: relative;
				height: 80%;
				padding: 0px 15px;
				box-sizing: border-box;
				align-items: center
			}
		}
	}
	
	// 选中样式
	.choose {
		display: flex;
		position: relative;
		background-color: rgba($color: #D2691E, $alpha: 0.8);
		color: #FFF8DC;
		border-radius: 10px;
		font-weight: bold
	}
</style>