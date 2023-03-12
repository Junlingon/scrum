import { Button, Space, Table, Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getProjectListAsync, select_project_list, select_project_list_data, set_current_page, change_list, set_project_modal } from '../../redux/slice/project';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { store } from '../../redux/store'
import axios from '../../util/http'

function hand_collect_click(record) {
    const data = {
        ...record,
        collect: !record.collect
    }
    const dispatch = store.dispatch;
    dispatch(change_list({
        _id: record._id,
        data
    }))
    // 跟服务器同步
    axios.put(`/api/projects/${record._id}`, {
        collect: data.collect
    })
}

function edit_click(id) {
    store.dispatch(set_project_modal({
        show: true,
        type: 'edit',
        id
    }))
}

async function del_click(id) {
    await axios.delete(`/api/projects/${id}`);
    store.dispatch(getProjectListAsync())
}

const columns = [
    {
        title: '收藏',
        dataIndex: 'collect',
        key: 'collect',
        render: (text, record) => {
            return (
                <div onClick={() => {
                    hand_collect_click(record)
                }} className='iconfont icon-shoucang shoucang-item' style={{ color: text ? '#dfd50c' : '' }}></div>
            )
        },
        width: '10%'
    },
    {
        title: '项目名称',
        dataIndex: 'name',
        key: 'name',
        render: (text, data) => {
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
                <div>{dayjs(record.created).format('DD/MM/YYYY')}</div>
            </Space>
        ),
    },
    {
        title: '操作',
        key: 'created',
        dataIndex: 'created',
        render: (_, record) => (
            <>
                <Button type='primary' onClick={() => {
                    edit_click(record._id)
                }}>编辑</Button>
                <Button type='danger' onClick={() => {
                    del_click(record._id)
                }}>删除</Button>

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
    const total = useSelector(select_project_list_data).total

    function onChange(page) {
        dispatch(set_current_page(page));
        dispatch(getProjectListAsync())
    }
    return (
        <>
            <Table
                rowKey="created"
                className='project_table_css'
                pagination={false}
                dataSource={data}
                columns={columns}
            />
            <Pagination
                onChange={onChange}
                total={total}
                current={data.current_page}
            />
        </>
    )
}

export default ProjectTable