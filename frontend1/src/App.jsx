import React from 'react'
import { Routes, Route } from 'react-router-dom';
import News from './pages/News';

const App = () => {
  return (
    <Routes>
      <Route path='/news' element={<News/>} />
    </Routes>

  )
}

export default App