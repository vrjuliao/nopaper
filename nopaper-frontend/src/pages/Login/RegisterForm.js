import React,{useState} from 'react';
import { Form, Input, Button } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { KeyOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'

import './styles.css';
import Api from '../../modules/api';


function RegisterForm(props) {

  const [ name, setName ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleRegister = async () => {
    try {
      await Api.register(name, username, email, password);
      alert("Cadastro bem sucedido!!");
    } catch (error) {
      alert("Dados faltando ou incorretos");
    }
  };

  return (
    <div>
        <div style={{ textAlign: 'center' }}>
            <span style={{ color: '#0cca9a', fontWeight: 'bold', fontSize: 25 }}>Cadastre-se</span>
        </div>
        <div style={{ display: 'flex', flex: 1, width: '100%',  justifyContent: 'center', padding: 25, paddingTop: 10 }}>
            <div style={{ width: 60, height: 7, backgroundColor: '#0cca9a', borderRadius: 12 }}></div>
        </div>
        <Form style={{marginTop: '15px'}}>
        <Form.Item
            name="name"
            rules={[
            {
                required: true,
                message: 'Insira seu nome aqui!',
            },
            ]}
        >
            <Input 
            size='large'
            prefix={<UserOutlined style={{ marginRight: 10, color: '#0cca9a' }} className="site-form-item-icon" />} 
            placeholder="Seu nome"
            type='text'
            value={name}
            onChange={(value) => setName(value.target.value)}
            />
        </Form.Item>

        <Form.Item
            name="username"
            rules={[
            {
                required: true,
                message: 'Insira um belo username.',
            },
            ]}
        >
            <Input 
            size='large'
            prefix={<UserOutlined style={{ marginRight: 10, color: '#0cca9a' }} className="site-form-item-icon" />} 
            placeholder="Seu username"
            type='text'
            value={username}
            onChange={(value) => setUsername(value.target.value)}
            />
        </Form.Item>

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
            value={email}
            onChange={(value) => setEmail(value.target.value)}
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
            value={password}
            onChange={(value) => setPassword(value.target.value)}
            />
        </Form.Item>

        <Form.Item>
          <Button 
            style={{ width: '100%', marginTop: '25px', borderRadius: 4, paddingTop: 10, paddingBottom: 30  }}
            type="primary" 
            htmlType="submit" 
            className="register-form-button"
            onClick={() => handleRegister()}
            >
            <span style={{  }}>CADASTRAR</span>
          </Button>
            <p style={{marginTop: '10px', textAlign: 'center', color: 'rgba(0,0,0,0.6)'}}>
              Já possui uma conta?
              <span onClick={props.onClickLogin} style={{ color: '#0cca9a', cursor: 'pointer'}}> Faça Login!</span>
            </p>
        </Form.Item>
        </Form>    
    </div>
  );
}

export default RegisterForm;