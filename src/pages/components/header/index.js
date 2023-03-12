import ProjectPopover from "./projectPopover"
import UserPopover from "./userPopober"
import logo from '../../../static/JiraSoftware.svg'
import { useNavigate } from "react-router-dom"
import axios from "../../../util/http"

function Header() {
    const navigate = useNavigate()

    function home_click() {
        navigate('/project')
    }

    async function logout() {
        await axios.post('/api/logout')
        navigate('/login')
    }

    return (
        <div className='header_wrap_body'>
            <button className='header_button' onClick={home_click}>
                <img className="header_logo" src={logo} alt='logo'></img>
            </button>
            <ProjectPopover />
            <UserPopover />
            <div className="header_login_out_btn" onClick={logout}>退出登录</div>
        </div>
    )
}

export default Header 