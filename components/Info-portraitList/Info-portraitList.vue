<template>
	<view class = "list-root">
		
		<!-- 竖向信息列表 -->
		<view class = "list-container" v-for = "(item, i) in this.listData" :key = "i">
			<!-- 名次 -->
			<view class = "list-rank">{{ item.rank }}</view>
			
			<view class = "list-content">
				<!-- 图片 -->
				<view class = "list-content-image">
					<image :src = "item.image"></image>
				</view>
				
				<view class = "list-content-more">
					<!-- 标题 -->
					<view class = "list-content-more-title">
						<text>{{ item.name }}</text>
					</view>
					
					<view class = "list-content-more-bottom">
						<!-- 排行值 -->
						<text class = "list-content-more-bottom-value">{{ item.value }}</text>
						
						<!-- 标签 -->
						<view
						class = "list-content-more-bottom-tag"
						@touchmove = "tagSlide(i, $event)"
						:ref = "'tag' + i"
						>
							<a
							herf = "javascript:;"
							v-for = "(result, j) in item.tag"
							:key = "'tag' + j"
							>{{ result }}</a>
						</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		name: 'Info-portraitList',
		data() {
			return {
				// 标签滑动 计时器
				tagTime: 0,
				// 标签滑动 距离
				tagSpace: 0,
				// 标签滑动 定时器
				tagInterval: ''
			}
		},
		props: {
			// 用户数据
			listData: {
				type: Array,
				default: function() {
					return [{
						'rank': 0,
						'image': '/',
						'name': '标题',
						'value': 0,
						'tag': ['标签']
					}]
				}
			},
			// 标签滑动回弹距离
			tagBounce: {
				type: Number,
				default: 15
			},
			// 标签滑动回弹时间
			bounceTime: {
				type: Number,
				default: 2000
			},
			// 标签滑动速度
			tagSpeed: {
				type: Number,
				default: 10
			}
		},
		methods: {
			// 标签滑动事件
			tagSlide: function(i, e) {
				let event = e || window.event;
				// 调整计时模块
				++this.tagTime;
				// 长时间触摸 时间间隔
				if (this.tagTime < 20) {
					// 记录最后一次旧的 位置信息
					this.tagSpace = event.changedTouches[0].clientX;
					return
				};
				this.tagTime = 0;
				// 判断 左划还是右划
				let direction = event.changedTouches[0].clientX - this.tagSpace;
				
				// 获取标签父节点
				let tag = this.$refs['tag' + i];
				let tagNode = tag[0].$el;
				let parent = tagNode.clientWidth;
				// 获取最后一个标签
				let last = tagNode.children[tagNode.children.length - 1];
				// 获取第一个标签
				let first = tagNode.children[0];
				let firstNum = Number(first.style.marginLeft.split('p')[0]);
				// 左滑动距离限制：小于 tagBounce 设定
				// 最后一个标签距离父元素 右边距离
				let left = parent - last.offsetLeft - last.offsetWidth;
				// 右滑动距离限制：小于 tagBounce 设定
				// 第一个标签距离父元素 左边距离
				let right = first.offsetLeft;
				
				// 添加移动效果
				// 右滑动
				if (direction > 0 && right <= this.tagBounce) {
					tagNode.children[0].style.marginLeft = firstNum + this.tagSpeed + 'px'
				};
				// 左滑动
				if (direction < 0 && left <= this.tagBounce) {
					tagNode.children[0].style.marginLeft = firstNum - this.tagSpeed + 'px'
				};
				
				// 回弹动画
				// 右滑动
				if (right > 0) {
					// 清除定时器
					clearTimeout(this.tagInterval);
					// 设置定时器
					this.tagInterval = setTimeout(function() {
						tagNode.children[0].style.marginLeft = '0px';
						tagNode.children[0].style.transition = 'all 0.5s ease'
					}, this.bounceTime)
				};
				// 左滑动
				if (left > 0) {
					// 右边距离 = 0 时，左边距离
					let right_0 = 5;
					for (let i = 0; i < tagNode.children.length; i++) {
						right_0 += tagNode.children[i].clientWidth
					};
					right_0 -= parent;
					// 清除定时器
					clearTimeout(this.tagInterval);
					// 设置定时器
					this.tagInterval = setTimeout(function() {
						tagNode.children[0].style.marginLeft = -right_0 + 'px';
						tagNode.children[0].style.transition = 'all 0.5s ease'
					}, this.bounceTime)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 根节点
	.list-root {
		display: flex;
		position: relative;
		flex-direction: column;
		width: 100%;
		box-sizing: border-box;
		white-space: nowrap;
		text-overflow: ellipsis
	}
	
	// 竖向信息列表
	.list-container {
		display: flex;
		position: relative;
		width: 100%;
		height: $uni-list-height;
		margin-bottom: 10px
	}
	
	// 名次
	.list-rank {
		display: flex;
		position: relative;
		width: 15%;
		height: 100%;
		justify-content: center;
		align-items: center;
		font-size: $uni-list-rank-fontSize;
		font-family: $uni-list-rank-font;
		color: $uni-list-rank-color
	}
	
	.list-content {
		display: flex;
		position: relative;
		width: 85%;
		height: 100%;
		border-bottom: 1px solid $uni-border-color;
		
		// 图片
		&-image {
			display: flex;
			position: relative;
			width: 40%;
			height: 100%;
			
			& image {
				display: flex;
				width: 100%;
				height: 100%;
				padding: 3px 5px 3px 0px;
				box-sizing: border-box
			}
		}
		
		&-more {
			display: flex;
			position: relative;
			width: 60%;
			height: 100%;
			flex-direction: column;
			
			// 标题
			&-title {
				display: flex;
				position: relative;
				width: 100%;
				height: 50%;
				align-items: center;
				font-size: $uni-list-title-fontSize;
				font-weight: bold;
				
				// 底部边界线
				&::after {
					content: '';
					display: flex;
					position: absolute;
					width: 80%;
					bottom: 0px;
					left: 10%;
					border-bottom: 1px solid #F5F5F5
				}
			}
			
			&-bottom {
				display: flex;
				position: relative;
				width: 100%;
				height: 50%;
				font-size: $uni-list-bottom-fontSize;
				color: $uni-text-color-grey;
				
				// 排行值
				&-value {
					display: flex;
					position: relative;
					width: 40%;
					height: 100%;
					align-items: center;
					font-weight: bold;
					color: $uni-list-value-color
				}
				
				// 标签
				&-tag {
					display: flex;
					position: relative;
					width: 60%;
					height: 100%;
					margin: 0px 5px 0px 0px;
					box-sizing: border-box;
					overflow: hidden;
					
					& a {
						display: flex;
						position: relative;
						height: 100%;
						padding: 0px 3px 0px 0px;
						align-items: center
					}
				}
			}
		}
	}
</style>