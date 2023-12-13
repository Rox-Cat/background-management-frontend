import instance from '@/utils/request.ts'
import type { LoginResponseData, LoginFormData, RegisterResponse } from './type'
/* 接口 */

export const register = (data: LoginFormData) => {
	const { account, password } = data
	return instance<unknown, RegisterResponse>({
		url: '/api/register',
		method: 'POST',
		data: { account, password },
	})
}

export const login = (data: LoginFormData) => {
	const { account, password } = data
	return instance<unknown, LoginResponseData>({
		url: '/api/login',
		method: 'POST',
		data: { account, password },
	})
}
