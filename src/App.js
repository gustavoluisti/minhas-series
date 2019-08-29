import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import axios from 'axios'

import Header from './Header'
import Generos from './Generos'
import NovoGenero from './NovoGenero'

const Home = () => {
  return <h1>Home</h1>
}

function App() {
  const [ data, setData ] = useState({})
  useEffect(()=> {
    axios.get('/api').then(res => {
      setData(res.data)
    })
  }, [])
  return (
    <Router>
      <div>
        <Header />
        <Route exact path='/' component={Home} />
        <Route path='/generos/novo' exact component={NovoGenero}/>
        <Route path='/generos' exact component={Generos} />
        
        <pre>{JSON.stringify(data)}</pre>
      </div>
    </Router>

  )
}

export default App
