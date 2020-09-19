import React,{useRef} from 'react';
import { Form, Card, Button } from 'antd';
import { PlusOutlined, ArrowLeftOutlined, CopyOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css';

import Api from '../../modules/api';

import "./styles.css";

function Notes(props){
  return(
    <div id='page-notes'>
      <div className='menu-container'>
        <Button 
          // style={}{ width: '100%', marginTop: '25px', borderRadius: 4, paddingTop: 10, paddingBottom: 30  }
          type="primary" 
          icon={<ArrowLeftOutlined />}
          //htmlType="submit" 
          //className="login-form-button"
          //onClick={() => handleLogin()}
        >
          <span>Voltar</span>
        </Button>

        <p>Nome da nota</p>

        <Button 
          // style={}{ width: '100%', marginTop: '25px', borderRadius: 4, paddingTop: 10, paddingBottom: 30  }
          type="primary" 
          icon={<PlusOutlined />}
          //htmlType="submit" 
          //className="login-form-button"
          //onClick={() => handleLogin()}
        >
          <span>Nova nota</span>
        </Button>
      </div>
      <div className="note-container">
        <Card style={{ width: 300, marginTop: 16, marginLeft: 20}}
          title="Card title"
          extra={
            <div>
              <Button icon={<FormOutlined />} />
              <Button icon={<CopyOutlined />} />
              <Button icon={<DeleteOutlined />} />
            </div>
          }
        >
          <span>bla bla</span>
          <span>bla bla</span>
        </Card>
      </div>
    </div>
  )
}

export default Notes;