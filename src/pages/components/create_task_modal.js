import { Modal } from 'antd';
import { Form, Input, Select } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { select_task_modal_show, select_task_modal_status, set_task_modal } from '../../redux/slice/kanban';

function CreateTaskModal() {
    const dispatch = useDispatch()
    const { type } = useSelector(select_task_modal_status)

    const show = useSelector(select_task_modal_show)

    const [form] = Form.useForm();

    useEffect(() => {
        if (type === 'create' && show) {
            // 清理掉
            form.resetFields()
        }
    }, [show])

    async function onOk() {

    }

    function onCancel() {
        dispatch(set_task_modal({
            show: false,
        }))
    }

    return (
        <Modal
            title={type === 'create' ? '创建任务' : '编辑任务'}
            open={show}
            okText={type === 'create' ? '创建任务' : '修改'}
            onOk={onOk}
            onCancel={onCancel}
        >
            <Form
                name="basic"
                autoComplete="off"
                form={form}
            >
                <Form.Item
                    label="任务名称"
                    name="name"
                    rules={[{ required: true, message: '请输入任务名称' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="任务类型"
                    name="type"
                    rules={[{ required: true, message: '请选择任务类型' }]}
                >
                    <Select>
                        task_types
                    </Select>
                </Form.Item>
                <Form.Item
                    label="负责人"
                    name="owner"
                    rules={[{ required: true, message: '请选择负责人' }]}
                >
                    <Select>
                        users
                    </Select>
                </Form.Item>
                <Form.Item
                    label="epic"
                    name="epic"
                >
                    <Select className='search_wrap_select'>epic_options</Select>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default CreateTaskModal;