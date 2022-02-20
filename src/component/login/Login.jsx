import {React,useEffect} from 'react';
import 'antd/dist/antd.css';
import './login.less';
import { Form, Input, Button,message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios'
import { Link,useNavigate  } from 'react-router-dom';
import Memorycontrol from '../../api/Memorycontrol';
import storageStore from '../../api/storageStore';
import CryptoJS from 'crypto-js';
import { keyPassword } from '../../config/config';

const keyHex = CryptoJS.enc.Utf8.parse(keyPassword);
const Login = () => { 
  const navigate = useNavigate();
  const user= Memorycontrol.user
  useEffect(() => {
    const isLogin=()=>{
      console.log(user)
      if (user.username!==undefined) {
        console.log('ddd')
        navigate('/')
      }
    }
    isLogin()
    // eslint-disable-next-line
  }, [])

  const encryptDES = (message) => {
    if (message) {
      let encrypted = CryptoJS.DES.encrypt(message, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
      return encrypted.ciphertext.toString();
    } else {
      return '';
    }
  };


  const onFinish = (values) => {
  axios
    .post('/login', {
      username: values['username'],
      password: values['password'],
      remember: true,
    }
    ).then((response) => { 
      console.log(response.data)
      console.log(typeof(response.data))
      if(response.data ===1){
        console.log("ddd")
        message.success('This is a success message');
        console.log(values);
        console.log(encryptDES(values['password']));
        values['password']=encryptDES(values['password'])
        console.log(values);
        Memorycontrol.user=values
        storageStore.saveUser(values)
          //remember才维持登录
        navigate('/')
      }
      if (response.data === 0){
        console.log("sss")
        message.error('This is an error message');
      }
      if (response.data === 2) {
        message.warning('This is a warning message');
      }
    })

    console.log('Success:', values);
  };


  return (
    

    <div className='login'>
      <header className='login-header'>
        <h1>Movie Finding</h1>
      </header>
      <section className='login-content'>
        <h2>User Login</h2>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder={user? user.username:"Username"} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder={user? user.password:"Password"}
            />
          </Form.Item>
          <Form.Item>
            {/* <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item> */}
            <Link to='/forget'>
            <a className="login-form-forgot" href="//">
              Forgot password
            </a>
            </Link>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" >
              Log in
            </Button>
            Or <Link to="/register">Register now</Link>
          </Form.Item>
        </Form> 
      </section>
    </div>
   
    );
};

export default Login;


