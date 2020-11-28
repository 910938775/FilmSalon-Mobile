// 页面跳转
// @param [data]: 跳转数据
// @param [way]: 跳转方式 [前跳]
let pageSkip = function(data, way) {
	// 跳转数据解析
	let result = {
		// 跳转页面
		url: data.url,
		// navigateBack 后退 页面栈数：默认 1
		delta: data.delta || 1,
		// 动画方式：默认 pop-in pop-out
		animationType: data.animationType || (way === 'back' ? 'pop-out' : 'pop-in'),
		// 动画时间：默认 200 us
		animationDuration: data.animationDuration || 200,
		// 成功回调
		success: data.success,
		// 失败回调
		fail: function(error) {
			Vue.$InfoToast({
				// 错误提示
				title: data.message || '系统错误'
			})
		}
	};
	// 跳转方式解析
	way = way || 'go';
	// 页面跳转
	switch (way) {
		// 后退
		case 'back':
			if(getCurrentPages().length >= 1){
				uni.navigateBack(result)
			}else{
				// #ifdef H5
				history.back()
				// #endif
			};
			break;
		// 直达 tabBar
		case 'tabBar':
			uni.switchTab(result);
			break;
		// 前跳
		default:
			uni.navigateTo(result);
			break
	}
}


// 模块曝光
module.exports = pageSkip