import React from 'react';
import 'antd/dist/antd.css';
import './register.less';
import axios from 'axios';
import {Form,Input,Button,message} from 'antd';
import { Link,useNavigate } from 'react-router-dom';
import Encrytion from '../../api/Encrytion';
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 9,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Register = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    values['password']=Encrytion.encryptDES(values['password'])
    axios
    .post('/register', {
      username: values['username'],
      password: values['password'],
      email: values['email']
    }
    ).then((response) => { 
      console.log(response.data);
      if(response.data ===1){
        console.log("ddd")
        message.success('This is a success message');
        navigate('/login')
      }
      if (response.data === 0){
        console.log("sss")
        message.error('This is an error message');
      }
      if (response.data ===2) {
        message.warn('Duplicate username')
      }
    })

    console.log('Success:', values);
  };

  return (
    <div className='register'>
      <header className='register-header'>
        <h1>Finding</h1>
      </header>
      <section className='register-content'>
        <h2>Register Now</h2>
        <Form
          {...formItemLayout}
           form={form}
          name="register"
          onFinish={onFinish}
        >
        <Form.Item
          name="email"
          label={<label style={{ color: "white" }}>E-mail</label>}
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label={<label style={{ color: "white"}}>Password</label>}
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label={<label style={{ color: "white" }}>Confirm Password</label>}
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="username"
          label={<label style={{ color: "white" }}>Username</label>}
          tooltip="login in name"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" >
            Register
          </Button>
          <p> </p>
            Or <Link to='/login'> Login</Link>
        </Form.Item>
      </Form> 
      </section>

    </div>
    
  );
};

export default Register
