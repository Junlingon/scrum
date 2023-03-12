import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';
import Login from './pages/login';
import Register from './pages/register';
import Layout from './pages/components/layout';
import Project from './pages/project';
import Kanban from './pages/kanban';
import Epic from './pages/epic';
import { notification } from 'antd'
import EventBus from './util/event'
import { getUsersAsync, getTaskTypesAsync } from './redux/slice/project';
import { useDispatch } from 'react-redux';

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [api, contextHolder] = notification.useNotification()

  //错误弹窗提示方法
  const openNotification = (msg) => {
    api.error({
      message: msg,
      placement: 'topRight'
    })
  }

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/project')
    }

    EventBus.on("global_error_tips", function (msg) {
      // console.log('发生错误了')
      openNotification(msg)
    })
    // 获取下拉框动态数据
    dispatch(getUsersAsync())
    dispatch(getTaskTypesAsync())
  })

  return (
    <div className="App">
      {/* 这是antd弹窗占位符，一个固定写法、 */}
      {contextHolder}
      <Routes>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route element={<Layout></Layout>}>
          <Route path='/project' element={<Project></Project>}></Route>
          <Route path='/project/:id/kanban' element={<Kanban></Kanban>}></Route>
          <Route path='/project/:id/epic' element={<Epic></Epic>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
