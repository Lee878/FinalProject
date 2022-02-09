import React from 'react'
import {img_300, unavailable} from '../../../config/config'
import './MovieItem.less'
import { Badge } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export const MovieItem = ({
    id,
    poster ,
    title  ,
    date ,
    type ,
    vote_average ,
}) => {
    return (
        <Link to={`/movie/${id}/${type}/${title}`} className='media'>
            <Badge count={vote_average? (vote_average): (<ClockCircleOutlined style={{ color: '#f5222d' }} />)} color={vote_average >=7.5 ? 'red' : 'yellow'}>
            <img className='poster' src={poster ? `${img_300}/${poster}`: unavailable} alt={title} />
            </Badge>
            <b className='title'>{title}</b>
            <span className='subTitle'>
                {type==='tv' ? "TV Series" : "Movie"}
                <span className='subTitle'>{date}</span>
            </span>
        </Link>
    )
}
