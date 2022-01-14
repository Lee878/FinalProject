import React, {  } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Memorycontrol from '../../../../api/Memorycontrol'
import { Modal,Button,Menu} from 'antd';
import { ExclamationCircleOutlined,SearchOutlined,DesktopOutlined,HeartOutlined } from '@ant-design/icons';
import './index.less'
import storageStore from '../../../../api/storageStore';
const Headertitle = () => {
    // const [title, setTitle] = useState('')
    // const menuList = [
    //     {
    //         title:'Search',
    //         key:'/search',
    //     },
    //     {
    //         title:'Likes',
    //         key:'/like',
    //     },
    //     {
    //         title:'Movie',
    //         key:'/movie',
    //     },

    // ]
    const { confirm } = Modal;
    const navigate = useNavigate()
    const logOut =()=>{
        confirm({
            title: 'Do you Want to delete these items?',
            icon: <ExclamationCircleOutlined />,
            content: 'Some descriptions',
            onOk() {
                Memorycontrol.user={}
                storageStore.removeUser()
                navigate('/login')
            },
            onCancel() {
              console.log('Cancel');
            },
          });
    }
    // const location = useLocation().pathname
    // useEffect(() => {
    //     const getTitle =()=>{
    //         menuList.forEach(item =>{
    //             if (item.key === location){
    //                 setTitle(item.title)
    //             }
    //         })
    //     }
    //     getTitle()
    //     // eslint-disable-next-line
    // }, [location])
    const username = Memorycontrol.user.username



    return (
        <div className='header'>
            <Link to ='/movie' className='header-left'>
                <h1>Movie</h1>
            </Link>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} className='header-middle'>
                <Menu.Item key="1" icon={<SearchOutlined />}>
                    <Link to='/searchmovie'>
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
            <div className='header-top'>
                <span>Welocom {username}</span>
                <Button type='link' onClick={logOut}>log out</Button>
            </div>
        </div>
    )
}

export default Headertitle
