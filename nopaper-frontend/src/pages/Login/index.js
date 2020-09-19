import React,{useRef, useEffect} from 'react';
import { Card, Carousel } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

import './styles.css';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function Login(props) {

  const slider = useRef();

  useEffect(() => {
    sessionStorage.removeItem('token');
  }, [])

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
          <Carousel dots={false} ref={ref => {
            console.log(ref);
            slider.current = ref;
          }}>

            <LoginForm onClickRegister = { () => slider.current.next()} />
            <RegisterForm onClickLogin = { () => slider.current.prev()} />

              
            
            {/* <LoginForm />
            <RegisterForm />   */}
          </Carousel>
        

        </Card>
      </div>
    
    </div>
  );
}

export default Login;