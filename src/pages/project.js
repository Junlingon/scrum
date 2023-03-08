import ProjectTable from './components/project_table'
import CreateProjectModal from './components/create_project_modal'
import ProjectSearch from './components/project_search'

function Project() {

    return (
        <div className='project_body_wrap'>
            <div className='project_title_wrap'>
                <h1>项目列表</h1>
                <button>创建项目</button>
            </div>
            <div className='project_search_wrap'>
                <ProjectSearch />
            </div>
            <div className='project_table_wrap'>
                <ProjectTable />
            </div>
            <CreateProjectModal />
        </div>
    )
}

export default Project