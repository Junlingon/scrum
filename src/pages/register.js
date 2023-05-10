import React from 'react';
import { Form, Input, Button, Divider, Modal, notification } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import LoginWrap from './components/login_wrap';
import { Link, useNavigate } from "react-router-dom";
import axios from '../util/http';
import cloudbase from "@cloudbase/js-sdk";

const app = cloudbase.init({
    env: "scrum-nodejs-9gh5bh6zf5e922f1"
});

function Register() {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { confirm } = Modal;

    async function register_click() {
        const form_data = await form.validateFields()
        const { password, email } = form_data
        const showConfirm = () => {
            confirm({
                title: '请在你的邮箱中点击链接确定注册！',
                icon: <ExclamationCircleFilled />,
                content: '否则注册失败',
                okText: '链接已确认',
                cancelText: '取消',
                onOk() {
                    console.log('链接已确认');
                    if (form_data) {
                        console.log(form_data);
                        axios.post('/api/register', form_data).then(() => {
                            navigate('/login');
                        })
                    }
                },
                onCancel() { },
            });
        };

        app.auth()
            .signUpWithEmailAndPassword(email, password)
            .then(() => {
                console.log('已发送短信验证码')
                showConfirm()
            })
            .catch((e) => {
                console.log(e.message)
                notification.error({
                    message: e.message,
                });
            });
    }

    return (
        <LoginWrap>
            <Form form={form}>
                <div className='login_box_header'>
                    <button className='switch'>请注册</button>
                </div>
                <p className='login_box_p'>账号注册</p>
                <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
                    <Input type="text" id="username" placeholder={'真实姓名'} />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
                    < Input type="password" id="password" placeholder={'密码'} />
                </Form.Item>
                <Form.Item name="email" rules={[{ required: true, message: '请输入邮箱' }]}>
                    < Input type="email" id="email" placeholder={'邮箱'} />
                </Form.Item>
                <Button className='login_button' type="primary" onClick={register_click}>注册</Button>
                <Divider />
                <Link className='login_enroll' to="/login">已有账号？直接登录</Link>
            </Form>
        </LoginWrap>
    )
}

export default Register