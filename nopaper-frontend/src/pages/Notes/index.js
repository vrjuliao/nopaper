import React, { useState, useEffect } from 'react';
import { Avatar, Card, Button, Tag, Divider, Spin } from 'antd';
import { PlusOutlined, ArrowLeftOutlined, CopyOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css';

import Api from '../../modules/api';
import TopHeader from '../../components/TopHeader';

import "./styles.css";

const shadow = {
  WebkitBoxShadow: '10px 3px 74px 17px rgba(0,0,0,0.08)',
  MozBoxShadow: '10px 3px 74px 17px rgba(0,0,0,0.08)',
  boxShadow: '10px 3px 74px 17px rgba(0,0,0,0.08)'
}

function Notes(props){

  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    loadApiData();
  }, [])

  const loadApiData = async () => {
    setLoading(true);
    const currentNotebook = props.location.state.notebook;
    console.log(currentNotebook._id);
    try {
      const notess = await Api.getUserNotes(currentNotebook._id);
      setNotes(notess);
      setLoading(false);
    } catch (err) {
      console.log('Erro ao tentar encontrar as notas');
      setLoading(false);
    }
  }


  const notebook = {
    id: 10,
    name: 'vai passar pro matheus o tp de alg2',
    user: 'luizin',
    date: '22/05/2550',
    note: [
      'alooouasdasdsadasdas',
      'meeeu',
      'booom',
      'alooouasdasdsadasdas'
    ]
  }
  
  

  return(
    <div id='page-notes'>
      
      <TopHeader />

      <div style={{ backgroundColor: '#fff', marginLeft: '17.5%', width: '65%', height: '-webkit-calc(100% - 95px)', overflow: 'scroll', padding: 20, }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>

          <div style={{ alignItems: 'center', backgroundColor: '#2fa8d4', paddingLeft: 20, paddingRight: 40, paddingTop: 8, paddingBottom: 8, borderRadius: 5, cursor: 'pointer', display: 'flex' }}>
            <ArrowLeftOutlined style={{ fontSize: 15, color: 'white' }} />
            <span style={{ color: 'white', fontWeight: 'bold', marginLeft: 10 }}>Voltar</span>
          </div>

          <div style={{ alignItems: 'center', backgroundColor: '#2fa8d4', paddingLeft: 20, paddingRight: 40, paddingTop: 8, paddingBottom: 8, borderRadius: 5, cursor: 'pointer', display: 'flex' }}>
            <PlusOutlined style={{ fontSize: 15, color: 'white' }} />
            <span style={{ color: 'white', fontWeight: 'bold', marginLeft: 10 }}>Criar nota</span>
          </div>

        </div>

        <div style={{ display: 'flex', flex: 3, marginTop: 25 }}>

          <div style={{ textAlign: 'left', flex: 1,  padding: 20, display: 'flex', flexDirection: 'column' }}>
            
            <div style={{ alignContent: 'center', justifyContent: 'center', display: 'flex' }}>
              <Avatar style={{ backgroundColor: 'greenyellow', fontSize: 75, marginBottom: '20px'}} size={130}>L</Avatar>
            </div>
            
            <span style={{ fontSize: 20, fontWeight: 'bold', color: 'rgba(0,0,0,0.8)' }}>{notebook.name}</span>
            <span style={{ fontSize: 20, color: 'rgba(0,0,0,0.4)' }}>{notebook.user}</span>
            <span style={{ fontSize: 20, color: 'rgba(0,0,0,0.4)' }}>Criado em {notebook.date}</span>

            <div style={{ alignContent: 'center', justifyContent: 'space-around', display: 'flex', marginTop: 15 }} >
              <div style={{ padding: 8, border: '2px solid #2fa8d4', borderRadius: 50 }}>
                <Button 
                  style={{ border: '0px' }}
                  icon={<FormOutlined style={{ color: '#2fa8d4', fontSize: 20, marginTop: 4 }} />} 
                />
              </div>

              <div style={{ padding: 8, border: '2px solid #2fa8d4', borderRadius: 50 }}>
                <Button 
                  style={{ border: '0px' }}
                  icon={<CopyOutlined style={{ color: '#2fa8d4', fontSize: 20, marginTop: 4 }}/>} 
                />
              </div>

              <div style={{ padding: 8, border: '2px solid #ff584f', borderRadius: 50 }}>
                <Button 
                  style={{ border: '0px' }}
                  icon={<DeleteOutlined style={{ color: '#ff584f', fontSize: 20, marginTop: 4 }}/>} 
                />
              </div>
            </div>

          </div>

          <div style={{ flex: 2, paddingLeft: 20 }}>
            { loading ? <Spin size="large" /> :
              notes.map((note, index) => {
                return (
                  <div key={index} style={{ marginTop: index != 0 && 20, borderRadius: 6, padding: 7, paddingBottom: 15, ...shadow }}>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 15 }}>
                      <span style={{ fontSize: 18 }}>{note.title}</span>

                      <div style={{ alignContent: 'center', justifyContent: 'space-around', display: 'flex' }} >
                        <div style={{ padding: 0, border: '0px solid #2fa8d4' }}>
                          <Button 
                            style={{ border: '0px', backgroundColor: 'transparent' }}
                            icon={<FormOutlined style={{ color: '#2fa8d4', fontSize: 17, marginTop: 4 }} />} 
                          />
                        </div>

                        <div style={{ padding: 0, border: '0px solid #2fa8d4' }}>
                          <Button 
                            style={{ border: '0px', backgroundColor: 'transparent' }}
                            icon={<CopyOutlined style={{ color: '#2fa8d4', fontSize: 17, marginTop: 4 }}/>} 
                          />
                        </div>

                        <div style={{ padding: 0, border: '0px solid #ff584f' }}>
                          <Button 
                            style={{ border: '0px', backgroundColor: 'transparent' }}
                            icon={<DeleteOutlined style={{ color: '#ff584f', fontSize: 17, marginTop: 4 }}/>} 
                          />
                        </div>
                      </div>

                    </div>

                    <div style={{ width: '30%' , paddingLeft: 15 }}>
                      <Divider style={{ padding: 0, margin: 0, marginTop: 5, marginBottom: 5, height: 8 }} />
                    </div>

                    <div style={{ paddingLeft: 15, marginTop: 7 }}>
                      <Tag color="volcano">{note.createdAt}</Tag>
                    </div>

                  </div>
                );
              })
            }
          </div>

        </div>
      </div>
    </div>
  )
}

export default Notes;