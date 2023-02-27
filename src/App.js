import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import Register from './pages/register';
import Layout from './pages/components/layout';
import Project from './pages/project';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route element={<Layout></Layout>}>
          <Route path='/project' element={<Project></Project>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
