import SearchForm from './components/search_form'
import DropCp from './components/drop'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { get_project_async } from '../redux/slice/project';


function Kanban() {
    const params = useParams()
    const project_id = params.id
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(get_project_async(project_id))
    }, [project_id])

    return (
        <div className='kanban_body'>
            <div className='Kanban_title'>
                <h1>scrum敏捷项目管理-研发看板</h1>
            </div>
            <div className='kanban_search_wrap'>
                <SearchForm />
            </div>
            <div className='drop_wrap'>
                <DropCp />
            </div>
        </div>
    )
}

export default Kanban;