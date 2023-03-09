import { Button, Space, Table, Pagination } from 'antd';
import { NavLink } from 'react-router-dom';

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

const data = [{
    collect: false,
    name: '测试数据',
    organization: '研发部门',
    owner: '李苗苗',
    created: '2022-12-01'
}]

function ProjectTable() {

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