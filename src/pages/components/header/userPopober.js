import { Divider, List, Popover, Typography } from 'antd'

function UserPopover() {

    let content = (
        <div className='project_create'>
            <Typography.Text type={'secondary'}>组员列表</Typography.Text>
            <List>
                <List.Item className="user_listItem">
                    <p>高秀文</p>
                </List.Item>
                <List.Item className="user_listItem">
                    <p>高秀文</p>
                </List.Item>
                <List.Item className="user_listItem">
                    <p>高秀文</p>
                </List.Item>
                <List.Item className="user_listItem">
                    <p>高秀文</p>
                </List.Item>
            </List>
            <Divider />
        </div>
    )

    return (
        <Popover placement={'bottom'} content={content}>
            <h2 className='project_btn' style={{ cursor: 'pointer' }}>组员</h2>
        </Popover>
    )
}

export default UserPopover