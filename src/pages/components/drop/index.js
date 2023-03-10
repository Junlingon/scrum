import { DragDropContext } from 'react-beautiful-dnd';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import TaskDrop from './task_drop';
import './drop.css'
import { Button, Input } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { kanban_order, kanban_selector, task_same_order, task_diff_order, add_task } from '../../../redux/slice/drop';
import { useDispatch } from 'react-redux';

function DropCp() {
    const drag_data = useSelector(kanban_selector)
    const dispatch = useDispatch()

    function onDragEnd(e) {
        // console.log(e)
        if (!e.destination) {
            return
        }
        if (e.type === 'kanban') {
            dispatch(kanban_order({
                source: e.source.index,
                destination: e.destination.index
            }))
        }
        //kanban类型
        if (e.type === 'task') {
            if (e.source.droppableId === e.destination.droppableId) {
                dispatch(task_same_order({
                    kanban_key: e.destination.droppableId,
                    source: e.source.index,
                    destination: e.destination.index,
                }))
            } else {
                dispatch(task_diff_order({
                    source_kanban_key: e.source.droppableId,
                    destination_kanban_key: e.destination.droppableId,
                    source: e.source.index,
                    destination: e.destination.index,
                }))
            }
        }
    }

    function new_task_click(kanban_key) {
        dispatch(add_task({
            task: {
                "name": '新增',
                "type": "bug",
                "owner": 'azaaer',
                "task_id": '3adakhkhc'
            },
            kanban_key,
        }))
    }
    return (
        <DragDropContext
            onDragEnd={onDragEnd}
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
                                                    new_task_click(item.kanban_key)
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