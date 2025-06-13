import React from 'react'
import { Routes, Route } from 'react-router-dom';


const App = () => {
  return (
    <Routes>
      <Route path='/news' element={<div>News Page</div>} />
    </Routes>
  )
}

export default App