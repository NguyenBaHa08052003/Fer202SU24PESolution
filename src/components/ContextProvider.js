import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export const MyContext = createContext()
function ContextProvider({children}) {
    const [producers, setProducers] = useState([])
    const [directors, setDirectors] = useState([])
    const [stars, setStars] = useState([])
    const [movies,setMovies] = useState([])
    const [genres, setGenres] = useState("")
    const [producerId , setProducerId] = useState("")
    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            const proData = await axios.get(`http://localhost:9999/producers`);
            setProducers(proData.data)
            const dirData = await axios.get(`http://localhost:9999/directors`);
            setDirectors(dirData.data)
            const staData = await axios.get(`http://localhost:9999/stars`);
            setStars(staData.data)
            const movData = await axios.get(`http://localhost:9999/movies`);
            setMovies(movData.data)

        }
        fetchData();
        navigate("/movie")
    },[])
    
    
    const data = {
        producers, setProducers,
        directors, setDirectors,
        stars, setStars,
        movies,setMovies,
        genres, setGenres,
        producerId , setProducerId
    }
    

  return (
    <MyContext.Provider value={data} >
      {children}
    </MyContext.Provider>
  )
}

export default ContextProvider
