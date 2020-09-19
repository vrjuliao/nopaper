import React, { useState } from 'react';
import { } from 'antd';

import TopHeader from '../../components/TopHeader';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';

import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt();

function MarkdownEditor(props) {
  const [markdownText, setMarkdownText] = useState('');

  return (
    <div style={{ height: '100vh' }}>
      <TopHeader />

      <div style={{ alignItems: 'center', height: '-webkit-calc(100% - 95px)', position: 'relative' }} >
        <div style={{ backgroundColor: '#fff', marginLeft: '17.5%', width: '65%', height: '100%', padding: 20, paddingTop: 20, overflow: 'scroll' }}>
          <MdEditor
            value={markdownText}
            style={{ height: '70vh' }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={(text) => setMarkdownText(text.text)}
          />
        </div>
      </div>

    </div>
  );
}

export default MarkdownEditor;