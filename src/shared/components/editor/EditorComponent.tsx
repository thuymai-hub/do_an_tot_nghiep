import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { ContentState, convertToRaw, EditorState } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import { CliCookieService, CLI_COOKIE_KEYS } from "shared/services/cli-cookie";
import { message } from "antd";

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
  isUploadServerWhenUploading?: boolean;
}

const EditorComponent = ({
  onChange,
  value,
  width,
  height,
  editorStyle,
  option,
  id,
  isUploadServerWhenUploading = false,
}: IProps) => {
  const [editorState, setEditorState] = useState<EditorState>();
  const [progress, setProgress] = React.useState(0);

  const onEditorStateChange = (editorState: EditorState) => {
    onChange &&
      onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    setEditorState(editorState);
  };

  const uploadImageCallBack = async (file: any) => {
    const fmData = new FormData();
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    fmData.append("images", file);

    fetch(`http://localhost:8000/wp-json/wp/v2/media`, {
      headers: {
        Authorization: `Bearer ${CliCookieService.get(
          CLI_COOKIE_KEYS.ACCESS_TOKEN
        )}`,
      },
      body: fmData,
      method: "POST",
    })
      .then((res) => res.json())
      .then((res: any) => {
        console.log("RES: ", res.guid.raw);
      })
      .catch((err: any) => {
        message.error(err);
      });
  };

  const handleValue = () => {
    const html = value ? value : "";
    const blocksFromHtml = htmlToDraft(html);
    const { contentBlocks, entityMap }: any = blocksFromHtml;
    if (contentBlocks) {
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
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
      toolbar={{
        options: [
          "inline",
          "blockType",
          "fontSize",
          "fontFamily",
          "image",
          "list",
          "textAlign",
          "colorPicker",
          "link",
          "embedded",
          "emoji",
          "remove",
          "history",
        ],
        image: {
          uploadCallback: uploadImageCallBack,
          previewImage: true,
          inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
        },
      }}
      editorStyle={{
        ...editorStyle,
        height: height ? height : 200,
        width: width ? width : "100%",
      }}
    />
  );
};

export default React.memo(EditorComponent);
