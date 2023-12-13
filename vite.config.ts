import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path  from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	// 设置别名
	resolve: {
		alias: {
			"@": path.resolve("./src"),
		}
	},
	css: {
		preprocessorOptions: {
			scss: {
				javascriptEnabled: true,
				// additionalData: "@import '@/style/commons.less';",
			},
		},
	},
	server: {
		// 下面的其实不用配置
		port: 5173,
		open: true,
		cors: true,  // 允许浏览器向不同源的服务器发送请求，其实本来就是默认开启的
	},
})
