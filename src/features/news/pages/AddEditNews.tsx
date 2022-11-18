import { Checkbox, Col, Form, Input, PageHeader, Row, Select } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import ButtonAdd from "components/Button/ButtonAdd";
import Container from "container/Container";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PROTECTED_ROUTES_PATH } from "routes/RoutesPath";
import MyEditor from "shared/components/MyEditor";
import UploadComponent from "shared/components/UploadComponent";
import { INewsDetail } from "../components/interface";
import { typePosts } from "./NewsPage";

const AddEditNews = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();
  const targetId = location?.state?.id;
  const [isAllSpace, setIsAllSpace] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [newsDetail, setNewsDetail] = React.useState<INewsDetail>();
  const [description, setDescription] = React.useState<any>("");

  const onFinish = async () => {};

  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const getSubjectDetail = async () => {
    try {
      setIsLoading(true);
      const data = {
        title: "Tiêu đề 1",
        newsType: 1,
        file: "",
        isSentNoti: true,
      };
      setNewsDetail(data);
      form.setFieldsValue({
        title: data?.title,
        newsType: data?.newsType,
        isSentNoti: data?.isSentNoti,
      });
      setDescription("hihi");
    } catch (error) {
      console.log("ERROR: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (targetId) getSubjectDetail();
  }, [targetId]);

  return (
    <Container
      header={
        <PageHeader
          onBack={() => navigate(PROTECTED_ROUTES_PATH.NEWS)}
          style={{ borderRadius: 8 }}
          title={targetId ? "Chỉnh sửa tin tức" : "Thêm mới tin tức"}
          extra={[<ButtonAdd key={1} text="Lưu" onClickButton={() => {}} />]}
        />
      }
      contentComponent={
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={6}>
            <Col span={12}>
              <Form.Item
                label="Tiêu đề"
                name="title"
                rules={[
                  { required: true, message: "Vui lòng nhập tiêu đề tin tức!" },
                ]}
              >
                <Input allowClear placeholder="Nhập tiêu đề tin tức" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Loại bài viết"
                name="newsType"
                rules={[
                  { required: true, message: "Vui lòng chọn loại bài viết!" },
                ]}
              >
                <Select
                  placeholder="Chọn loại bài viết"
                  //   onChange={handleChange}
                  options={typePosts}
                />
              </Form.Item>
            </Col>
          </Row>
          <br />
          <Row gutter={6}>
            <Col span={13}>
              <Form.Item
                label="Ảnh bài viết"
                name="file"
                rules={[
                  { required: true, message: "Vui lòng tải ảnh bài viết" },
                ]}
              >
                <UploadComponent
                  accept=".jpg"
                  isUploadServerWhenUploading
                  uploadType="single"
                  listType="picture-card"
                  maxLength={1}
                  title="Tải ảnh"
                  // initialFiles={
                  //   location?.state?.id
                  //     ? [
                  //         {
                  //           uid: location?.state?.id,
                  //           name: "image.png",
                  //           status: "done",
                  //           url: listImages[0],
                  //         },
                  //       ]
                  //     : []
                  // }
                  onSuccessUpload={(url: any) => {}}
                />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item name="isSentNoti" valuePropName="checked" label="">
                <Checkbox onChange={onChange}>Gửi thông báo</Checkbox>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={6}>
            <Col span={24}>
              <p>
                <span style={{ color: "red" }}>* </span>Nội dung tin tức
              </p>
              <MyEditor
                defaultValue={targetId ? description : ""}
                logData={(value: string) => {}}
                editorStyle={{
                  border: "1px solid #ACB0B0",
                  borderRadius: "5px",
                  overflow: "hidden scroll",
                  padding: "0 16px",
                }}
                height={350}
                setIsAllSpace={setIsAllSpace}
              />
            </Col>
          </Row>
        </Form>
      }
    />
  );
};

export default AddEditNews;
