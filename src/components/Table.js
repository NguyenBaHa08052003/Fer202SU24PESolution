import React, { useContext } from 'react'
import { MyContext } from './ContextProvider'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios';

function Table() {
  const {setMovies,movies,producers,directors,stars, producerId , setProducerId,genres, setGenres} = useContext(MyContext)
  const query = new URLSearchParams(useLocation().search);
  const nameGenres = query.get('genre') 
  const idProducers = query.get('producer-id') 
  setGenres(nameGenres)
  console.log(genres);
  
  setProducerId(idProducers)
  console.log(producerId);
  
  const getNameProduce = (proId) => {
    const getPro = producers?.find(pro => pro.id == proId)?.name;
    return getPro;
  }

  const getNameDir =(dirId) => {
    const nameDir = directors?.find(dir => dir.id == dirId)?.fullname;
    return nameDir
  }

  const getNameStar = (starId) => {
    const nameStar = stars?.find(sta => sta.id == starId)?.fullname
  
    return nameStar
  }

  const filtered = movies.filter((mov) => {
    const matchGenres = mov.genres.includes(genres) || genres === null ;
    const matchIdProducer = mov.producer == producerId || producerId ===  null;
 
    return matchGenres && matchIdProducer
  })

  const deleteStar = async (movId,starId) => {
    const getMovById = movies.find(mov => mov.id == movId)
    if(window.confirm('Ban co chac la muon delete khong')){
      const updateAfterDelete = {...getMovById, stars: getMovById.stars.filter(sta => sta != starId) }
      await axios.put(`http://localhost:9999/movies/${movId}`, updateAfterDelete)
      setMovies(movies.map(mov => mov.id != movId ? mov : updateAfterDelete))
    }
    
    
  }
  return (
    <div>
      <h3>List of Movies</h3>
      <Link to={'/movie'}>Show all movies</Link>
      <table className='table table-bordered table-striped table-hover'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Release</th>
            <th>Description</th>
            <th>Producer</th>
            <th>Director</th>
            <th>Genres</th>
            <th>Stars</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((item) => (
            <tr>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.release}</td>
              <td>{item.description}</td>
              <td>{getNameProduce(item.producer)}</td>
              <td>{getNameDir(item.director)}</td>
              <td>{item?.genres.map((gen) => (
                <div>{gen}</div>
              ))}</td>
              <td>{item?.stars.map((sta,index) => (
                <div>{`${index + 1} - ${getNameStar(sta)}`} <Link onClick={() => deleteStar(item.id, sta)}>Delete Star </Link></div>
              ))}<Link to={`/movie/${item.id}/add-stars`} style={{float:'right'}}>Add Star</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
