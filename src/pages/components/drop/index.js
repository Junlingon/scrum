import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskDrop from './task_drop';
import './drop.css'
import { Button, Input } from 'antd';
import React, { useTransition, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { kanban_order, kanban_selector, task_same_order, task_diff_order, update_kanban_async, add_kanban } from '../../../redux/slice/drop';
import { set_task_modal } from '../../../redux/slice/kanban';

function DropCp() {

    const drag_data = useSelector(kanban_selector)
    const dispatch = useDispatch()
    const [value, setValue] = useState('');
    //数据过多时候的渲染优化
    // const [isPending, startTransition] = useTransition();
    // const [drag_data, setData] = useState([]);
    // useEffect(() => {
    //     startTransition(() => {
    //         let data = []
    //         for (let i = 0; i < 100; i++) {
    //             let task = []
    //             for (let j = 0; j < 30; j++) {
    //                 task.push({
    //                     name: `${i}_${j}`,
    //                     owner: `${i}_${j}`,
    //                     type: 'bug'
    //                 })
    //             }
    //             data.push({
    //                 kanban_key: `${i}`,
    //                 task
    //             })
    //         }
    //         setData(data)
    //     });
    // }, []);

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
            //更新拖拽后的数据
            dispatch(update_kanban_async())
        }
        //kanban类型
        if (e.type === 'task') {
            if (e.source.droppableId === e.destination.droppableId) {
                dispatch(task_same_order({
                    kanban_key: e.destination.droppableId,
                    source: e.source.index,
                    destination: e.destination.index,
                }))
                //更新拖拽后的数据
                dispatch(update_kanban_async())
            } else {
                dispatch(task_diff_order({
                    source_kanban_key: e.source.droppableId,
                    destination_kanban_key: e.destination.droppableId,
                    source: e.source.index,
                    destination: e.destination.index,
                }))
                //更新拖拽后的数据
                dispatch(update_kanban_async())
            }
        }
    }

    function input_keydown(e) {
        const value = e.target.value.trim();
        if (!value) {
            return;
        }
        dispatch(add_kanban({
            kanban_key: value
        }))
        dispatch(update_kanban_async())
        setValue('')
    }

    function new_task_click(kanban_key) {
        dispatch(set_task_modal({
            show: true,
            kanban_key,
            type: 'create'
        }))
    }


    // if (isPending) {
    //     return <div>Loading...</div>;
    // }

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
                                <Draggable key={'Drag_' + item.kanban_key} draggableId={'droppable' + item.kanban_key} index={index}>
                                    {(provided, snapshot) => {
                                        return (
                                            <div
                                                className='kanban_drag_wrap'
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}

                                            >
                                                <h1 style={{
                                                    textAlign: 'initial',
                                                    fontWeight: '400',
                                                    fontSize: 'x-large',
                                                    color: '#58667f'
                                                }}>{item.kanban_key}</h1>
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
                <Input placeholder="新建看板名称" onPressEnter={input_keydown} value={value} onChange={(e) => { setValue(e.target.value) }} />
            </div>
        </DragDropContext>
    )
}


const DropCpMemo = React.memo(DropCp)
export default DropCpMemo;