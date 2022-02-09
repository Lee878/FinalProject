import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MovieItem } from './MovieItem'
import './MovieList.less'
import '../pageset/maincontent/maincontent.less'
import CustomPag from '../CustomPag'


const MovieList = () => {
    const [page, setPage] = useState(1)
    const [content, setContent] = useState([])
    const [pagesize, setPagesize] = useState(1)
    const fetchMovie = async() =>{
        const {data} = await axios.get(`
        https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`)
        console.log(data)
        setContent(data.results)
        setPagesize(data.total_results)
    }
    useEffect(() => {
        fetchMovie()
        // eslint-disable-next-line
    }, [page])

    return (
        <div>
            <span className='pageTitle'>Movie & TV Show</span>
            <div className='movielist'>
                {content && content.map((c)=>
                <MovieItem 
                    key ={c.id}
                    id = {c.id} 
                    poster={c.poster_path} 
                    title = {c.title || c.name} 
                    date ={c.release_date || c.first_air_date}
                    type ={c.media_type}
                    vote_average={c.vote_average}  
                />)}
            </div>
            <CustomPag setPage = {setPage} pageSize={pagesize}/>
        </div>
    )
}

export default MovieList
