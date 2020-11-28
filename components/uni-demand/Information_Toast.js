// 图标地址
let successIcon = '/static/Images/index/Error.svg';
let loadingIcon = '/static/Images/index/Loading.svg'


// 处理一般提示信息
let InfoToast = function(info) {
	// 处理参数
	let infos = {
		// 提示框 标题
		title: info.title,
		// 提示框 图标类型：success loading
		icon: info.icon || 'success',
		// 提示框 图标地址
		image: (!info.icon || info.icon === 'success') ? successIcon : loadingIcon,
		// 提示框 显示时间：us
		duration: info.duration || 1500,
		// 纯文本轻提示框位置：填写后只有 title 属性生效
		position: info.position || ''
	};
	// 发送提示信息
	uni.showToast(infos)
}


// 模块曝光
module.exports = InfoToast