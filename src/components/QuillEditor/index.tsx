import { useRef, useState, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
// @ts-ignore
import * as Emoji from "quill-emoji";
import { markdownToHtml, htmlToMarkdown } from "./Paser";

import "react-quill/dist/quill.snow.css";
import "quill-emoji/dist/quill-emoji.css";
import "react-quill/dist/quill.snow.css";
import "./styles.css";
import React from "react";

Quill.register("modules/emoji", Emoji);

export interface EditorContentChanged {
  html: string;
  markdown: string;
}

export interface EditorProps {
  value?: string;
  onChange?: (changes: EditorContentChanged) => void;
}

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ["bold", "italic", "underline", "strike", "blockquote", "link"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  ["link", "image"],
  ["emoji"],
  ["clean"],
];

export default function Editor(props: any) {
  const [value, setValue] = useState<any>(props.value || "");
  const reactQuillRef = useRef<ReactQuill>(null);

  const onChange = (content: any) => {
    setValue(content);

    if (props.onChange) {
      props.onChange({
        html: content,
        markdown: htmlToMarkdown(content),
      });
    }
  };

  useEffect(() => {
    if (props.value) setValue(props.value);
  }, [props.value]);

  return (
    <>
      {/* <QuillToolbar /> */}
      <ReactQuill
        ref={reactQuillRef}
        theme="snow"
        placeholder="Nhập nội dung"
        // modules={modules}
        // formats={formats}
        modules={{
          toolbar: {
            container: TOOLBAR_OPTIONS,
          },
          "emoji-toolbar": true,
          "emoji-textarea": false,
          "emoji-shortname": true,
        }}
        value={value}
        style={{ height: 400, marginBottom: 40 }}
        onChange={onChange}
      />
    </>
  );
}
