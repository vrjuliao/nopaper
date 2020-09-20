import React, { useState, useEffect } from 'react';
import { Avatar, Card, Button, Tag } from 'antd';
import { PlusOutlined, ArrowLeftOutlined, CopyOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css';

import Api from '../../modules/api';

import "./styles.css";

function Notes(props){

  
  // const createNote = async () => {
  //   try {
  //     await Api.createNewNote(newNoteName);
  //     notification.success({
  //       description: 'Nota criada com sucesso!',
  //       message: 'Pronto!'
  //     });
  //     loadApiData();
  //   } catch (err) {
  //     notification.error({
  //       description: 'Erro ao criar nota.',
  //       message: 'Oopss...'
  //     });
  //   }
  // }

  // useEffect(() => {
  //   loadApiData();
  // }, [])

  const notebook = {
    id: 10,
    name: 'vai passar pro matheus o tp de alg2',
    user: 'luizin',
    date: '22/05/2550',
    note: [
      'alooouasdasdsadasdas',
      'meeeu',
      'booom'
    ]
  }
  

  return(
    <div id='page-notes'>
      <div className='board' style={{ backgroundColor: '#fff', marginLeft: '17.5%', width: '65%', height: '100%' }}>
        <div className='menu-container'>
          <Button 
            // style={}{ width: '100%', marginTop: '25px', borderRadius: 4, paddingTop: 10, paddingBottom: 30  }
            icon={<ArrowLeftOutlined />}
            style={{color: "#5b4fff", fontWeight: 'bold', borderColor: '#5b4fff'}}
            //htmlType="submit" 
            //className="login-form-button"
            //onClick={() => handleLogin()}
          >
            <span>Voltar</span>
          </Button>

          <p>Nome do Caderno</p>

          <Button 
            // style={}{ width: '100%', marginTop: '25px', borderRadius: 4, paddingTop: 10, paddingBottom: 30  }
            style={{color: "white", fontWeight: 'bold', borderColor: 'white', backgroundColor: '#5b4fff'}} 
            icon={<PlusOutlined />}
            // onClick={() => {
            //   createNote();
            // }}
            //htmlType="submit" 
            //className="login-form-button"
            //onClick={() => handleLogin()}
          >
            <span>Nova nota</span>
          </Button>
        </div>
        
        <div className="avatar-container">
          <Avatar style={{ backgroundColor: 'greenyellow', fontSize: 75, marginBottom: '20px'}} size={160}>L</Avatar>
          <span style={{marginBottom: '10px'}}>
            <Tag 
              color="#bfbfbf"
              style={{color: '#000000', borderRadius: '50px', fontWeight: 'bold'}}
            >
              {notebook.name}
            </Tag>
          </span>
          <span style={{marginBottom: '10px'}}>
            <Tag 
              color="#bfbfbf"
              style={{color: '#000000', borderRadius: '50px', fontWeight: 'bold'}}
            >{notebook.user}</Tag>
          </span>
          <span style={{marginBottom: '10px'}}>
            <Tag
              color="#bfbfbf"
              style={{color: '#000000', borderRadius: '50px', fontWeight: 'bold'}}
            >{notebook.date}</Tag>
          </span>
          <p>
            <Button 
              style={{borderColor: "lightgrey"}} 
              icon={<FormOutlined style={{ color: '#000000', fontSize: 30 }} />} 
            />
            <Button 
              style={{borderColor: "lightgrey"}}
              icon={<CopyOutlined style={{ color: '#7d7d7d', fontSize: 30 }}/>} 
            />
            <Button 
              style={{borderColor: "red"}}
              icon={<DeleteOutlined style={{ color: '#ff584f', fontSize: 30 }}/>} 
            />
          </p>
        </div>

        
        <div className="note-container">
          {notebook.note.map((string, i) => {
            return(
              <Card style={{ width: 450, marginTop: 16, marginLeft: 20, }}
                title={string}
                headStyle={{fontWeight: 'bold'}}
                bodyStyle={{fontWeight: 'bold'}}
                extra={
                  <div>
                    <Button
                      style={{borderColor: "lightgrey"}} 
                      icon={<FormOutlined style={{ color: '#000000', fontSize: 20}}/>} />
                    <Button
                      style={{borderColor: "lightgrey"}}
                      icon={<CopyOutlined style={{ color: '#7d7d7d', fontSize: 20}}/>} />
                    <Button 
                      style={{borderColor: "red"}}
                      icon={<DeleteOutlined style={{ color: '#ff584f', fontSize: 20 }}/>} />
                  </div>
                }
              >
                <span>
                  <Tag 
                    color="#bfbfbf"
                    style={{color: '#000000', borderRadius: '50px'}}
                  >
                    {notebook.date}
                  </Tag>
                </span>
              </Card>
            )
          })}
        </div>

      </div>
    </div>
  )
}

export default Notes;