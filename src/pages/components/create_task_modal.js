import { Modal } from 'antd';
import { Form, Input, Select } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add_task, update_kanban_async } from '../../redux/slice/drop';
import { select_task_modal_show, select_task_modal_status, set_task_modal } from '../../redux/slice/kanban';
import { select_task_types, select_users } from '../../redux/slice/project';

function CreateTaskModal() {
    const dispatch = useDispatch()
    const { type, kanban_key } = useSelector(select_task_modal_status)

    const show = useSelector(select_task_modal_show)
    const users = useSelector(select_users)
    const task_types = useSelector(select_task_types);
    const [form] = Form.useForm();

    useEffect(() => {
        if (type === 'create' && show) {
            // 清理掉
            form.resetFields()
        }
    }, [show])

    async function onOk() {
        const form_data = await form.validateFields()
        if (form_data) {
            // 创建
            if (type === 'create') {
                form_data.task_id = Math.random().toString(32).substring(2)
                dispatch(add_task({
                    kanban_key,
                    task: form_data
                }))
                // 更新kanban
                dispatch(update_kanban_async())
            }

            dispatch(set_task_modal({
                show: false
            }))
        }
    }

    function onCancel() {
        dispatch(set_task_modal({
            show: false,
        }))
    }

    function render_users_options(arr) {
        return arr.map((item) => {
            return <Select.Option key={item.username} value={item.username}>{item.username}</Select.Option>
        })
    }

    function render_task_options(arr) {
        return arr.map((item) => {
            return <Select.Option key={item.type} value={item.type}>{item.name}</Select.Option>
        })
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
                        {render_task_options(task_types)}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="负责人"
                    name="owner"
                    rules={[{ required: true, message: '请选择负责人' }]}
                >
                    <Select>
                        {render_users_options(users)}
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