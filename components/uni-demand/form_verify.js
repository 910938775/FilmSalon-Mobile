// 昵称验证
exports.NickName = function(nickName) {
	// 去除空格
	nickName = nickName.trim();
	// 验证字符串长度：1-15 个字符串长度
	if (nickName.length >= 1 && nickName.length <= 15) {
		return {
			type: true,
			message: '昵称输入正确'
		}
	};
	// 验证不合格
	return {
		type: false,
		message: '昵称必须 1-15 个字符串组成'
	}
}


// 账户名验证
exports.Account = function(account) {
	// 去除空格
	account = account.trim();
	// 设置正则表达式：数字 字母 下划线 组成的 6-15 位字符，且不能以 数字 开头
	let RegExp = /^[a-zA-Z_]\w{5,14}$/;
	// 验证数据
	if (RegExp.test(account)) {
		return {
			type: true,
			message: '账户名输入正确'
		}
	};
	// 验证不合格
	return {
		type: false,
		message: '数字、字母、下划线,组成的 6-15 位字符,且不能以 数字 开头'
	}
}


// 密码验证
exports.Password = function(password) {
	// 去除空格
	password = password.trim();
	// 验证字符串长度：6-15 位字符组成
	if (password.length >= 6 && password.length <= 15) {
		return {
			type: true,
			message: '密码输入正确'
		}
	};
	// 验证不合格
	return {
		type: false,
		message: '密码必须 6-15 个字符串组成'
	}
}


// 手机号验证
exports.Phone = function(phone) {
	// 去除空格
	phone = phone.trim();
	// 设置正则表达式
	// 电信号段：133、149、153、173、177、180、181、189、199
	let telecom = /^(133|149|153|173|177|180|181|189|190)[0-9]{8}$/;
	// 联通号段：130、131、132、145、155、156、166、171、175、176、185、186、166
	let Unicorn = /^(130|131|132|145|155|156|166|171|175|176|185|186|166)[0-9]{8}$/;
	// 移动号段：134(0-8、135、136、137、138、139、147、150、151、152、157、158、159、172、178、182、183、184、187、188、198
	let mobile = /^(134|135|136|137|138|139|147|150|151|152|157|158|159|172|178|182|183|184|187|188|198)[0-9]{8}$/;
	// 验证手机号码
	if (telecom.test(phone) || Unicorn.test(phone) || mobile.test(phone)) {
		return {
			type: true,
			message: '手机号输入正确'
		}
	};
	// 验证不合格
	return {
		type: false,
		message: '手机号格式不正确'
	}
}


// 验证码验证
exports.VerifyNumber = function(number) {
	// 去除空格
	number = number.trim();
	// 检测验证码长度：5 位数字构成
	if (number.length === 5) {
		return {
			type: true,
			message: '验证码待检测'
		}
	};
	// 检测不合格
	return {
		type: false,
		message: '验证码必须是 5 位数字构成'
	}
}