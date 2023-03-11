import { createAsyncThunk, createSlice, } from '@reduxjs/toolkit';
import axios from '../../util/http';


const initialState = {
    list: [], //项目列表
    loading: false,
}

export const getProjectListAsync = createAsyncThunk(
    'project/get_project_list',
    async () => {
        const response = await axios.get('/api/projects');
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
    }
})

export const { } = projectSlice.actions;

export const select_project_list = (state) => {
    return state.project.list
}


export default projectSlice.reducer;