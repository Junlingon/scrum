import { Modal, Form, Input, Select } from 'antd';

function CreateProjectModal() {

    const [form] = Form.useForm()
    return (
        <Modal
            title={'创建项目'}
            open={false}
            okText={'创建项目'}
        // onOk={onOk}
        // onCancel={onCancel}
        >
            <Form
                name="basic"
                autoComplete="off"
                form={form}
            >
                <Form.Item
                    label="项目名称"
                    name="name"
                    rules={[{ required: true, message: '请输入项目名称' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="所在部门"
                    name="organization"
                    rules={[{ required: true, message: '请选择部门' }]}
                >
                    <Select
                    // options={orgs_options}
                    >
                    </Select>
                </Form.Item>
                <Form.Item
                    label="负责人"
                    name="owner"
                    rules={[{ required: true, message: '请选择负责人' }]}
                >
                    <Select
                    // options={users_options}
                    >
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default CreateProjectModal;