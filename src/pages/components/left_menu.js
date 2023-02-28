import { Menu } from 'antd'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'



function LeftMenu() {
    const location = useLocation()
    const [active, set_active] = useState('')
    const params = useParams()
    const navigate = useNavigate()

    const pathname = location.pathname;
    const key_arr = pathname.split('/')

    useEffect(() => {
        set_active(key_arr[3])
    }, [])

    const items = [{
        label: '看板',
        key: 'kanban',
    }, {
        label: '任务组',
        key: 'epic',
    }]

    function menu_click(e) {
        const key = e.key;
        set_active(key)
        const id = params.id
        navigate(`/project/${id}/${key}`)
    }

    return (
        <div className='left_menu'>
            <Menu
                onClick={menu_click}
                selectedKeys={active}
                mode={'inline'}
                items={items}
            >
            </Menu>
        </div>
    )
}

export default LeftMenu;