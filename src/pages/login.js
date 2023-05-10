import React from 'react'
import { Form, Input, Button, Divider, notification } from 'antd'
import LoginWrap from './components/login_wrap'
import { Link, useNavigate } from "react-router-dom"
import axios from '../util/http'
import cloudbase from "@cloudbase/js-sdk";
import { getUsersAsync, getTaskTypesAsync, getOrgsAsync } from '../redux/slice/project';
import { useDispatch } from 'react-redux';

const app = cloudbase.init({
    env: "scrum-nodejs-9gh5bh6zf5e922f1"
});

function Login() {
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const navigate = useNavigate()

    async function login_click() {
        const form_data = await form.validateFields()
        const { password, email } = form_data
        app.auth()
            .signInWithEmailAndPassword(email, password)
            .then((loginState) => {
                // 登录成功
                return axios.post('/api/login', form_data)
            })
            .then((res) => {
                if (res.data.code === 0) {
                    navigate('/project')
                    // 获取下拉框动态数据
                    dispatch(getUsersAsync())
                    dispatch(getTaskTypesAsync())
                    dispatch(getOrgsAsync())
                }
            })
            .catch((err) => {
                notification.error({ message: err.message })
            });

    }

    return (
        <LoginWrap>
            <Form form={form}>
                登录界面
                <Form.Item name="email" rules={[{ required: true, message: '请输入邮箱' }]}>
                    <Input type="text" id="email" placeholder={'邮箱'} />
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