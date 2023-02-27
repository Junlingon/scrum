import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import Register from './pages/register';
import Layout from './pages/components/layout';
import Project from './pages/project';
import Kanban from './pages/kanban';
import Epic from './pages/epic';


function App() {
  return (
    <div className="App">
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
