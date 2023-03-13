import { createAsyncThunk, createSlice, } from '@reduxjs/toolkit';
import axios from '../../util/http';
import { set_kanban_data } from './drop';
import { set_current_project } from './kanban';

const initialState = {
    list: [], //项目列表
    loading: false,
    users: [],
    task_types: [],
    organizations: [],
    search_query: {},
    total: 0,
    current_page: 1,
    project_modal: {
        show: false,
        type: 'create',
        id: ''
    },
}

//获取所有的项目列表
export const getProjectListAsync = createAsyncThunk(
    'project/get_project_list',
    async (data, store) => {
        const state = store.getState()
        const skip = (state.project.current_page - 1) * 10;
        const search_query = state.project.search_query

        const response = await axios.post('/api/projects/search', {
            ...search_query,
            skip
        });
        return response.data;
    }
)
// 根据id获取单一的project对象
export const get_project_async = createAsyncThunk(
    'project/get',
    async (action, state) => {

        // 根据id获取单一的project对象
        const res = await axios.get(`/api/project/${action}`);
        const kanban = res.data.data.kanban;
        state.dispatch(set_kanban_data(kanban))
        // 设置当前的project对象
        state.dispatch(set_current_project(res.data.data))
    }
)

//获取user信息
export const getUsersAsync = createAsyncThunk(
    'project/get_users',
    async () => {
        const response = await axios.get('/api/users');
        return response.data;
    }
)
//获取任务类型
export const getTaskTypesAsync = createAsyncThunk(
    'project/get_task_types',
    async () => {
        const response = await axios.get('/api/task/type_list');
        return response.data;
    }
)

export const getOrgsAsync = createAsyncThunk(
    'project/get_orgs',
    async () => {
        const response = await axios.get('/api/organization');
        return response.data;
    }
)

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        set_project_modal: (state, action) => {
            state.project_modal = {
                ...state.project_modal,
                ...action.payload
            }

        },
        change_list: (state, action) => {
            const { _id, data } = action.payload;
            const index = state.list.findIndex((item) => {
                return item._id === _id
            })
            state.list[index] = data;
        },
        set_search_query: (state, action) => {
            state.search_query = action.payload
        },
        set_current_page: (state, action) => {
            state.current_page = action.payload
        }
    },
    extraReducers: {
        [getProjectListAsync.pending]: (state, res) => {
            state.loading = true
        },
        [getProjectListAsync.fulfilled]: (state, res) => {
            const data = res.payload.data.data;
            const total = res.payload.data.total;
            //后台有关，可能没有收藏这个字段
            data.forEach(element => {
                if (typeof element.collect === 'undefined') {
                    element.collect = false
                }
            });

            state.list = data
            state.loading = false
            state.total = total
        },
        [getUsersAsync.fulfilled]: (state, res) => {
            const data = res.payload.data;
            state.users = data;
        },
        [getTaskTypesAsync.fulfilled]: (state, res) => {
            const data = res.payload.data;
            state.task_types = data;
        },
        [getOrgsAsync.fulfilled]: (state, res) => {
            const data = res.payload.data;
            state.organizations = data;
        },
    }
})

export const { set_current_page, set_project_modal, change_list, set_search_query } = projectSlice.actions;

export const select_project_list = (state) => {
    return state.project.list
}

export const select_project_list_data = (state) => {
    return {   //每次都返回的是一个新对象 
        list: state.project.list,
        total: state.project.total,
        current_page: state.project.current_page
    }
}

export const select_project_modal = (state) => {
    return state.project.project_modal
}

export const select_users = (state) => {
    return state.project.users
}

export const select_task_types = (state) => {
    return state.project.task_types
}

export const select_orgs = (state) => {
    return state.project.organizations
}

export default projectSlice.reducer;