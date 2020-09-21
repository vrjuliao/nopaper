import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Avatar, Button, Tag, Divider, Spin, notification, Popover, Form, Input, Select } from 'antd';
import { PlusOutlined, ArrowLeftOutlined, CopyOutlined, DeleteOutlined, FormOutlined, EditOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css';
import { useHistory } from "react-router-dom";
import MarkdownIt from 'markdown-it';

import Api from '../../modules/api';
import TopHeader from '../../components/TopHeader';

const shadow = {
  WebkitBoxShadow: '10px 3px 74px 17px rgba(0,0,0,0.08)',
  MozBoxShadow: '10px 3px 74px 17px rgba(0,0,0,0.08)',
  boxShadow: '10px 3px 74px 17px rgba(0,0,0,0.08)'
}

const mdParser = new MarkdownIt();

function Preview(props){
  const history = useHistory();
  const username = sessionStorage.getItem('username');
  const note = props.location.state.note;

  return(
    <div id='page-notes'>
      
      <TopHeader username={props.location.state.allowed ? username : props.location.state.selectedUserName } notCurrentUser={!props.location.state.allowed}/>

      <div style={{ backgroundColor: '#fff', marginLeft: '17.5%', width: '65%', height: '-webkit-calc(100% - 95px)', overflow: 'scroll', padding: 20, }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>

          <div onClick={() => history.goBack()} style={{ alignItems: 'center', backgroundColor: '#2fa8d4', paddingLeft: 20, paddingRight: 20, paddingTop: 8, paddingBottom: 8, borderRadius: 5, cursor: 'pointer', display: 'flex' }}>
            <ArrowLeftOutlined style={{ fontSize: 15, color: 'white' }} />
          </div>

          { props.location.state.allowed && 
            <div onClick={() => {
              history.push({
                pathname: '/markdown-editor',
                state: { note, currentNotebook: props.location.state.currentNotebook }
              })
            }} style={{ alignItems: 'center', backgroundColor: '#2fa8d4', paddingLeft: 20, paddingRight: 40, paddingTop: 8, paddingBottom: 8, borderRadius: 5, cursor: 'pointer', display: 'flex' }}>
              <EditOutlined style={{ fontSize: 15, color: 'white' }} />
              <span style={{ color: 'white', fontWeight: 'bold', marginLeft: 10 }}>Editar nota</span>
            </div>
          }

        </div>

        <div style={{ marginTop: 30 }}>
          <span style={{ fontSize: 28 }}>{note && note.title || 'Nome da Nota'}</span>
        </div>

        <div style={{ marginTop: 30 }}>
          <div dangerouslySetInnerHTML={{__html: mdParser.render(note && note.markdown || '')}}/>
          {/* {
            ReactDOM.render(mdParser.render(note && note.markdown || ''))
          } */}
        </div>

        
      </div>
    </div>
  )
}

export default Preview;