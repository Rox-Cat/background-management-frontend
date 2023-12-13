import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
	{
		path: '/',
		redirect : '/menu' 
	},
	{
		name: 'login',
		path: '/login',
		component: () => import('@/views/login/index.vue')
	},
	{
		name: 'menu',
		path: '/menu',
		component: () => import('@/views/menu/index.vue'),
		children: [
			{
				name: 'home',
				path: '/home',  // /home 就是从根开始，如果是 'home'的话 /menu/home会显示对应的内容
				component: () => import('@/views/home/index.vue')
			}
		]
	},
]
const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

export default router