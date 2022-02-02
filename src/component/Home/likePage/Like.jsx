import  React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../movieList/MovieList.less'
import '../pageset/maincontent/maincontent.less'
import CustomPag from '../CustomPag'
import { MovieItem } from '../movieList/MovieItem'
import Memorycontrol from '../../../api/Memorycontrol'

const Like = () => {
    const [page, setPage] = useState(1)
    const [content, setContent] = useState([])
    const [pagesize, setPagesize] = useState(1)
    const username = Memorycontrol.user.username
    const fetchMovie = async() =>{
        await axios.post('/mylike',{
            username: username,
        }
        ).then((response) => { 
            
            console.log(response.data)
            console.log(response.data.length)
            setContent(response.data)
            setPagesize(response.data.length)
          })

        // console.log(data)
        // setContent(data.results)
        // setPagesize(data.total_results)
    }
    useEffect(() => {
        fetchMovie()
        // eslint-disable-next-line
    }, [page])
    return (
        <div>
            <span className='pageTitle'>Like</span>
            <div className='movielist'>
                {content && content.map((c)=>
                <MovieItem 
                    key ={c[0]}
                    id = {c[2]} 
                    poster={c[5]} 
                    title = {c[3]} 
                    date ={c[7]}
                    type ={c[4]}
                    vote_average={c[8]}  
                />)}
            </div>
            <CustomPag setPage = {setPage} pageSize={pagesize}/>
            
        </div>
    )
}

export default Like
