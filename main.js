// 引入 vue 组件
import Vue from 'vue';
// 引入 uni-app 主组件
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

// 导入 头部导航栏组件
import hxNavbar from './components/hx-navbar/hx-navbar.vue';
// 全局挂载 组件
Vue.component('hx-navbar', hxNavbar)

// 导入 横向列表信息组件
import landscapeList from './components/Info-landscapeList/Info-landscapeList.vue';
// 全局挂载 组件
Vue.component('Info-landscapeList', landscapeList)

// 导入 竖向列表信息组件
import portraitList from './components/Info-portraitList/Info-portraitList.vue';
// 全局挂载 组件
Vue.component('Info-portraitList', portraitList)

// 导入 搜索页组件
import zysearch from './components/zy-search/zy-search.vue';
// 全局挂载 组件
Vue.component('zy-search', zysearch)

// 导入 影视筛选组件
import filter from './components/film-filter/film-filter.vue';
// 全局挂载 组件
Vue.component('film-filter', filter)

// 导入 影视筛选组件
import filmList from './components/film-list/film-list.vue';
// 全局挂载 组件
Vue.component('film-list', filmList)

// 导入 分页组件
import Pagination from './components/uni-pagination/uni-pagination.vue';
// 全局挂载 组件
Vue.component('uniPagination', Pagination)

// 导入 下拉选择组件
import uniCombox from "./components/uni-combox/uni-combox.vue";
// 全局挂载 组件
Vue.component('uniCombox', uniCombox)

// 导入 评分组件
import uniRate from "./components/uni-rate/uni-rate.vue";
// 全局挂载 组件
Vue.component('uniRate', uniRate)

// 导入 圆环统计图组件
import ArcbarChart from "./components/stan-ucharts/ArcbarChart.vue";
// 全局挂载 组件
Vue.component('ArcbarChart', ArcbarChart)

// 导入 相关信息组件
import relateList from "./components/relate-list/relate-list.vue";
// 全局挂载 组件
Vue.component('relate-list', relateList)

// 导入 数据请求模块
import DataHandle from './components/uni-demand/Data_Request.js';
// 注册 全局方法
Vue.prototype.$DataHandle = DataHandle

// 导入 信息提示模块
import InfoToast from './components/uni-demand/Information_Toast.js';
// 注册 全局方法
Vue.prototype.$InfoToast = InfoToast

// 导入 页面跳转模块
import pageSkip from './components/uni-demand/page_skip.js';
// 注册 全局方法
Vue.prototype.$pageSkip = pageSkip

// 导入 表单验证模块
import verify from './components/uni-demand/form_verify.js';
// 注册 全局方法
Vue.prototype.$verify = verify

// 导入 vuex 状态管理模块
import store from './vuex.js';
// 注册 全局方法
Vue.prototype.$store = store

// 生成 vue 实例对象
const app = new Vue({
	store,
    ...App
});
// 挂载实例
app.$mount()