import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    kanban_data: [
        {
            "kanban_key": '111',
            'task': [
                {
                    "name": 'asdad',
                    "type": "bug",
                    "owner": 'azer',
                    "task_id": '7adakhkhc'
                },
                {
                    "name": 'asdd',
                    "type": "bug",
                    "owner": 'azer',
                    "task_id": '7adakhkh6'
                },
                {
                    "name": 'asd444ad',
                    "type": "bug",
                    "owner": 'azer',
                    "task_id": '7adakhkh4'
                }
            ]
        },
        {
            "kanban_key": '222',
            'task': [
                {
                    "name": 'a7sda77d',
                    "type": "bug",
                    "owner": 'azer',
                    "task_id": '7adakh8hc'
                },
                {
                    "name": 'asd54ad',
                    "type": "bug",
                    "owner": 'azer',
                    "task_id": '7ada6hkh6'
                },
                {
                    "name": 'asda22d',
                    "type": "bug",
                    "owner": 'azer',
                    "task_id": '7adkh4kh4'
                }
            ]
        }
    ],
}

// 数据位置互换
function reorderList(list, starIndex, endIndex) {
    const result = list
    const [removed] = result.splice(starIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
}

export const DropSlice = createSlice({
    name: 'drop',
    initialState,
    reducers: {
        //看板之间的移动
        kanban_order: (state, action) => {
            reorderList(
                state.kanban_data,
                action.payload.source,
                action.payload.destination
            )
            console.log(state.kanban_data);
        },
        //同一个看板之间任务的移动
        task_same_order: (state, action) => {
            const SomeOrder = state.kanban_data.find((item) => {
                return item.kanban_key === action.payload.kanban_key
            })
            reorderList(
                SomeOrder.task,
                action.payload.source,
                action.payload.destination
            )
        },
        //不同看板之间任务的移动
        task_diff_order: (state, action) => {

            const source_kanban = state.kanban_data.find((item) => {
                return item.kanban_key === action.payload.source_kanban_key
            })

            const destination_kanban = state.kanban_data.find((item) => {
                return item.kanban_key === action.payload.destination_kanban_key
            })

            const source_task = source_kanban.task;
            const destination_task = destination_kanban.task;

            const result_source = source_task[action.payload.source]
            source_task.splice(action.payload.source, 1);
            destination_task.splice(action.payload.destination, 0, result_source)
        },
        add_kanban: (state, action) => {
            // immer
            const kanban_key = action.payload.kanban_key;
            state.kanban_data.push({
                kanban_key,
                task: []
            })
        },
        add_task: (state, action) => {
            const kanban_key = action.payload.kanban_key;
            const task_data = action.payload.task;

            const kanban = state.kanban_data.find((item) => {
                return item.kanban_key === kanban_key
            });

            kanban.task.push(task_data)
        },
        update_task: (state, action) => {
            const kanban_key = action.payload.kanban_key;
            let task_data = action.payload.task;
            const task_id = action.payload.task_id;

            const kanban = state.kanban_data.find((item) => {
                return item.kanban_key === kanban_key
            });

            const index = kanban.task.findIndex((item) => {
                return item.task_id === task_id
            })

            // 补充id
            task_data.task_id = kanban.task.task_id

            kanban.task[index] = task_data
        }
    }
})

export const kanban_selector = (state) => {
    return state.drop.kanban_data
}

export const {
    kanban_order,
    task_same_order,
    task_diff_order,
    add_kanban,
    add_task
} = DropSlice.actions;
export default DropSlice.reducer;//这里是reducer 没有s