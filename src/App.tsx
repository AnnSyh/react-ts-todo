import React from 'react';
import { Navbar } from './components/Navbar';
import { Route, Routes } from 'react-router-dom'
import { TodosPage } from './pages/TodosPage';
import { AboutPage } from './pages/AboutPage';


const App: React.FC = () => {
  return <>
    <Navbar />
    <div className='container'>
      <Routes>
        <Route path='/' element={<TodosPage />} />
        <Route path='/about' element={<AboutPage />} />
      </Routes>
    </div>
  </>
}

export default App;
