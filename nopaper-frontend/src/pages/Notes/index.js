import React, { useState, useEffect } from 'react';
import { Avatar, Button, Tag, Divider, Spin, notification, Popover, Form, Input } from 'antd';
import { PlusOutlined, ArrowLeftOutlined, CopyOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css';
import { useHistory } from "react-router-dom";

import Api from '../../modules/api';
import TopHeader from '../../components/TopHeader';

import "./styles.css";

const shadow = {
  WebkitBoxShadow: '10px 3px 74px 17px rgba(0,0,0,0.08)',
  MozBoxShadow: '10px 3px 74px 17px rgba(0,0,0,0.08)',
  boxShadow: '10px 3px 74px 17px rgba(0,0,0,0.08)'
}

function Notes(props){
  const history = useHistory();
  const currentNotebook = props.location.state.notebook;
  const username = sessionStorage.getItem('username');
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const [newNotebookName, setNewNotebookName] = useState('');
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [notebookName, setNotebookName] = useState(currentNotebook.name);

  useEffect(() => {
    loadApiData();
  }, [])

  const loadApiData = async () => {
    setLoading(true);
    try {
      const notess = await Api.getUserNotes(currentNotebook._id);
      setNotes(notess);
      setLoading(false);
    } catch (err) {
      console.log('Erro ao tentar encontrar as notas');
      setLoading(false);
    }
  }

  const deleteNotebook = async () => {
    try {
      await Api.deleteNotebook(currentNotebook._id);
      history.push("/dashboard");
      notification.success({
        description: 'Notebook excluido com sucesso!',
        message: 'Pronto!'
      });
    } catch(err) {
      notification.error({
        description: 'Erro ao excluir notebook.',
        message: 'Oopss...'
      });
    }
  }

  const deleteNote = async (noteId) => {
    try {
      await Api.deleteNote(noteId, currentNotebook._id);
      loadApiData();
      notification.success({
        description: 'Nota excluido com sucesso!',
        message: 'Pronto!'
      });
    } catch(err) {
      notification.error({
        description: 'Erro ao excluir nota.',
        message: 'Oopss...'
      });
    }
  }

  const updateNotebookName = async () => {
    try {
      await Api.editNotebookName(currentNotebook._id, newNotebookName);
      loadApiData();
      notification.success({
        description: 'Nota editada com sucesso!',
        message: 'Pronto!'
      });
      setNotebookName(newNotebookName);
    } catch (err) {
      notification.error({
        description: 'Erro ao editar o nome',
        message: 'Oopss...'
      });
    }
  }

  const cloneNotebook = async () => {
    try {
      await Api.cloneNotebook(currentNotebook._id);
      notification.success({
        description: 'Nota editada com sucesso!',
        message: 'Pronto!'
      });
    } catch (err) {
      notification.error({
        description: 'Erro ao clonar o notebook',
        message: 'Oopss...'
      });
    }
  }

  return(
    <div id='page-notes'>
      
      <TopHeader username={username}/>

      <div style={{ backgroundColor: '#fff', marginLeft: '17.5%', width: '65%', height: '-webkit-calc(100% - 95px)', overflow: 'scroll', padding: 20, }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>

          <div onClick={() => history.goBack()} style={{ alignItems: 'center', backgroundColor: '#2fa8d4', paddingLeft: 20, paddingRight: 40, paddingTop: 8, paddingBottom: 8, borderRadius: 5, cursor: 'pointer', display: 'flex' }}>
            <ArrowLeftOutlined style={{ fontSize: 15, color: 'white' }} />
            <span style={{ color: 'white', fontWeight: 'bold', marginLeft: 10 }}>Voltar</span>
          </div>

          {
            props.location.state.allowed &&
            <div onClick={() => history.push({ pathname: "/markdown-editor", state: { currentNotebook }}) } style={{ alignItems: 'center', backgroundColor: '#2fa8d4', paddingLeft: 20, paddingRight: 40, paddingTop: 8, paddingBottom: 8, borderRadius: 5, cursor: 'pointer', display: 'flex' }}>
              <PlusOutlined style={{ fontSize: 15, color: 'white' }} />
              <span style={{ color: 'white', fontWeight: 'bold', marginLeft: 10 }}>Criar nota</span>
            </div>
          }

        </div>

        <div style={{ display: 'flex', flex: 3, marginTop: 25 }}>

          <div style={{ textAlign: 'left', flex: 1,  padding: 20, display: 'flex', flexDirection: 'column' }}>
            
            <div style={{ alignContent: 'center', justifyContent: 'center', display: 'flex' }}>
              <Avatar style={{ backgroundColor: 'greenyellow', fontSize: 75, marginBottom: '20px'}} size={130}>{currentNotebook.author && currentNotebook.author[0] || username[0]}</Avatar>
            </div>
            
            <span style={{ fontSize: 20, fontWeight: 'bold', color: 'rgba(0,0,0,0.8)' }}>{notebookName}</span>
            <span style={{ fontSize: 20, color: 'rgba(0,0,0,0.4)' }}>{ currentNotebook.author || username}</span>
            <span style={{ fontSize: 20, color: 'rgba(0,0,0,0.4)' }}>Criado em {currentNotebook.createdAt}</span>

            <div style={{ alignContent: 'center', justifyContent: 'space-around', display: 'flex', marginTop: 15 }} >
            
            { props.location.state.allowed &&
              <Popover
                  title='Editar nome do Caderno'
                  trigger='click'
                  placement='top'
                  visible={popoverVisible}
                  onVisibleChange={visible => setPopoverVisible(visible)}
                  content={
                    <>
                    <Form layout="vertical" className="user-modal-form" style={{ width: 200 }}>
                      <Form.Item label={<span style={{ fontWeight: 'bold' }}>Nome do Caderno</span>}>
                        <Input 
                          placeholder={'Escreva aqui'}
                          onChange={(value) => setNewNotebookName(value.target.value)}
                          value={newNotebookName}
                          style={{ width: 200 }}
                        />
                      </Form.Item>
                      <Form.Item>
                        <Button type='primary' style={{ width: 200 }} onClick={() => {
                            setPopoverVisible(false);
                            updateNotebookName();
                            setNewNotebookName('');
                          }}>
                          Editar Caderno
                        </Button>
                      </Form.Item>
                    </Form>
                    </>
                  }
                >
                  <div style={{ padding: 8, border: '2px solid #2fa8d4', borderRadius: 50 }}>
                    <Button 
                      style={{ border: '0px' }}
                      icon={<FormOutlined style={{ color: '#2fa8d4', fontSize: 20, marginTop: 4 }} />} 
                    />
                  </div>
                </Popover>
              }

              { !props.location.state.allowed &&
                <div onClick={() => cloneNotebook()} style={{ padding: 8, border: '2px solid #2fa8d4', borderRadius: 50 }}>
                  <Button 
                    style={{ border: '0px' }}
                    icon={<CopyOutlined style={{ color: '#2fa8d4', fontSize: 20, marginTop: 4 }}/>} 
                  />
                </div>
              }
              
              { props.location.state.allowed && 
                <div onClick={() => deleteNotebook()} style={{ padding: 8, border: '2px solid #ff584f', borderRadius: 50 }}>
                  <Button 
                    style={{ border: '0px' }}
                    icon={<DeleteOutlined style={{ color: '#ff584f', fontSize: 20, marginTop: 4 }}/>} 
                  />
                </div>
              }
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
                        
                        
                        { props.location.state.allowed && 
                          <div onClick={() => history.push({
                            pathname: '/markdown-editor',
                            state: { note, currentNotebook }
                          })} style={{ padding: 0, border: '0px solid #2fa8d4' }}>
                            <Button 
                              style={{ border: '0px', backgroundColor: 'transparent' }}
                              icon={<FormOutlined style={{ color: '#2fa8d4', fontSize: 17, marginTop: 4 }} />} 
                            />
                          </div>
                        }
                        
                        
                        { !props.location.state.allowed &&
                          <div style={{ padding: 0, border: '0px solid #2fa8d4' }}>
                            <Button 
                              style={{ border: '0px', backgroundColor: 'transparent' }}
                              icon={<CopyOutlined style={{ color: '#2fa8d4', fontSize: 17, marginTop: 4 }}/>} 
                            />
                          </div>
                        }

                        { props.location.state.allowed && 
                          <div onClick={() => deleteNote(note._id)} style={{ padding: 0, border: '0px solid #ff584f' }}>
                            <Button
                              style={{ border: '0px', backgroundColor: 'transparent' }}
                              icon={<DeleteOutlined style={{ color: '#ff584f', fontSize: 17, marginTop: 4 }}/>} 
                            />
                          </div>
                        }
                        
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