import { Outlet } from "react-router-dom"
import Header from "./header"
import LeftMenu from "./left_menu"

function Layout() {
    return (
        //类BM命名
        <div className="layout_wrap">
            <div className="header_wrap">
                <Header></Header>
            </div>
            <div className="layout_wrap_project">
                <div className="project_side_menu_wrap">
                    <LeftMenu></LeftMenu>
                </div>
                <div className="project_wrap">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    )
}

export default Layout