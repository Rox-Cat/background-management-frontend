<template>
	<div class="common-layout">
		<el-container>
			<!--  -->

			<!-- 头部信息 -->
			<el-header class="header-wrapper">
				<div class="header-content">
					<h3>通用后台管理系统</h3>
					<span class="welcome">欢迎您的登陆</span>
				</div>
			</el-header>

			<!-- 中间部分 -->
			<el-main class="main-wrapper">
				<ForgetPassword ref="forgetPasswordInstance"></ForgetPassword>

				<!-- 此处将中间部分的中间部分作为了登陆区域 -->
				<div class="login-wrapper">
					<el-card class="box-card">
						<el-tabs v-model="activeName" class="demo-tabs" :stretch="true">
							<!-- 登陆Tab + 表单 -->
							<el-tab-pane label="登陆" name="first">
								<!-- 表单：账号 密码 -->
								<el-form :model="formLogin" class="login-form">
									<el-form-item label="账号">
										<el-input
											v-model="formLogin.account"
											placeholder="请输入账号名"
										/>
									</el-form-item>
									<el-form-item label="密码">
										<el-input
											v-model="formLogin.password"
											placeholder="请输入密码"
										/>
									</el-form-item>

									<!-- card底部 -->
									<div class="footer-wapper">
										<div class="forget-password">
											<span
												class="forget-password-button"
												@click="openForget"
												>忘记密码</span
											>
										</div>
										<!-- 底部登录按钮 -->
										<div class="footer-button">
											<el-button type="primary" @click="loginUser"
												>登陆</el-button
											>
										</div>

										<!-- 底部注册的按钮 -->
										<div class="footer-go-register">
											还没有账号？<span class="go-register"
												>马上注册</span
											>
										</div>
									</div>
								</el-form>
							</el-tab-pane>

							<!-- 注册Tab + 表单 -->
							<el-tab-pane label="注册" name="second">
								<!-- 注册表单 -->
								<el-form :model="formRegister" class="login-form">
									<el-form-item label="账号">
										<el-input
											v-model="formRegister.account"
											placeholder="账号长度6-12位"
										/>
									</el-form-item>
									<el-form-item label="密码">
										<el-input
											v-model="formRegister.password"
											placeholder="密码长度6-12位"
										/>
									</el-form-item>
									<el-form-item label="确认密码">
										<el-input
											v-model="formRegister.repassword"
											placeholder="请再次输入确认密码"
										/>
									</el-form-item>
									<!-- card底部 -->
									<div class="footer-wapper">
										<!-- 底部按钮 -->
										<div class="footer-button">
											<el-button
												type="primary"
												@click="registerUser"
												>注册</el-button
											>
										</div>
									</div>
								</el-form>
							</el-tab-pane>
						</el-tabs>
					</el-card>
				</div>
			</el-main>

			<!-- 底部信息 -->
			<el-footer class="footer-warpper">
				<div class="footer-content">
					<span> Copyright © 2023 通用后台管理系统 | </span>
					<span> Copyright © 2023 通用后台管理系统 | </span>
					<span> Copyright © 2023 通用后台管理系统</span>
				</div>
			</el-footer>
		</el-container>
	</div>
</template>

<script setup lang="ts">
/* 导入模块区 */
import { ref, reactive } from 'vue'
import ForgetPassword from './components/ForgetPassword.vue'
import { login, register } from '@/api/login/index.ts'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter() // 路由器

/* 登陆注册功能区 */
// 表盘选项
const activeName = ref('first')
// 我已经写了登录的类型，是不是直接导入就行？？
interface formData {
	account: string
	password: string
	repassword?: string
}
const formLogin = reactive<formData>({
	account: 'weiwentao',
	password: '12345678',
})
const formRegister = reactive<formData>({
	account: '',
	password: '',
	repassword: '',
})

// 注册逻辑
const registerUser = async () => {
	if (formRegister.password === formRegister.repassword) {
		const res = await register(formRegister)
		if (res.message === '注册成功') {
			formRegister.account = ''
			formRegister.password = ''
			formRegister.repassword = ''
			ElMessage.success('注册成功')

			// 跳转至登陆页面
			activeName.value = 'first'
		} else {
			ElMessage.error('注册失败，请检查数据格式')
		}
	} else {
		ElMessage.error('两次密码不一致')
	}
}

// 登录逻辑
const loginUser = async () => {
	const res = await login(formLogin)
	// 这种方式的处理不太好？
	if (res.message === '登录成功' ) {
		const { token } = res
		localStorage.setItem('token', token!)
		formLogin.account = ''
		formLogin.password = ''
		ElMessage.success('登录成功')

		router.push('/home')
	} else {
		ElMessage.error("登录失败，请检查账号密码是否正确")
	}
}

/* 忘记密码组件实例 */
const forgetPasswordInstance = ref()
const openForget = () => {
	forgetPasswordInstance.value.open()
}
</script>

<style lang="scss" scoped>
// 头部内容
.header-wrapper {
	/* el-header：bolck */
	.header-content {
		width: 1200px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.welcome {
			font-size: 14px;
		}
	}
}

// 主体部分
.main-wrapper {
	height: 700px;
	// background-image: url('@/assets/bg.jpg');
	background-size: cover;
	--el-main-padding: 0;

	// 登陆外壳
	.login-wrapper {
		margin: 0 auto;
		height: 600px;
		width: 1200px; // 和头部宽度保持一致

		.box-card {
			width: 350px;
			height: 375px;
			float: right;
			position: relative;
			top: 14%;

			.login-form {
				/* 表单底部外壳 */
				.footer-wapper {
					display: flex;
					flex-direction: column;

					// 忘记密码
					.forget-password {
						display: flex;
						justify-content: flex-end;
						margin-top: 10px;
						margin-bottom: 10px;

						.forget-password-button {
							font-size: 12px;
							color: #409eff;
							// 鼠标移入的效果
							cursor: pointer;
						}
					}

					// 登陆按钮
					.footer-button {
						// 登陆按钮
						width: 100%;
						display: flex;
						justify-content: center;

						.el-button {
							width: 300px;
							height: 45px;
							font-size: 16px;
						}
					}

					// 马上注册
					.footer-go-register {
						font-size: 12px;
						margin: 12px 0;
						display: flex;
						justify-content: center;

						.go-register {
							font-size: 12px;
							color: #409eff;
							// 鼠标移入的效果
							cursor: pointer;
						}
					}
				}
			}
		}
	}
}

// 底部外壳
.footer-warpper {
	margin-top: 24px;

	// 底部内容
	.footer-content {
		width: 1200px;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;

		span {
			font-size: 14px;
			font-weight: bold;
		}
	}
}

/* element-plus 组件库的统一样式修改 */
.el-form {
	margin-top: 30px;
}

.el-input {
	height: 40px;
	border-radius: 20px;
}

/* element plus 样式穿透 */

:deep(.el-tabs__item) {
	font-size: 18px;
	color: rgb(15, 102, 183);
	font-weight: bold;
}
</style>
