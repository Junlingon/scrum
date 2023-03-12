import { createAsyncThunk, createSlice, } from '@reduxjs/toolkit';
import axios from '../../util/http';
import { set_kanban_data } from './drop';
import { set_current_project } from './kanban';

const initialState = {
    list: [], //项目列表
    loading: false,
    users: [],
}

//获取所有的项目列表
export const getProjectListAsync = createAsyncThunk(
    'project/get_project_list',
    async () => {
        const response = await axios.get('/api/projects');
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

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {

    },
    extraReducers: {
        [getProjectListAsync.pending]: (state, res) => {
            state.loading = true
        },
        [getProjectListAsync.fulfilled]: (state, res) => {
            const data = res.payload.data.data;

            //后台有关，可能没有收藏这个字段
            data.forEach(element => {
                if (typeof element.collect === 'undefined') {
                    element.collect = false
                }
            });

            state.list = data
            state.loading = false
        },
        [getUsersAsync.fulfilled]: (state, res) => {
            const data = res.payload.data;
            state.users = data;
        },
    }
})

export const { } = projectSlice.actions;

export const select_project_list = (state) => {
    return state.project.list
}

export const select_users = (state) => {
    return state.project.users
}

export default projectSlice.reducer;