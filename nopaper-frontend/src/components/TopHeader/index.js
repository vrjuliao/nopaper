import React, { useState } from 'react';
import { Avatar, Badge, Input, Select, notification } from 'antd';
import { StarOutlined, ArrowRightOutlined } from '@ant-design/icons';
import Api from '../../modules/api';
import { useHistory } from "react-router-dom";

const { Search } = Input;

const shadow = {
  WebkitBoxShadow: '10px 9px 52px -30px rgba(0,0,0,0.35)',
  MozBoxShadow: '10px 9px 52px -30px rgba(0,0,0,0.35)',
  boxShadow: '10px 9px 52px -30px rgba(0,0,0,0.35)'
}

const TopHeader = (props) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState([]);

  const loadUserList = async () => {
    setLoading(true);
    try {
      const users = await Api.getUserList();
      setUserList(users);
      setLoading(false);
    } catch (err) {
      notification.error({
        description: 'Erro ao tentar encontrar usuários.',
        message: 'Oopss...'
      });
      setLoading(false);
    }
  }

  const onSelectUser = (value) => {
    console.log(value);
    history.replace({
      pathname: "/dashboard",
      state: { selectedUser: value }
    })
    history.go(0);
  }

  return (
    <div style={{ backgroundColor: 'white', width: '100vw', height: 95, ...shadow, display: 'flex', flex: 3,  alignItems: 'center', padding: 20, position: 'relative', zIndex: 1 }}>
      <div style={{ flex: 2 }}>
        <img src={require('../../assets/icons/icon_long.jpeg')} style={{ width: 200, height: 40 }} />
        <Avatar style={{ backgroundColor: 'greenyellow', verticalAlign: 'middle', marginLeft: 40, fontSize: 30, marginBottom: 5 }} size={55}>{props.username[0] || ''}</Avatar>
        <span style={{ marginLeft: 20, fontWeight: 'bold', color: 'rgba(0,0,0,0.7)', fontSize: 23 }} >{props.username}</span>
        <Badge style={{ marginLeft: 15, marginBottom: 5 }} count={'Você'} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ float: 'right', display: 'flex', alignItems: 'center' }}>
          
          
          {/* <Search placeholder="Buscar usuário" onSearch={value => console.log(value)} /> */}

          <Select onSelect={(value) => onSelectUser(value)} style={{ width: 200 }} placeholder={'Buscar usuário'} loading={loading} onFocus={() => loadUserList()} showArrow={false} showSearch>
            {
              userList.length > 0 && userList.map((user, index) => {
                return (
                  <Select.Option value={user._id} key={index}>
                    {user.username}
                  </Select.Option>
                );
              })
            }
          </Select>

          <div>
            <StarOutlined style={{ fontSize: 20, marginLeft: 20, border: '1px solid #ffbc05', padding: 10, borderRadius: 8, color: '#ffbc05', cursor: 'pointer' }} />
          </div>
          <div>
            <ArrowRightOutlined style={{ fontSize: 20, marginLeft: 10, border: '1px solid #ed2b58', padding: 10, borderRadius: 8, color: '#ed2b58', cursor: 'pointer' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopHeader;