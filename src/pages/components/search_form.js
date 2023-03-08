import { Button, Input, Select, Form } from 'antd'

function SearchForm() {
    return (
        <Form layout="inline" >
            <Form.Item
                name="name"
                style={{ width: 200 }}
            >
                <Input placeholder={'任务名'} className='search_form_input' />
            </Form.Item>
            <Form.Item
                label="负责人"
                name="owner"
                style={{ width: 200 }}
            >
                <Select
                    className='search_wrap_select'

                >
                    {
                        // render_users_options(users)
                    }
                </Select>
            </Form.Item>
            <Form.Item
                label="任务类型"
                name="type"
                style={{ width: 200 }}
            >
                <Select
                    className='search_wrap_select'
                    options={[
                        {
                            value: 'task',
                            label: 'task',
                        },
                        {
                            value: 'bug',
                            label: 'bug',
                        },
                    ]}
                />
            </Form.Item>
            <Form.Item
                label="epic"
                name="epic"
                style={{ width: 200 }}
            >
                <Select
                    className='search_wrap_select'
                // options={epic_options}
                />
            </Form.Item>
            <Button type="">重置</Button>
            <Button type="primary">查询</Button>
        </Form>
    )
}

export default SearchForm;