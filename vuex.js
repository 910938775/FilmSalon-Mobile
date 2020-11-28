// 引入 vue 组件
import Vue from 'vue';
// 引入 vuex 组件
import Vuex from 'vuex';
// 安装 vuex 组件
Vue.use(Vuex)


// vuex 状态管理
const store = new Vuex.Store({
	// 数据状态
    state: {
		// 用户信息
        userInfo: uni.getStorageSync('userInfo') || {},
		// 登录状态
        hasLogin: uni.getStorageSync('userInfo').hasLogin || false,
		// 影视信息
		filmInfo: {}
    },
	// 数据改变方法
    mutations: {
		// 登录
        login(state, provider) {
			// 改变登录状态
            state.hasLogin = true;
			// 保存 用户 数据
            state.userInfo = provider;
			// 封装 本地保存信息
			provider.hasLogin = true;
			// 将用户信息保存在 本地缓存
            uni.setStorage({
                key: 'userInfo',
                data: provider
            })
        },
		// 注销
        logout(state) {
			// 该变登录状态
            state.hasLogin = false;
			// 清空 用户 数据
            state.userInfo = {};
			// 清除 用户本地缓存信息
            uni.removeStorage({
                key: 'userInfo'
            })
        }
    }
})


// 模块曝光
export default store