import React from 'react'
import './default.scss'
import Header from './components/Header'
import Homepage from './pages/Homepage'
// import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main">
        <Homepage />
      </div>
    </div>
  )
}

export default App
