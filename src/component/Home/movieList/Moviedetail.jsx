import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {img_500,  log_pic,  unavailableLandscape} from '../../../config/config';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Button, Rate } from 'antd';
import './Moviedetail.less'
import {AiFillHeart,AiOutlineHeart} from 'react-icons/ai'
import Memorycontrol from '../../../api/Memorycontrol';
import Customcarousel from '../Carousel';
import ReactCountryFlag from "react-country-flag";
import { CheckOutlined } from '@ant-design/icons';



import { Select } from "antd";

const { Option } = Select;

const Moviedetail = () => {
    const [content, setContent] = useState([]);
    const [like, setLike] = useState(false)
    const [movieid, setMovieid] = useState()
    const [posterpath, setPosterpath] = useState()
    const [movietitle, setMovietitle] = useState()
    const [moviedate, setMoviedate] = useState()
    const [movievote, setMovievote] = useState()
    const [movietype, setMovieType] = useState("movie")
    const [provider, setProvider] = useState()
    const [regions, setRegions] = useState([])
    const [region, setRegion] = useState()
    const [first, setfirst] = useState()
    const [rate, setRate] = useState(0)
    const [net, setNet] = useState(false)
    const [amz, setAmz] = useState(false)


    const username = Memorycontrol.user.username

    const params = useParams();

    const fetchData = async () => {
        await axios.all([
            axios.get(`https://api.themoviedb.org/3/${params.type}/${params.id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`),
            axios.get(`https://api.themoviedb.org/3/${params.type}/${params.id}/watch/providers?api_key=${process.env.REACT_APP_API_KEY}`),
          ])
          .then(axios.spread(function (userResp, reposResp) {
            try{
                // console.log('User', userResp.data);
                // console.log('Repositories', reposResp.data);
                const data=Object.getOwnPropertyNames(reposResp.data.results);
                // console.log(data);
                // const index = reposResp.data.results[data[0].flatrate]
                // console.log(index);
                const fianlData =[];
                for (let index = 0; index < data.length; index++) {
                    // console.log(reposResp.data.results[data[index]]);
                    const keyValue = Object.getOwnPropertyNames(reposResp.data.results[data[index]])
                    // console.log("kkk",keyValue);
                    for (let a = 0; a < keyValue.length; a++) {
                        if (keyValue[a] === "flatrate") {
                            fianlData.push(data[index])
                        }
                    }
                }
                setRegions(fianlData)
                //Countries with streaming media
                setRegion(reposResp.data.results)
                //Data from API
                setContent(userResp.data);
                setMoviedate(userResp.data.release_date || userResp.data.first_air_date)
                setMovietitle(userResp.data.title||userResp.data.name)
                setMovievote(userResp.data.vote_average)
                setPosterpath(userResp.data.poster_path)
                }catch (error) {
                    console.error(error);
                }
            
        
          }));
        
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

     

      function handleChange(value) {
        // console.log(`selected ${value}`);
        setProvider(region[value].flatrate)
        setfirst(region[value])
      }

      function rateChange(value){
        // console.log(`selected ${value}`);
        setRate(value)
        // console.log(rate);
        axios
          .post('/myRate', {
            username: username,
            title:movietitle,
            rate:value
          }
          ).then((response) => { 
            // console.log(response.data)
            // console.log(typeof(response.data))
          })
      }
        

    const fetchLike=()=>{
        axios
        .post('/movielike', {
            Movietitle: params.title,
            Username: username
        }
        ).then((response) => { 
        //   console.log(response.data)
          const result = response.data
          const returnRate = parseFloat(response.data.rate)
        //   console.log(typeof(response.data))
        //   console.log(result['like']);
          
          if (result.like === true) {
              setLike(true)
          }else if (result.like === false) {
              setLike(false)
          }
          if (returnRate === 0) {
              setRate(0)
          }else{
              setRate(returnRate)
          }
        })
      }
      const fetchPrime = () =>{
        axios.post('/myPrime',{
           username: username,
       }
       ).then((response) => { 
        //    console.log(response.data)
           setAmz(response.data.amazon)
           // console.log(typeof(response.data.netfilx));
           setNet(response.data.netfilx)
    
         })
   }
    useEffect(() => {
        setMovieid(params.id)
        setMovieType(params.type)
        setMovietitle(params.title)
        fetchData();
        fetchLike();
        fetchPrime();
        

        // eslint-disable-next-line
      }, [like,rate]);
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
                        <h3>Original title:{content.original_title||content.original_name?content.original_title||content.original_name:(content.name || content.title)}</h3>
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
                                <div className='footer-left'>
                                    <Button icon={like? (<AiFillHeart style={{color:'red'}} />):<AiOutlineHeart />} type="primary" shape="circle" size='large' onClick={
                                        clickLike
                                    }></Button>
                                    {/* <a href={watchava}>a</a> */}
                                    <div className='footer-provider'>
                                        <h1>Provider</h1>
                                        
                                        <Select  style={{ width: 120 }} onChange={handleChange}>
                                        {regions.map((p) => (
                                        <Option key = {p} value={p}><ReactCountryFlag countryCode={p} svg style={{marginBottom: '3.5px'}}/> {p}</Option>
                                        ))}
                                        </Select>
                                        {
                                        provider? 
                                        (provider.map((pr)=>
                                        <p style={{textAlign:'center'}} key = {pr}><a href={first.link}>{pr.provider_name}{(pr.provider_name==='Netflix'&&net)||(pr.provider_name==='Amazon Prime Video'&&amz) ? (<CheckOutlined />):<></>}</a></p> 
                                        //  <h2 href={first.link}>{p.provider_name}</h2>
                                        ))
                                        :
                                        <h1>Not Found</h1>}
                                    </div>
                                <div className='footer-rate'>
                                    <h1>Rate</h1>
                                    <Rate allowHalf count={5} defaultValue={0} onChange={rateChange} disabled={!like} value={rate}/>
                                </div>                         
                                </div>
                                <Customcarousel />
                               
                            </div>

                            
                        </div>
                        
                        
                    </div>

                </div>
            )}
        </div>
     
    );
}

export default Moviedetail
