import  React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../movieList/MovieList.less'
import '../pageset/maincontent/maincontent.less'
import CustomPag from '../CustomPag'
import { MovieItem } from '../movieList/MovieItem'
import Memorycontrol from '../../../api/Memorycontrol'
import './Like.less'
import { Switch } from 'antd';


const Like = () => {
    const [page, setPage] = useState(1)
    const [content, setContent] = useState([])
    const [pagesize, setPagesize] = useState(1)
    const [net, setNet] = useState(false)
    const [amz, setAmz] = useState(false)
    // const [arr, setArr] = useState([])

    const username = Memorycontrol.user.username
    const fetchMovie = () =>{
         axios.post('/mylike',{
            username: username,
        }
        ).then((response) => { 
            
            // console.log(response.data)
            // console.log(response.data.length)
            if (response.data !== 'wrong') {
                console.log('sccc');
                setContent(response.data)
                setPagesize(response.data.length)
            }else{
                console.log('loost');
            }
           
          })

        // console.log(data)
        // setContent(data.results)
        // setPagesize(data.total_results)
    }


    const fetchPrime = () =>{
         axios.post('/myPrime',{
            username: username,
        }
        ).then((response) => { 
            // console.log(response.data)
            setAmz(response.data.amazon)
            // console.log(typeof(response.data.netfilx));
            setNet(response.data.netfilx)
            // console.log(net);
          })
    }
    const changePrime =(value)=>{
        let tempNet=0;
        let tempAmz =0;
        if (value === 1) {
            tempNet=!net;
            tempAmz=amz
        } else if (value === 2) {
            tempNet=net;
            tempAmz=!amz
        } 

        axios
        .post('/prime', {
          netflix:tempNet,
          amazon:tempAmz,
          username:username,
        }
        ).then((response) => { 
          console.log(response.data)
          console.log(typeof(response.data))
        })
    }

    function onChangeNet(checked) {
        // console.log(`switch Netflix to ${checked} and net is ${net}`);
        if (checked !== net) {
            console.log('success');
            setNet(!net)
        }
        // console.log('Ok Netflix'+net);
        changePrime(1);
    }
    function onChangeAmz(checked) {
        // console.log(`switch Amazon to ${checked}and net is ${amz}`);
        if (checked !== amz) {
            // console.log('success');
            setAmz(checked)
        }
        console.log('Ok Amazon' + amz);
        changePrime(2);
    }
    
    useEffect(() => {
        fetchMovie()
        fetchPrime()
        // checkMyLike()
        // fetchOut()
        // console.log(content.length);
        // eslint-disable-next-line
    }, [page])
    return (
        <div>
            <span className='pageTitle'>Like</span>
            <div className='primedesign'>
                <h1>Netflix</h1>
                <Switch checked={net} onChange={onChangeNet} className='switch' />
                <h1>Amazon Prime</h1>
                <Switch checked={amz}  onChange={onChangeAmz} className='switch'/>
            </div>
            <div className='movielist'>
                {content.map((c)=>
                <MovieItem 
                    key ={c[0]}
                    id = {c[2]} 
                    poster={c[5]} 
                    title = {c[3]} 
                    date ={c[7]}
                    type ={c[4]}
                    vote_average={c[8]==="0"?0:c[8]}  
                />)}
            </div>
            <CustomPag setPage = {setPage} pageSize={pagesize}/>
            
        </div>
    )
}

export default Like
