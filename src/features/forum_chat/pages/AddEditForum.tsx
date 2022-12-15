import { Checkbox, Col, Form, Input, PageHeader, Row } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import ButtonAdd from "components/Button/ButtonAdd";
import Editor, { EditorContentChanged } from "components/QuillEditor";
import Container from "container/Container";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PROTECTED_ROUTES_PATH } from "routes/RoutesPath";
import MyEditor from "shared/components/MyEditor";

const AddEditForum = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();
  const targetId = location?.state?.id;
  const [description, setDescription] = React.useState<any>("");

  const onEditorContentChanged = (content: EditorContentChanged) => {
    setDescription(content.html);
  };

  const onFinish = async () => {};

  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <Container
      header={
        <PageHeader
          onBack={() => navigate(PROTECTED_ROUTES_PATH.FORUM)}
          style={{ borderRadius: 8 }}
          title={targetId ? "Chỉnh sửa bài viết" : "Thêm mới bài viết"}
          extra={[<ButtonAdd key={1} text="Lưu" onClickButton={() => {}} />]}
        />
      }
      contentComponent={
        <Form form={form} onFinish={onFinish} autoComplete="off">
          <Row gutter={6}>
            <Col span={12}>
              <Form.Item
                label="Tiêu đề"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tiêu đề bài viết!",
                  },
                ]}
              >
                <Input allowClear placeholder="Nhập tiêu đề bài viết" />
              </Form.Item>
            </Col>
            <Col span={1} />
            <Col span={11}>
              <Form.Item name="isSentNoti" valuePropName="checked" label="">
                <Checkbox onChange={onChange}>Gửi thông báo</Checkbox>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={6}>
            <Col span={24}>
              <p>
                <span style={{ color: "red" }}>* </span>Nội dung bài viết
              </p>
              <Editor value={description} onChange={onEditorContentChanged} />
            </Col>
          </Row>
        </Form>
      }
    />
  );
};

export default AddEditForum;
