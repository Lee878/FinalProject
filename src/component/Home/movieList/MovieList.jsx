import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MovieItem } from './MovieItem'
import './MovieList.less'
import '../pageset/maincontent/maincontent.less'
import CustomPag from '../CustomPag'
import { Tabs } from 'antd';


const { TabPane } = Tabs;

const MovieList = () => {
    const [page, setPage] = useState(1)
    const [content, setContent] = useState([])
    const [pagesize, setPagesize] = useState(1)
    const [control, setControl] = useState(true)
    const fetchMovie = async() =>{
        axios.all([
            axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`),
            axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`)
          ])
          .then(axios.spread(function (trending, topRated) {
            // 上面两个请求都完成后，才执行这个回调方法
            console.log('User', trending.data);
            console.log('Repositories', topRated.data);
            if (control) {
                console.log(control);
                setContent(trending.data.results)
                setPagesize(trending.data.total_results)
            }else{
                console.log(control);
                setContent(topRated.data.results)
                setPagesize(topRated.data.total_results)
                console.log(content);
            }
        }));
        // https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}
        // https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&page=${page}
        // console.log(data)
        // setContent(data.results)
        // setPagesize(data.total_results)
    }

    const tabsChange =(key)=>{
        if (key ==='1') {
            setControl(true);
        }
        if (key ==='2') {
            setControl(false);
        }
        setPage(1);
      }
  
    useEffect(() => {
        fetchMovie()
        // eslint-disable-next-line
    }, [control,page])

    return (
        <div>
            <span className='pageTitle'>Movie & TV Show</span>
            <Tabs  centered size='large'  className='tabs' onChange={tabsChange}>
                    <TabPane tab="Trending" key="1" />
                    <TabPane tab="Top Rates" key="2" />
            </Tabs>
            <div className='movielist'>
                {content && content.map((c)=>
                <MovieItem 
                    key ={c.id}
                    id = {c.id} 
                    poster={c.poster_path} 
                    title = {c.title || c.name} 
                    date ={c.release_date || c.first_air_date}
                    type ={control? c.media_type: "movie"}
                    vote_average={c.vote_average}  
                />)}
            </div>
            <CustomPag setPage = {setPage} pageSize={pagesize}/>
        </div>
    )
}

export default MovieList
