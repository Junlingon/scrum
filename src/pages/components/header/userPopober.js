import { List, Popover, Typography } from 'antd'
import { useSelector } from 'react-redux'
import { select_users } from '../../../redux/slice/project'

function UserPopover() {

    const users = useSelector(select_users)

    let content = (
        <div className='project_create'>
            <Typography.Text type={'secondary'}>组员列表</Typography.Text>
            <List style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {
                    users.map((item) => {
                        return (
                            <List.Item key={'user_' + item.username} className="user_listItem">
                                <p key={item.username}>{item.username}</p>
                            </List.Item>
                        )
                    })
                }
            </List>
        </div>
    )

    return (
        <Popover placement={'bottom'} content={content}>
            <h2 className='project_btn' style={{ cursor: 'pointer' }}>组员</h2>
        </Popover>
    )
}

export default UserPopover