import React,{useState,useEffect} from 'react'
import './search.less'
import { Input, message,Button } from 'antd';
import { Tabs } from 'antd';
import CustomPag from '../CustomPag';
import { MovieItem } from '../movieList/MovieItem';
import axios from 'axios';
import { SearchOutlined } from '@ant-design/icons';


const { TabPane } = Tabs;

const SearchMovie = () => {
    const [typemovie, setTypemovie] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [pagesize, setPagesize] = useState();
    const [length, setLength] = useState(1)

    const onSearch = async() => {
        try {
            const { data } = await axios.get(
              `https://api.themoviedb.org/3/search/${typemovie ? "tv" : "movie"}?api_key=${
                process.env.REACT_APP_API_KEY
              }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
            );
            setContent(data.results);
            setPagesize(data.total_results);
            setLength(data.results.length)
            console.log(data.results);
          } catch (error) {
            console.error(error);
          }
    };

    const tabsChange =(key)=>{
      if (key ==='1') {
        setTypemovie(false);
      }
      if (key ==='2') {
        setTypemovie(true);
      }
      setPage(1);
    }

    useEffect(() => {
        window.scroll(0, 0);
        onSearch()
        console.log("work:"+searchText+"  context "+content)
        // eslint-disable-next-line
      }, [typemovie, page]);

    return (
        <div className='searchmovie'>
            <span className='pageTitle'>Search</span>
            <div style={{ display:'flex'}} >
              <Input size="large" placeholder="Search" prefix={<SearchOutlined/>} className='searchinput' onChange={(e) => setSearchText(e.target.value)}/>
              <Button shape="circle" icon={<SearchOutlined />} size="large" style={{marginTop:'10px'}} onClick={onSearch}/>
            </div>
            <Tabs  centered size='large'  className='tabs' onChange={tabsChange}>
                    <TabPane tab="Movie" key="1" />
                    <TabPane tab="Tv Series" key="2" />
            </Tabs>
            <div className='movielist'>
                {content && content.map((c)=>
                <MovieItem 
                    key ={c.id}
                    id = {c.id} 
                    poster={c.poster_path} 
                    title = {c.title || c.name} 
                    date ={c.release_date || c.first_air_date}
                    type ={typemovie ? "tv" : "movie"}
                    vote_average={c.vote_average}  
                />)}
                {searchText && length===0 &&
                (typemovie? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
            </div>
            <CustomPag setPage = {setPage} pageSize={pagesize}/>
        </div>
    )
}

export default SearchMovie
