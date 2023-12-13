//定义用户相关数据的ts类型

// 用户登录接口携带参数的ts类型
export interface LoginFormData {
	account: string
	password: string
}

export interface ResponseData {
	status: number
	message: string
}
// 定义全部接口返回数据都拥有ts类型
export interface LoginResponseData extends ResponseData {
	token?: string
	userInfo?: UserInfo
}

// 定义用户信息类型
export interface UserInfo {
	account: string
	createTime: string
	department: string
	email: string
	id: number
	identity: string
	imageUrl: string
	name: string
	password: string
	sex: string
	status: string
	updateTime: string
}

// 应以注册接口的返回类型
export interface RegisterResponse extends ResponseData {}
