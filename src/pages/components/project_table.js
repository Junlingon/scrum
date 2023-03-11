import { Button, Space, Table, Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getProjectListAsync, select_project_list } from '../../redux/slice/project';
import { useEffect } from 'react'

const columns = [
    {
        title: '收藏',
        dataIndex: 'collect',
        key: 'collect',
        render: (text, record) => {
            return (
                <div className='iconfont icon-shoucang shoucang-item' style={{ color: text ? '#dfd50c' : '' }}></div>
            )
        },
        width: '10%'
    },
    {
        title: '项目名称',
        dataIndex: 'name',
        key: 'name',
        render: (text, data) => {
            // console.log(text, data)
            return <NavLink to={`/project/${data._id}/kanban`}>{text}</NavLink>
        },
        sorter: (a, b) => a.title - b.title,
        width: '30%',
    },
    {
        title: '部门',
        dataIndex: 'organization',
        key: 'organization',
        width: '15%'
    },
    {
        title: '负责人',
        dataIndex: 'owner',
        key: 'owner',
        render: text => <div>{text}</div>,
        width: '15%'
    },
    {
        title: '创建时间',
        key: 'created',
        dataIndex: 'created',
        render: (_, record) => (
            <Space size="middle">
                <div>创建时间</div>
            </Space>
        ),
    },
    {
        title: '操作',
        key: 'created',
        dataIndex: 'created',
        render: (_, record) => (
            <>
                <Button type='primary'>编辑</Button>
                <Button type='danger'>删除</Button>

            </>
        ),
    },
];

function ProjectTable() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProjectListAsync())
    }, [])

    const data = useSelector(select_project_list)
    return (
        <>
            <Table
                rowKey="created"
                className='project_table_css'
                pagination={false}
                dataSource={data}
                columns={columns}
            />
            <Pagination />
        </>
    )
}

export default ProjectTable