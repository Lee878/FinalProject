import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useParams } from 'react-router-dom';
import { img_300, noPicture } from '../../config/config';
import './Carousel.less'


const handleDragStart = (e) => e.preventDefault();   
const Customcarousel = () => {
    const params = useParams();
    const [credits, setCredits] = useState([])
    const items = credits.map((c) => (
        <div className="carouselItem">
          <img
            src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
            alt={c?.name}
            onDragStart={handleDragStart}
            className="carouselItem__img"
          />
          <b className="carouselItem__txt">{c?.name}</b>
        </div>
      ));
    
    const fetchCredits = async () => {
        const { data } = await axios.get(
        `https://api.themoviedb.org/3/${params.type}/${params.id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
        setCredits(data.cast);
        console.log(data);
    };
    const responsive = {
        0: {
          items: 3,
        },
        512: {
          items: 6,
        },
        1024: {
          items: 9,
        },
      };
  useEffect(() => {
    fetchCredits();
    // eslint-disable-next-line
  }, []);
    return (
        <AliceCarousel
            mouseTracking
            infinite
            disableDotsControls
            disableButtonsControls
            responsive={responsive}
            items={items}
            autoPlay
            
        />
      );
}

export default Customcarousel