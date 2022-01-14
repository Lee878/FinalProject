import React from 'react'
import './index.less'
import { Link } from 'react-router-dom'
import { Menu } from 'antd';
import {SearchOutlined,DesktopOutlined,HeartOutlined,} from '@ant-design/icons';

const Leftnav = () => {
    return (
        <div className='left-nav'>
            <Link to='/' className='left-nav-header'>
                <h1>Home</h1>
            </Link>
            <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            theme="dark"
            >
          <Menu.Item key="1" icon={<SearchOutlined />}>
            <Link to='/search'>
              Search
            </Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            <Link to = '/movie'>
              Movie
            </Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<HeartOutlined />}>
            <Link to='/like'>
              Likes
            </Link>
          </Menu.Item>
        </Menu>
        </div>
    )
}

export default Leftnav
