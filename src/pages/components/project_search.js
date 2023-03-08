import { Input, Form, Button } from 'antd'

function ProjectSearch() {

    const [form] = Form.useForm();

    return (
        <Form layout="inline" form={form} >
            <Form.Item
                name="name"
                style={{ width: 180 }}
            >
                <Input placeholder={'任务名'} />
            </Form.Item>
            <Form.Item
                label="部门"
                name="organization"

                style={{ width: 180 }}
            >
                {/* <Select
                    options={['研发部门']}
                >
                </Select> */}
            </Form.Item>
            <Form.Item
                label="负责人"
                name="owner"
                style={{ width: 180 }}
            >
                {/* <Select
                    options={['李明明']}
                >
                </Select> */}
            </Form.Item>
            <Button type="">重置</Button>
            <Button type="primary">查询</Button>
        </Form>
    )
}

export default ProjectSearch