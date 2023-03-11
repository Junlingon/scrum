import React from 'react'
import { Form, Input, Button, Divider } from 'antd'
import LoginWrap from './components/login_wrap'
import { Link, useNavigate } from "react-router-dom"
import axios from '../util/http'

function Login() {

    const [form] = Form.useForm();
    const navigate = useNavigate()

    async function login_click() {
        const form_data = await form.validateFields()

        if (form_data) {
            console.log(form_data)
            const res = await axios.post('/api/login', form_data)

            // 登录成功
            if (res.data.code === 0) {
                navigate('/project')
            }
        }
    }

    return (
        <LoginWrap>
            <Form form={form}>
                登录界面
                <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
                    <Input type="text" id="username" placeholder={'用户名'} />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
                    < Input type="password" id="password" placeholder={'密码'} />
                </Form.Item>
                <Button className='login_button' type="primary" onClick={login_click}>登录</Button>
                <Divider />
                <Link to="/register">注册新账号</Link>
            </Form>
        </LoginWrap>
    )
}
export default Login