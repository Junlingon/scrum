import { DragDropContext } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';
import { Draggable } from 'react-beautiful-dnd';
import TaskDrop from './task_drop';
import './drop.css'
import { Button, Input } from 'antd';
import React from 'react';

function DropCp(props) {
    const drag_data = [
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
                    "name": 'asdad',
                    "type": "bug",
                    "owner": 'azer',
                    "task_id": '7adakhkh6'
                },
                {
                    "name": 'asdad',
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
                    "name": 'asdad',
                    "type": "bug",
                    "owner": 'azer',
                    "task_id": '7adakh8hc'
                },
                {
                    "name": 'asdad',
                    "type": "bug",
                    "owner": 'azer',
                    "task_id": '7ada6hkh6'
                },
                {
                    "name": 'asdad',
                    "type": "bug",
                    "owner": 'azer',
                    "task_id": '7adkh4kh4'
                }
            ]
        }
    ]

    return (
        <DragDropContext
            onDragEnd={() => { }}
            className="drag_container"
        >
            <Droppable direction="horizontal" droppableId="droppable-kanban" type="kanban">
                {(provided, snapshot) => (
                    <div
                        className='kanban_drop_wrap'
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {drag_data.map((item, index) => {
                            return (
                                <Draggable key={item.kanban_key} draggableId={item.kanban_key} index={index}>
                                    {(provided, snapshot) => {
                                        return (
                                            <div
                                                className='kanban_drag_wrap'
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}

                                            >
                                                <h1>{item.kanban_key}</h1>
                                                <TaskDrop task={item} />
                                                <Button className='new_task_btn' onClick={() => {
                                                    // new_task_click(item.kanban_key)
                                                }} type="primary" ghost>
                                                    新建task
                                                </Button>
                                            </div>
                                        )
                                    }}
                                </Draggable>
                            )
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <div className='kanban_drag_wrap'>
                <Input placeholder="新建看板名称" />
            </div>
        </DragDropContext>
    )
}


const DropCpMemo = React.memo(DropCp)
export default DropCpMemo;