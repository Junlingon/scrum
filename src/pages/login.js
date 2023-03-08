import React from 'react'
import { Form, Input, Button, Divider } from 'antd'
import LoginWrap from './components/login_wrap'
import { Link } from "react-router-dom"
function Login() {
    return (
        <LoginWrap>
            <Form >
                登录界面
                <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
                    <Input type="text" id="username" placeholder={'用户名'} />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
                    < Input type="password" id="password" placeholder={'密码'} />
                </Form.Item>
                <Button className='login_button' type="primary">登录</Button>
                <Divider />
                <Link to="/register">注册新账号</Link>
            </Form>
        </LoginWrap>
    )
}
export default Login