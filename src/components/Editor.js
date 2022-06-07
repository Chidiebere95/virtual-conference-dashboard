/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState, Fragment } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';
import CheckList from '@editorjs/checklist';
import Code from '@editorjs/code';
import Delimiter from '@editorjs/delimiter';
import Embed from '@editorjs/embed';
import Image from '@editorjs/image';
import InlineCode from '@editorjs/inline-code';
import LinkTool from '@editorjs/link';
import List from '@editorjs/list';
import Marker from '@editorjs/marker';
import Quote from '@editorjs/quote';
import Raw from '@editorjs/raw';
import SimpleImage from '@editorjs/simple-image';
import Table from '@editorjs/table';
import Warning from '@editorjs/warning';
import AlignmentTuneTool from 'editorjs-text-alignment-blocktune';



const EDITTOR_HOLDER_ID = 'editorjs';

const Editor = ({ data, handleUpdate }) => {
  const ejInstance = useRef();
  const [editorData, setEditorData] = useState(data);

  // This will run only once
  useEffect(() => {
    if (!ejInstance.current) {
      initEditor();
    }
    return () => {
      ejInstance.current.destroy();
      ejInstance.current = null;
    };
  }, []);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: EDITTOR_HOLDER_ID,
      logLevel: 'ERROR',
      placeholder: 'Let`s write an awesome story!',
      data: editorData,
      onReady: () => {
        ejInstance.current = editor;
        console.log('Editor.js is ready to work!');
      },
      onChange: async () => {
        let content = await ejInstance.current.save();
        // Put your logic here to save this data to your DB
        setEditorData(content);
        handleUpdate(content);
      },
      autofocus: true,
      tools: {
        header: {
          class: Header,
          tunes: ['anyTuneName'],
          inlineToolbar: true,
          config: {
            placeholder: 'Enter a header',
            levels: [1, 2, 3, 4, 5, 6],
            defaultLevel: 1,
          },
        },
        paragraph: {
          class: Paragraph,
          tunes: ['anyTuneName'],
          inlineToolbar: true,
        },
        list: {
          class: List,
          // style: 'unordered',
          // inlineToolbar: ['link', 'bold'],
        },
        embed: {
          class: Embed,
          inlineToolbar: false,
          config: { services: { youtube: true, coub: true, image: true } },
        },
        // marker: { class: Marker, shortcut: 'CMD+SHIFT+M' },
        quote: { class: Quote, inlineToolbar: ['link', 'bold'] },
        warning: { class: Warning, inlineToolbar: false },
        code: { class: Code, shortcut: 'CMD+SHIFT+C' },
        delimiter: { class: Delimiter, shortcut: 'CMD+SHIFT+D' },
        inlineCode: { class: InlineCode, shortcut: 'CMD+SHIFT+C' },
        table: { class: Table, inlineToolbar: false },
        image: { class: Image, inlineToolbar: false },
        simpleImage: { class: SimpleImage, inlineToolbar: false },
        linkTool: { class: LinkTool, inlineToolbar: false },
        checklist: { class: CheckList, inlineToolbar: false },
        raw: { class: Raw, inlineToolbar: false },
        anyTuneName: {
          class: AlignmentTuneTool,
          config: {
            default: 'left',
            blocks: {
              header: 'left',
              text: 'left',
            },
          },
        },
      },
    });
  };

  return (
    <Fragment>
      <div id={EDITTOR_HOLDER_ID} className='prose lg:prose-lg'></div>
      <button
        onClick={(e) => {
          e.preventDefault();
          ejInstance.current.save().then((outputData) => {
            handleUpdate(editorData);
          });
        }}
      >
        Save
      </button>
    </Fragment>
  );
};

export default Editor;
