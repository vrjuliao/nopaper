import React,{useState} from 'react';
import { Form, Input, Button } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { KeyOutlined, MailOutlined } from '@ant-design/icons'
import Api from '../../modules/api';
import { useHistory } from "react-router-dom";


function LoginForm(props) {
  const history = useHistory();
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleLogin = async () => {
    try {
      const res = await Api.login(email, password);
      
      sessionStorage.setItem('token', res.token);
      sessionStorage.setItem('username', res.data.name);
      
      history.push('/dashboard');

    } catch (error) {
      alert("Email ou senha incorretos");
    }
  };

  return(
    <div>
      <div style={{ textAlign: 'center' }}>
        <span style={{ color: '#0cca9a', fontWeight: 'bold', fontSize: 25 }}>Faça seu Login</span>
      </div>
      <div style={{ display: 'flex', flex: 1, width: '100%',  justifyContent: 'center', padding: 25, paddingTop: 10 }}>
        <div style={{ width: 60, height: 7, backgroundColor: '#0cca9a', borderRadius: 12 }}></div>
      </div>
      <Form style={{marginTop: '15px'}}>
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
            className="login-form-button"
            onClick={() => handleLogin()}
          >
            <span style={{  }}>ENTRAR</span>
            </Button>
              <p style={{marginTop: '10px', textAlign: 'center', color: 'rgba(0,0,0,0.6)'}}>
                Não tem uma conta?
                <span onClick={props.onClickRegister} style={{ color: '#0cca9a', cursor: 'pointer'}}> Registre-se!</span>
              </p>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginForm;