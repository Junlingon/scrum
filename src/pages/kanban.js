import SearchForm from './components/search_form'
import DropCp from './components/drop'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_project_async } from '../redux/slice/project';
import { select_current_project } from '../redux/slice/kanban';
import { set_project_id } from '../redux/slice/drop';
import CreateTaskModal from './components/create_task_modal'
import DndPro from './dndPro';

function Kanban() {
    const params = useParams()
    const project_id = params.id
    const dispatch = useDispatch()
    const current_project = useSelector(select_current_project)

    useEffect(() => {
        dispatch(get_project_async(project_id))
        dispatch(set_project_id(project_id))
    }, [project_id])

    return (
        <div className='kanban_body'>
            <div className='Kanban_title'>
                <h1>{current_project.name}-研发看板</h1>
            </div>
            <div className='kanban_search_wrap'>
                <SearchForm />
            </div>
            <div className='drop_wrap'>
                <DropCp />
            </div>
            <CreateTaskModal />
        </div>
    )
}

export default Kanban;