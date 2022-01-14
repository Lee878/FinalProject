import {React,useEffect} from 'react';
import Memorycontrol from '../../api/Memorycontrol';
import { useNavigate, Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import Headertitle from './pageset/headtitle';
import './pageset/maincontent/maincontent.less'



const { Content } = Layout;
function Home() {
  const user = Memorycontrol.user
  const navigate = useNavigate();
  
  useEffect(() => {
    const isLogin=()=>{
      console.log(user)
      if (user.username===undefined) {
        console.log('ddd')
        navigate('/login')
      }else{
        navigate('movie')
      }
    }
    isLogin()
    // eslint-disable-next-line
  }, [])
  
return(
    <Layout style={{height:'100%'}}>
    <Layout>
      <Headertitle>Header</Headertitle>
      <Content className='maincontent'>
        <Outlet />
      </Content>
    </Layout>
    </Layout>
);
}
export default Home;