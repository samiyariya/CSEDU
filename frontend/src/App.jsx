import React from 'react'
import { Routes, Route } from 'react-router-dom';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';

const App = () => {
  return (
    <Routes>
      <Route path='/news' element={<News/>} />
      <Route path='/news/archived' element={<News/>} />
      <Route path='/news/:id' element={<NewsDetail/>} />
    </Routes>
  )
}

export default App