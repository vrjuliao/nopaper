import React, { useState, useEffect } from 'react';
import { Input, Row, Col, Popover, Form, Button, Spin, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { notebooks as testNotebooks, colors } from './testData';
import './styles.css';
import TopHeader from '../../components/TopHeader';
import Api from '../../modules/api';
import { useHistory } from "react-router-dom";

const { Search } = Input;

const shadow = {
  WebkitBoxShadow: '10px 9px 52px -30px rgba(0,0,0,0.35)',
  MozBoxShadow: '10px 9px 52px -30px rgba(0,0,0,0.35)',
  boxShadow: '10px 9px 52px -30px rgba(0,0,0,0.35)'
}

function Dashboard(props) {

  const history = useHistory();
  const username = sessionStorage.getItem('username');
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [newNotebookName, setNewNotebookName] = useState('');
  const [loading, setLoading] = useState(false);
  const [notebooks, setNotebooks] = useState([]);
  const [allowed, setAllowed] = useState(true);

  useEffect(() => {
    const selectedUser = props.location.state && props.location.state.selectedUser;
    if (selectedUser) {
      setAllowed(false);
      loadOtherUserApi();
    } else {
      loadApiData();
    }
  }, [])

  const loadApiData = async () => {
    setLoading(true);
    try {
      const notebooks = await Api.getUserNotebooks();
      setNotebooks(notebooks);
      setLoading(false);
    } catch (err) {
      console.log('Erro ao tentar encontrar os notebooks');
      setLoading(false);
    }
  }

  const loadOtherUserApi = async () => {
    setLoading(true);
    try {
      const notebooks = await Api.getOtherUserNotebooks(props.location.state.selectedUser);
      console.log(notebooks);
      setNotebooks(notebooks);
      setLoading(false);
    } catch (err) {
      console.log('Erro ao tentar encontrar os notebooks');
      setLoading(false);
    }
  }

  const createNotebook = async () => {
    try {
      await Api.createNewNotebook(newNotebookName);
      notification.success({
        description: 'Notebook criado com sucesso!',
        message: 'Pronto!'
      });
      loadApiData();
    } catch (err) {
      notification.error({
        description: 'Erro ao criar notebook.',
        message: 'Oopss...'
      });
    }
  }

  return (
    <div style={{ height: '100vh' }}>
      
      <TopHeader username={username}/>

      <div style={{ alignItems: 'center', height: '-webkit-calc(100% - 95px)', position: 'relative' }} >
        <div style={{ backgroundColor: '#fff', marginLeft: '17.5%', width: '65%', height: '100%', padding: 60, overflow: 'scroll' }}>

        {
          loading ? <Spin size="large" /> :
          <Row gutter={[16, 32]}>
            {
              notebooks && notebooks.map((notebook, index) => {
                return (
                  <Col key={index} span={8} style={{ }}>
                    <div style={{ display: 'inline-flex', cursor: 'pointer' }} 
                    onClick={() => history.push({
                        pathname: '/notes',
                        state: { notebook }
                      }) }>
                      <div style={{ width: 15, height: 145, backgroundColor: colors[index % (colors.length)], borderTopLeftRadius: 8.5 }}>
                        <div style={{ marginTop: 137, width: 0, height: 0, borderLeft: '7.5px solid transparent', borderRight: '7.5px solid transparent', borderBottom: '8px solid white' }}></div>
                      </div>
                      <div style={{ width: 90, height: 125, backgroundColor: 'rgba(97,110,126,0.75)', padding: 10, borderBottomRightRadius: 8.5, borderTopRightRadius: 8.5 }}>
                        <div style={{ backgroundColor: 'white', height: 15, marginTop: 7, borderRadius: 2 }}></div>
                        <div style={{ backgroundColor: 'white', height: 5, marginTop: 10, borderRadius: 1 }}></div>
                      </div>
                      <div style={{ paddingLeft: 10, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', height: 125, width: 120 }}>
                        <span style={{ fontSize: 18, fontWeight: 'bold', color: 'rgba(0,0,0,0.7)', overflow: 'hidden', display: 'inline-block', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', textOverflow: 'ellipsis' }}>{notebook.name}</span>
                        <p style={{ fontSize: 12, color: 'rgba(0,0,0,0.4)', marginTop: 30 }}>Criado por<br/>{notebook.author || username }<br/>{notebook.createdAt}</p>
                      </div>
                    </div>
                  </Col>
                );
              })
            }
          </Row>
        }

        {
          allowed &&
          <Popover
            title='Adicionar Caderno'
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
                      createNotebook();
                      setNewNotebookName('');
                    }}>
                    Adicionar Novo Caderno
                  </Button>
                </Form.Item>
              </Form>
              </>
            }
          
          >
            <div style={{ position: 'absolute', bottom: '5%', right: '2%', backgroundColor: '#2fa8d4', paddingLeft: 30, paddingRight: 40, paddingTop: 15, paddingBottom: 15, borderRadius: 30, cursor: 'pointer', display: 'flex' }}>
              <PlusOutlined style={{ fontSize: 22, color: 'white' }} />
              <span style={{ color: 'white', fontWeight: 'bold', marginLeft: 10 }}>Adicionar Novo Caderno</span>
            </div>
          </Popover>  
        }
        
        </div>
      </div>

    </div>
  );
}

export default Dashboard;