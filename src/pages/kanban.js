import SearchForm from './components/search_form'
import DropCp from './components/drop'
// import CreateTaskModal from './components/create_task_modal'

function Kanban() {

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
            {/* <CreateTaskModal /> */}
        </div>
    )
}

export default Kanban;