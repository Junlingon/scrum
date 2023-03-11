import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    //当前的project对象
    current_project: {}
}

export const kanbanSlice = createSlice({
    name: 'kanban',
    initialState,
    reducers: {
        set_current_project: (state, action) => {
            state.current_project = action.payload
        }
    }
})

export const select_current_project = (state) => {
    return state.kanban.current_project
}

export const { set_current_project } = kanbanSlice.actions;

export default kanbanSlice.reducer;