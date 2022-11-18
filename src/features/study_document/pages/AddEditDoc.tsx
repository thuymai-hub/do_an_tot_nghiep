import { Col, Form, Input, PageHeader, Row, Select, Table } from "antd";
import ButtonAdd from "components/Button/ButtonAdd";
import Container from "container/Container";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PROTECTED_ROUTES_PATH } from "routes/RoutesPath";
import UploadComponent from "shared/components/UploadComponent";
import { IDetailSubject } from "../components/interface";

const courses = [
  {
    id: 1,
    value: 1,
    label: "Khoá 1",
  },
  {
    id: 2,
    value: 2,
    label: "Khoá 2",
  },
  {
    id: 3,
    value: 3,
    label: "Khoá 3",
  },
];

const AddEditDoc = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [subjectDetail, setSubjectDetail] = React.useState<IDetailSubject>();
  const targetId = location?.state?.id;

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const getSubjectDetail = async () => {
    try {
      setIsLoading(true);
      const data = {
        subjectTitle: "Môn học 1",
        courseId: 1,
        file: "",
        note: "Note nhé",
      };
      setSubjectDetail(data);
      form.setFieldsValue({
        titleSubject: data?.subjectTitle,
        courseId: data?.courseId,
        note: data?.note,
      });
    } catch (error) {
      console.log("ERROR: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onFinish = async () => {};

  React.useEffect(() => {
    if (targetId) getSubjectDetail();
  }, [targetId]);

  return (
    <Container
      header={
        <PageHeader
          onBack={() => navigate(PROTECTED_ROUTES_PATH.STUDY_DOCUMENT)}
          style={{ borderRadius: 8 }}
          title={targetId ? "Chỉnh sửa môn học" : "Thêm mới môn học"}
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
                label="Tên môn học"
                name="titleSubject"
                rules={[
                  { required: true, message: "Vui lòng nhập tên môn học!" },
                ]}
              >
                <Input allowClear placeholder="Nhập tên môn học" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Khoá học"
                name="courseId"
                rules={[{ required: true, message: "Vui lòng chọn khoá học!" }]}
              >
                <Select
                  placeholder="Chọn loại khoá học"
                  onChange={handleChange}
                  options={courses}
                />
              </Form.Item>
            </Col>
          </Row>
          <br />
          <Row gutter={6}>
            <Col span={12}>
              <Form.Item
                label="Tải tài liệu lên"
                name="file"
                rules={[
                  { required: true, message: "Vui lòng tải tài liệu lên!" },
                ]}
              >
                <UploadComponent
                  accept=".pdf"
                  isUploadServerWhenUploading
                  uploadType="single"
                  listType="picture-card"
                  maxLength={1}
                  title="Tải tài liệu"
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
            <Col span={12}>
              <Form.Item
                label="Ghi chú"
                name="note"
                rules={[
                  {
                    whitespace: true,
                    message: "Vui lòng không nhập khoảng trắng!",
                  },
                ]}
              >
                <Input.TextArea
                  allowClear
                  rows={5}
                  placeholder="Nhập ghi chú"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      }
    />
  );
};

export default AddEditDoc;
