import React, { useState } from 'react';
import { Input } from 'antd';
import { useHistory } from "react-router-dom";
import TopHeader from '../../components/TopHeader';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';

import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt();

function MarkdownEditor(props) {
  const history = useHistory();
  const [markdownText, setMarkdownText] = useState('');
  const [noteTitle, setNoteTitle] = useState('');

  return (
    <div style={{ height: '100vh' }}>
      <TopHeader />

      <div style={{ alignItems: 'center', height: '-webkit-calc(100% - 95px)', position: 'relative' }} >
        <div style={{ backgroundColor: '#fff', marginLeft: '17.5%', width: '65%', height: '100%', padding: 20, paddingTop: 20, overflow: 'scroll' }}>
          
          <div style={{ display: 'flex' }}>

            <div style={{  }}>
              <Input 
                placeholder="Nome da Nota" 
                bordered={false} 
                style={{ paddingLeft: 0, fontSize: 25, borderBottom: '1px solid #2fa8d4' }}
                value={noteTitle}
                onChange={(value) => setNoteTitle(value.target.value)}
              />
            </div>

            <div style={{ alignSelf: 'flex-end', display: 'flex' , marginLeft: 'auto', marginRight: 0 }}>
              <div onClick={() => history.goBack()} style={{ backgroundColor: 'rgba(0,0,0,0.2)', paddingLeft: 30, paddingRight: 40, paddingTop: 8, paddingBottom: 8, borderRadius: 5, cursor: 'pointer', display: 'flex' }}>
                <span style={{ color: 'white', fontWeight: 'bold', marginLeft: 10 }}>Cancelar</span>
              </div>
              <div style={{ marginLeft: 15,  backgroundColor: '#2fa8d4', paddingLeft: 30, paddingRight: 40, paddingTop: 8, paddingBottom: 8, borderRadius: 5, cursor: 'pointer', display: 'flex' }}>
                <span style={{ color: 'white', fontWeight: 'bold', marginLeft: 10 }}>Salvar</span>
              </div>
            </div>

          </div>
          
          <MdEditor
            value={markdownText}
            style={{ height: '85%', marginTop: 15 }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={(text) => {
              setMarkdownText(text.text); 
            }}
          />

          {/* <div dangerouslySetInnerHTML={{__html: mdParser.render(markdownText)}}/> */}

        </div>
      </div>

    </div>
  );
}

export default MarkdownEditor;