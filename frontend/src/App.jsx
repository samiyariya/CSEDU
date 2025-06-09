import React from 'react'
import { Routes, Route } from 'react-router-dom';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Event from './pages/Event';
// import EventDetail from './pages/EventDetail'; // Future component

const App = () => {
  return (
    <Routes>
      <Route path='/news' element={<News/>} />
      <Route path='/news/archived' element={<News/>} />
      <Route path='/news/:id' element={<NewsDetail/>} />
      <Route path='/events' element={<Event/>} />
      {/* Future event routes */}
      {/* <Route path='/events/:id' element={<EventDetail/>} /> */}
      {/* <Route path='/events/category/:category' element={<Events/>} /> */}
    </Routes>
  )
}

export default App