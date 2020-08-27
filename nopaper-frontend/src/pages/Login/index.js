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
        {/* <img src='https://i.vimeocdn.com/portrait/25736037_300x300' width='80px' alt="Logo"/> */}
        <div className="text-container">
          <span className="title" >{'Nopaper.'}</span>
          <p style={{ color: 'white', fontSize: 40,  }}>Cadernos colaborativos</p>
        </div>
      </div>
      
      <div className="card">
        <Card 
          style={{ width:"80%", maxWidth: '450px', borderRadius: 8 }} 
          bordered={false} 
        >
          <div style={{ textAlign: 'center' }}>
            <span style={{ color: '#0cca9a', fontWeight: 'bold', fontSize: 25 }}>Faça seu Login</span>
          </div>
          <div style={{ display: 'flex', flex: 1, width: '100%',  justifyContent: 'center', padding: 25, paddingTop: 10 }}>
            <div style={{ width: 60, height: 7, backgroundColor: '#0cca9a', borderRadius: 12 }}></div>
          </div>
          <Form onFinish={handleLogin} style={{marginTop: '15px'}}>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Insira seu melhor email!',
                },
              ]}
            >
              <Input 
                size='large'
                prefix={<MailOutlined style={{ marginRight: 10, color: '#0cca9a' }} className="site-form-item-icon" />} 
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
                  message: 'Coloque sua senha!',
                },
              ]}
            >
              <Input.Password
                size='large' 
                prefix={<KeyOutlined style={{ marginRight: 10, color: '#0cca9a' }} className="site-form-item-icon" />} 
                placeholder="Senha"
                type="password"
              />
            </Form.Item>

            <Form.Item>
              <Button 
                style={{ width: '100%', marginTop: '25px', borderRadius: 4, paddingTop: 10, paddingBottom: 30  }}
                type="primary" 
                htmlType="submit" 
                className="login-form-button"
              >
                <span style={{  }}>ENTRAR</span>
              </Button>
              <p style={{marginTop: '10px', textAlign: 'center', color: 'rgba(0,0,0,0.6)'}}>
                Não tem uma conta? <a href="" style={{ color: '#0cca9a'}}>Registre-se!</a>
              </p>
            </Form.Item>
          </Form>
        </Card>
      </div>
    
    </div>
  );
}

export default Login;