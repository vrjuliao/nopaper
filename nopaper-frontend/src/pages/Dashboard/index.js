import React from 'react';
import { Avatar, Badge, Input } from 'antd';
import { StarOutlined, ArrowRightOutlined } from '@ant-design/icons';

const { Search } = Input;

const shadow = {
  WebkitBoxShadow: '10px 9px 52px -30px rgba(0,0,0,0.35)',
  MozBoxShadow: '10px 9px 52px -30px rgba(0,0,0,0.35)',
  boxShadow: '10px 9px 52px -30px rgba(0,0,0,0.35)'
}

function Dashboard(props) {
  return (
    <div style={{ height: '100vh' }}>
      
      <div style={{ backgroundColor: 'white', width: '100vw', height: 95, ...shadow, display: 'flex', flex: 3,  alignItems: 'center', padding: 20, position: 'relative', zIndex: 1 }}>
        <div style={{ flex: 2 }}>
          <img src={require('../../assets/icons/icon_long.jpeg')} style={{ width: 200, height: 40 }} />
          <Avatar style={{ backgroundColor: 'greenyellow', verticalAlign: 'middle', marginLeft: 40, fontSize: 30, marginBottom: 5 }} size={55}>L</Avatar>
          <span style={{ marginLeft: 20, fontWeight: 'bold', color: 'rgba(0,0,0,0.7)', fontSize: 23 }} >Luiz Felipe</span>
          <Badge style={{ marginLeft: 15, marginBottom: 5 }} count={'Você'} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ float: 'right', display: 'flex', alignItems: 'center' }}>
            <Search placeholder="Buscar usuário" onSearch={value => console.log(value)} />
            <div>
              <StarOutlined style={{ fontSize: 20, marginLeft: 20, border: '1px solid #ffbc05', padding: 10, borderRadius: 8, color: '#ffbc05', cursor: 'pointer' }} />
            </div>
            <div>
              <ArrowRightOutlined style={{ fontSize: 20, marginLeft: 10, border: '1px solid #ed2b58', padding: 10, borderRadius: 8, color: '#ed2b58', cursor: 'pointer' }} />
            </div>
          </div>
        </div>
      </div>

      <div style={{ alignItems: 'center', height: '-webkit-calc(100% - 95px)', position: 'relative' }} >
        <div style={{ backgroundColor: '#fff', marginLeft: '17.5%', width: '65%', height: '100%', padding: 60 }}>

          <div style={{ display: 'inline-flex', cursor: 'pointer' }}>
            <div style={{ width: 15, height: 145, backgroundColor: '#fedd0e', borderTopLeftRadius: 8.5 }}>
              <div style={{ marginTop: 137, width: 0, height: 0, borderLeft: '7.5px solid transparent', borderRight: '7.5px solid transparent', borderBottom: '8px solid white' }}></div>
            </div>
            <div style={{ width: 90, height: 125, backgroundColor: 'rgba(97,110,126,0.75)', padding: 10, borderBottomRightRadius: 8.5, borderTopRightRadius: 8.5 }}>
              <div style={{ backgroundColor: 'white', height: 15, marginTop: 7, borderRadius: 2 }}></div>
              <div style={{ backgroundColor: 'white', height: 5, marginTop: 10, borderRadius: 1 }}></div>
            </div>
          </div>
        
        </div>
      </div>

    </div>
  );
}

export default Dashboard;