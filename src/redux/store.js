import { configureStore } from '@reduxjs/toolkit';
import dropReducer from './slice/drop';

export const store = configureStore({
    reducer: {
        drop: dropReducer
    }
})