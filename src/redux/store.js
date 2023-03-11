import { configureStore } from '@reduxjs/toolkit';
import dropReducer from './slice/drop';
import projectReducer from './slice/project';

export const store = configureStore({
    reducer: {
        drop: dropReducer,
        project: projectReducer
    }
})