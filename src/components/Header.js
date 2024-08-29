import React, { useContext } from 'react'
import { MyContext } from './ContextProvider'
import { Link } from 'react-router-dom';

function Header() {
    const {movies} = useContext(MyContext)
    const getALLGenres = movies.map(mov => mov.genres)
    const arrGenres = getALLGenres.flat();
    // const arrayGenresSet =[...new Set(arrGenres)];
    const arrayGenresSet = Array.from(new Set(arrGenres))
    console.log(arrayGenresSet);
    

    
  return (
    <div>
      <h1 style={{textAlign:'center'}}>React Application</h1>
      <hr style={{color:'green'}}></hr>
      <ul style={{listStyle:'none', textAlign:'center'}}>
        {arrayGenresSet.map((item,index) => (
            
                <li style={{ display:'inline-block', padding:'0 30px'}} key={index}><Link to={`/movie/?genre=${item}`}>{item.toUpperCase()}</Link></li>
           
        ))}
    </ul>
      <hr style={{color:'green'}}></hr>
    </div>
  )
}

export default Header
