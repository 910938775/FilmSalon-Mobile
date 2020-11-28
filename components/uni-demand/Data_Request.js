// 声明 域名根路径
let root = 'http://localhost:3000'


// 发起数据请求
let DataHandle = function(req) {
	// 发起数据请求
	return new Promise(function(resolve, reject) {
		// 处理参数
		let datas = {
			// 请求路径
			url: root + req.url,
			// 请求数据
			data: req.data || '',
			// 数据请求方式
			method: req.method || 'get',
			// 返回数据类型
			dataType: req.dataType || 'json',
			// 请求头设置
			header: {
				'content-type': 'application/json'
			},
			// 数据 请求成功
			success: (result) => {
				resolve(result.data)
			},
			// 数据 请求失败
			fail: (error) => {
				reject(error)
			}
		};
		// 数据请求
		uni.request(datas)
	})
}


// 模型曝光
module.exports = DataHandle