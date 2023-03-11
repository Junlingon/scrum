import ProjectPopover from "./projectPopover"
import UserPopover from "./userPopober"
import logo from '../../../static/JiraSoftware.svg'
import { useNavigate } from "react-router-dom"

function Header() {
    const navigate = useNavigate()

    function home_click() {
        navigate('/project')
    }

    return (
        <div className='header_wrap_body'>
            <button className='header_button' onClick={home_click}>
                <img className="header_logo" src={logo} alt='logo'></img>
                {/* <h2 >scrum项目管理系统</h2> */}
            </button>
            <ProjectPopover />
            <UserPopover />
            <div className="header_login_out_btn">退出登录</div>
        </div>
    )
}

export default Header 