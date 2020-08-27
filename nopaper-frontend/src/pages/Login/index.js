import React,{useState} from 'react';
import { Card, Form, Input, Button } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { KeyOutlined, MailOutlined } from '@ant-design/icons'

import './styles.css';



function Login(props) {

  function handleLogin(e){
    e.preventDefault();
    alert("Login realizado com sucesso!");
  };

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  return (
    <div id='page-login' >
      <div className="logo-container">
        <img src='https://i.vimeocdn.com/portrait/25736037_300x300' width='80px' alt="Logo"/>
        <h1>Seus cadernos colaborativos</h1>
      </div>
      
      <div className="card">
        <Card 
          style={{width:"80%", maxWidth: '450px'}} 
          bordered={false} 
        >
          <Form onFinish={handleLogin} style={{marginTop: '15px'}}>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your Email!',
                },
              ]}
            >
              <Input 
                size='large'
                prefix={<MailOutlined className="site-form-item-icon" />} 
                placeholder="Seu melhor e-mail"
                type='email'
              />
            </Form.Item>

            <Form.Item
              style={{marginTop: '25px'}}
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password
                size='large' 
                prefix={<KeyOutlined className="site-form-item-icon" />} 
                placeholder="Senha"
                type="password"
              />
            </Form.Item>

            <Form.Item>
              <Button 
                style={{width: '100%', marginTop: '25px'}}
                type="primary" 
                htmlType="submit" 
                className="login-form-button"
              >
                Log in
              </Button>
              <p style={{marginTop: '10px', textAlign: 'center'}}>
                Não tem uma conta? <a href="">Registre-se!</a>
              </p>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default Login;