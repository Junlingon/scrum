import { createAsyncThunk, createSlice, } from '@reduxjs/toolkit';
import axios from '../../util/http';
import { set_kanban_data } from './drop';

const initialState = {
    list: [], //项目列表
    loading: false,
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
    }
})

export const { } = projectSlice.actions;

export const select_project_list = (state) => {
    return state.project.list
}


export default projectSlice.reducer;