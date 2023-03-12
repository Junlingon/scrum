import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './slice/project';
import dropReducer from './slice/drop'
import kanbanReducer from './slice/kanban'
import epicReducer from './slice/epic'

export const store = configureStore({
    reducer: {
        project: projectReducer,
        drop: dropReducer,
        kanban: kanbanReducer,
        epic: epicReducer
    },
});