import React, { useState, useEffect } from 'react';
import { Input, notification } from 'antd';
import { useHistory } from "react-router-dom";
import TopHeader from '../../components/TopHeader';
import Api from '../../modules/api';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';

import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt();

function MarkdownEditor(props) {
  const username = sessionStorage.getItem('username');
  const history = useHistory();
  const [markdownText, setMarkdownText] = useState('');
  const [noteTitle, setNoteTitle] = useState('');

  useEffect(() => {
    const currentNote = props.location.state.note;
    if (currentNote) {
      setNoteTitle(currentNote.title);
      setMarkdownText(currentNote.markdown);
    }
  }, [])

  const saveNote = async () => {
    try {
      const currentNotebook = props.location.state.currentNotebook;
      await Api.createNewNote(noteTitle, markdownText, currentNotebook._id);
      notification.success({
        description: 'Nota criada com sucesso!',
        message: 'Pronto!'
      });
      history.goBack();
    } catch (err) {
      notification.error({
        description: 'Erro ao criar nota.',
        message: 'Oopss...'
      });
    }
  }

  const editNote = async () => {
    try {
      const currentNote = props.location.state.note;
      const currentNotebook = props.location.state.currentNotebook;
      await Api.editNote(currentNote._id, currentNotebook._id, noteTitle, markdownText);
      
      notification.success({
        description: 'Nota editada com sucesso!',
        message: 'Pronto!'
      });
      history.goBack();
      if (props.location.state.backTwice) {
        history.goBack();
      }
    } catch (err) {
      notification.error({
        description: 'Erro ao editar nota.',
        message: 'Oopss...'
      });
    }
  }

  return (
    <div style={{ height: '100vh' }}>
      <TopHeader username={username}/>

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
              <div onClick={() => { 
                if (!props.location.state.note) {
                  saveNote();
                } else {
                  editNote();
                }
              }} style={{ marginLeft: 15,  backgroundColor: '#2fa8d4', paddingLeft: 30, paddingRight: 40, paddingTop: 8, paddingBottom: 8, borderRadius: 5, cursor: 'pointer', display: 'flex' }}>
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