import { Divider, List, Popover, Typography } from 'antd'

function ProjectPopover() {

    let content = (
        <div className='project_create'>
            <List>
                <List.Item className="project_listItem">
                    <p>物资管理项目</p>
                </List.Item>
            </List>
        </div>
    )

    return (
        <Popover placement={'bottom'} content={content}>
            <h2 style={{ cursor: 'pointer' }}>收藏项目</h2>
        </Popover>
    )
}


export default ProjectPopover