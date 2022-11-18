import { Checkbox, Col, DatePicker, Form, Input, PageHeader, Row } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import ButtonAdd from "components/Button/ButtonAdd";
import Container from "container/Container";
import moment from "moment";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PROTECTED_ROUTES_PATH } from "routes/RoutesPath";
import MyEditor from "shared/components/MyEditor";
import UploadComponent from "shared/components/UploadComponent";
import { IEventDetail } from "../components/interface";

const AddEditEventNews = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();
  const targetId = location?.state?.id;
  const [isAllSpace, setIsAllSpace] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [eventDetail, setEventDetail] = React.useState<IEventDetail>();
  const [description, setDescription] = React.useState<any>("");

  const onFinish = async () => {};

  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const getSubjectDetail = async () => {
    try {
      setIsLoading(true);
      const data = {
        event: "Sự kiện 1",
        date: [moment(), moment()],
        isSentNoti: true,
        file: "",
      };
      setEventDetail(data);
      form.setFieldsValue({
        event: data?.event,
        date: data?.date,
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
          onBack={() => navigate(PROTECTED_ROUTES_PATH.EVENTS)}
          style={{ borderRadius: 8 }}
          title={targetId ? "Chỉnh sửa sự kiện" : "Thêm mới sự kiện"}
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
                label="Tên sự kiện"
                name="event"
                rules={[
                  { required: true, message: "Vui lòng nhập tên sự kiện!" },
                ]}
              >
                <Input allowClear placeholder="Nhập tên sự kiện" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Thời gian diễn ra"
                name="date"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn thời gian diễn ra!",
                  },
                ]}
              >
                <DatePicker.RangePicker
                  placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
                  style={{ width: "100%" }}
                  format="DD/MM/YYYY"
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

export default AddEditEventNews;
