import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'

import './style/index.scss'

/* ElementPlus 配置 */
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 导入全局路由: element plus icon图标
import gloalComponents from './components/globalComponents.ts'
// ElementPlus 国际化
// @ts-expect-error: 国际化没有对应的类型？
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const app = createApp(App)
app.use(router)
app.use(ElementPlus, {
	locale: zhCn,
})
app.use(gloalComponents)
app.mount('#app')
