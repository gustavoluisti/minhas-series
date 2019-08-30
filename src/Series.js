import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Series = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('/api/series')
      .then(res => {
        setData(res.data.data)
      })
  }, [])

  const deleteSerie = (id) => {
    axios.delete('/api/series/' + id)
          .then(res => {
            const filtrado = data.filter(item => item.id !== id)
            setData(filtrado)
          })
  }

  const renderizaLinha = recorde => {
    return (
      <tr key={recorde.id}>
        <th scope="row">{recorde.id}</th>
        <td>{recorde.name}</td>
        <td>
          <button className='btn btn-danger' onClick={() => deleteSerie(recorde.id)}>Remover</button>
          <Link className='btn btn-warning' to={'/series/' + recorde.id}>Editar</Link>
        </td>
      </tr>
    )
  }

  if (data.length === 0) {
    return(
      <div className='container'>
        <h1>Séries</h1>
        <Link className='btn btn-primary' to='/series/novo'>Nova série</Link>
        <div className="alert alert-warning" role="alert">
          Nenhuma serie cadastrada
        </div>
      </div>
    )
  }

  return (
    <div className='container'>
      <h1>Séries</h1>
      <Link className='btn btn-primary' to='/series/novo'>Nova série</Link>
      {/* <pre>{JSON.stringify(data)}</pre> */}
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
        
          {data.map(renderizaLinha)

          }

        </tbody>
      </table>
    </div>
  )
}

export default Series