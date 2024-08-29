import React, { useContext } from 'react'
import { MyContext } from './ContextProvider'
import { Link } from 'react-router-dom'

function Sider() {
  const {producers} = useContext(MyContext)

  return (
    <div>
      <h3>Producers</h3>
      <ul>
        {producers.map((item) => (
          <li><Link to={`/movie/?producer-id=${item.id}`}>{item.name}</Link></li>
        ))}
      </ul>
    </div>
  )
}

export default Sider
