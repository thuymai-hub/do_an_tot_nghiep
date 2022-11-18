import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';

export const usePrev = (value: any) => {
  const ref = useRef<any>();
  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};
interface IProps {
  onChange?: (value: string) => any;
  option?: string[];
  value?: string;
  height?: number | string;
  width?: number | string;
  editorStyle?: CSSProperties;
  id?: string;
}

const EditorComponent: React.FC<IProps> = ({
  onChange,
  value,
  width,
  height,
  editorStyle,
  option,
  id
}) => {
  const defaultOption: string[] = [
    'inline',
    'blockType',
    'fontSize',
    'fontFamily',
    'list',
    'textAlign',
    'colorPicker',
    'link',
    'embedded',
    'emoji',
    'image',
    'remove',
    'history'
  ];

  const [editorState, setEditorState] = useState<EditorState>();

  const onEditorStateChange = (editorState: EditorState) => {
    onChange && onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    setEditorState(editorState);
  };

  const handleValue = () => {
    const html = value ? value : '';
    const blocksFromHtml = htmlToDraft(html);
    const { contentBlocks, entityMap }: any = blocksFromHtml;
    if (contentBlocks) {
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
  };

  const prevValue = usePrev(value);

  useEffect(() => {
    !prevValue && handleValue();
  }, [value]);

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={onEditorStateChange}
      toolbar={{ options: option ? option : defaultOption }}
      editorStyle={{
        ...editorStyle,
        height: height ? height : 200,
        width: width ? width : '100%'
      }}
    />
  );
};

export default React.memo(EditorComponent);
