import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {img_500,  log_pic,  unavailableLandscape} from '../../../config/config';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Button } from 'antd';
import './Moviedetail.less'
import {AiFillHeart,AiOutlineHeart} from 'react-icons/ai'
import Memorycontrol from '../../../api/Memorycontrol';

const Moviedetail = () => {
    const [content, setContent] = useState([]);
    const [like, setLike] = useState(false)
    const [movieid, setMovieid] = useState()
    const [posterpath, setPosterpath] = useState()
    const [movietitle, setMovietitle] = useState()
    const [moviedate, setMoviedate] = useState()
    const [movievote, setMovievote] = useState()
    const [movietype, setMovieType] = useState()

    const username = Memorycontrol.user.username

    const params = useParams();
    const fetchData = async () => {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/${params.type}/${params.id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
    
        setContent(data);
        setMoviedate(data.release_date || data.first_air_date)
        setMovietitle(data.title||data.name)
        setMovievote(data.vote_average)
        setPosterpath(data.poster_path)
        
      };
    
      const clickLike =()=>{
          setLike(!like)
          console.log(like)
          axios
          .post('/like', {
            username: username,
            MovieId: movieid,
            Like: !like,
            Type: movietype,
            title:movietitle,
            date:moviedate,
            poster:posterpath,
            vote:movievote
          }
          ).then((response) => { 
            console.log(response.data)
            console.log(typeof(response.data))
          })
      
      }
      const fetchLike=()=>{
        axios
        .post('/movielike', {
            MovieId: params.id,
        }
        ).then((response) => { 
          console.log(response.data)
          const result = response.data
          if (result === 'True') {
              setLike(true)
          }else if (result === 'False') {
              setLike(false)
          }
        })
      }
    useEffect(() => {
        console.log('ddd')
        setMovieid(params.id)
        setMovieType(params.type)
        fetchData();
        fetchLike();
        // eslint-disable-next-line
      }, [like]);
    return (
        <div>
            {content&&(
                <div className='moviedetail'>        
                    <div className='title'>
                        <span>{content.name || content.title} ({(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )</span>
                        <h3>Original title:{content.original_title?content.original_title:(content.name || content.title)}</h3>
                    </div>
                    
                    <div className='moviedeatial-maincontent'>
                        <div className='picture-control'>
                            <img src={
                            content.poster_path
                        ? `${img_500}/${content.poster_path}`
                        : unavailableLandscape} alt={content.name || content.title} className='picture'/>
                        </div>
                        <div className='moviedetail-control'>
                            <div className='maincontent-detail'>
                                <div className='company'>
                                    <h3>Product Commpany</h3>
                                    {content.production_companies && content.production_companies.map((c)=>
                                        <div className='company-logo'>
                                            {c.logo_path?(<img src={ `${log_pic}${c.logo_path}`} alt={c.name||c.title}/>):(<h4>{c.name}</h4>)}
                                            
                                        </div>
                                    )}
                                </div>
                                <div className='genres-control'>
                                    <h3>genres</h3>
                                    {content.genres && content.genres.map((c)=>
                                        <div className='genres-detail'>
                                            <span>{c.name}</span>
                                        </div>
                                    )}
                                </div>
                                <div className='vote-control'>
                                    <h3>vote</h3>
                                    <CircularProgressbar value={content.vote_average} maxValue={10} text={`${content.vote_average * 10}%`} />
                                </div>
                                
                            </div>
                            <div className='maincontent-overview'>
                                <span>{content.overview}</span>
                            </div>
                            <div className='footer'>
                                <Button icon={like? (<AiFillHeart style={{color:'red'}} />):<AiOutlineHeart />} type="primary" shape="circle" size='large' onClick={
                                    clickLike
                                }></Button>     
                            </div>

                            
                        </div>
                        
                        
                    </div>

                </div>
            )}
        </div>
     
    );
}

export default Moviedetail
