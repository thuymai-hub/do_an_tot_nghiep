import {
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  PageHeader,
  Popconfirm,
  Row,
} from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import ButtonAdd from "components/Button/ButtonAdd";
import ButtonSave from "components/Button/ButtonSave";
import Container from "container/Container";
import moment from "moment";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PROTECTED_ROUTES_PATH } from "routes/RoutesPath";
import MyEditor from "shared/components/MyEditor";
import UploadComponent from "shared/components/UploadComponent";
import { CliCookieService, CLI_COOKIE_KEYS } from "shared/services/cli-cookie";
import { IEventDetail } from "../components/interface";

const AddEditEventNews = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();
  const targetId = location?.state?.id;
  const [isAllSpace, setIsAllSpace] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isWorking, setIsWorking] = React.useState<boolean>(false);
  const [isConfirmed, setIsConfirmed] = React.useState<boolean>();
  const [description, setDescription] = React.useState<any>("");
  const [listImages, setListImages] = React.useState<Array<any>>([]);

  const onFinish = async (values: any) => {
    setIsLoading(true);
    if (!targetId) {
      const newPost = {
        title: values.eventTitle,
        is_send_noti: values.isSentNoti ? 1 : 0,
        love_count: 0,
        content: description,
        image: listImages[0],
        start_date: values.date[0].format().slice(0, 10),
        end_date: values.date[1].format().slice(0, 10),
        status: 1,
        is_future_event: values.isFutureEvent ? 1 : 0,
      };
      fetch(`http://localhost:8000/wp-json/wp/v2/event_posts`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${CliCookieService.get(
            CLI_COOKIE_KEYS.ACCESS_TOKEN
          )}`,
        },
        body: JSON.stringify({
          fields: newPost,
          title: {
            raw: newPost.title,
            rendered: newPost.title,
          },
          status: "publish",
        }),
        method: "POST",
      })
        .then((res: any) => res.json())
        .then((res: any) => {
          setIsLoading(false);
          message.success("Thêm sự kiện mới thành công!");
          navigate(PROTECTED_ROUTES_PATH.EVENTS);
        })
        .catch((err) => {
          message.error("Đã có lỗi xảy ra!");
          console.log("error: ", err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      const newPost = {
        title: values.eventTitle,
        is_send_noti: values.isSentNoti ? 1 : 0,
        content: description,
        image: listImages[0],
        start_date: values.date[0].format().slice(0, 10),
        end_date: values.date[1].format().slice(0, 10),
        is_future_event: values.isFutureEvent ? 1 : 0,
      };
      fetch(`http://localhost:8000/wp-json/wp/v2/event_posts/${targetId}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${CliCookieService.get(
            CLI_COOKIE_KEYS.ACCESS_TOKEN
          )}`,
        },
        body: JSON.stringify({
          fields: newPost,
          title: {
            raw: newPost.title,
            rendered: newPost.title,
          },
          status: "publish",
        }),
        method: "PUT",
      })
        .then((res: any) => res.json())
        .then((res: any) => {
          setIsLoading(false);
          message.success("Chỉnh sửa sự kiện thành công!");
          navigate(PROTECTED_ROUTES_PATH.EVENTS);
        })
        .catch((err) => {
          message.error("Đã có lỗi xảy ra!");
          console.log("error: ", err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const onChangeStatusEvent = () => {
    fetch(`http://localhost:8000/wp-json/wp/v2/event_posts/${targetId}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${CliCookieService.get(
          CLI_COOKIE_KEYS.ACCESS_TOKEN
        )}`,
      },
      body: JSON.stringify({
        fields: {
          status: isWorking ? 0 : 1,
        },
        status: "publish",
      }),
      method: "PUT",
    })
      .then((res: any) => res.json())
      .then((res: any) => {
        setIsLoading(false);
        message.success("Chỉnh sửa trạng thái sự kiện thành công!");
        navigate(PROTECTED_ROUTES_PATH.EVENTS);
      })
      .catch((err) => {
        message.error("Đã có lỗi xảy ra!");
        console.log("error: ", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const getDetailData = () => {
    setIsLoading(true);
    fetch(`http://localhost:8000/wp-json/wp/v2/event_posts/${targetId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CliCookieService.get(
          CLI_COOKIE_KEYS.ACCESS_TOKEN
        )}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result: any) => {
          setIsLoading(false);
          form.setFieldsValue({
            id: result?.acf?.id,
            eventTitle: result?.acf?.title,
            description: result?.acf?.description,
            date: [
              moment(result?.acf?.start_date, "DD-MM-YYYY"),
              moment(result?.acf?.end_date, "DD-MM-YYYY"),
            ],
            isSentNoti: Number(result?.acf?.is_send_noti) === 1 ? true : false,
          });
          setIsWorking(result?.acf?.status === "1" ? true : false);
          setIsConfirmed(result?.acf?.is_confirmed === "1" ? true : false);
          setDescription(result?.acf?.content);
          setListImages([result?.acf?.image]);
        },
        (error) => {
          console.log("error", error);
          setIsLoading(false);
        }
      );
  };

  React.useEffect(() => {
    if (targetId) getDetailData();
  }, [targetId]);
  return (
    <Container
      header={
        <PageHeader
          onBack={() => navigate(PROTECTED_ROUTES_PATH.EVENTS)}
          style={{ borderRadius: 8 }}
          title={targetId ? "Chỉnh sửa sự kiện" : "Thêm mới sự kiện"}
          extra={
            targetId && isWorking
              ? [
                  <ButtonAdd
                    htmlType="submit"
                    text={"Lưu"}
                    onClickButton={() => form.submit()}
                  />,

                  <Popconfirm
                    title="Bạn có chắc chắn muốn ngừng hoạt động sự kiện này?"
                    placement="top"
                    onConfirm={onChangeStatusEvent}
                    okText="Ngừng"
                    cancelText="Huỷ"
                    okButtonProps={{
                      type: "primary",
                      danger: true,
                    }}
                    style={{ background: "red" }}
                  >
                    <ButtonSave
                      htmlType="submit"
                      background={"red"}
                      text={"Ngừng hoạt động"}
                    />
                    ,
                  </Popconfirm>,
                ]
              : targetId && !isWorking
              ? [
                  <ButtonAdd
                    htmlType="submit"
                    text={"Lưu"}
                    onClickButton={() => form.submit()}
                  />,
                  <ButtonSave
                    htmlType="submit"
                    text={"Mở hoạt động"}
                    onClickButton={onChangeStatusEvent}
                  />,
                ]
              : [
                  <ButtonAdd
                    htmlType="submit"
                    text={"Lưu"}
                    onClickButton={() => form.submit()}
                  />,
                ]
          }
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
            <Col span={11}>
              <Form.Item
                label="Tên sự kiện"
                name="eventTitle"
                rules={[
                  { required: true, message: "Vui lòng nhập tên sự kiện!" },
                ]}
              >
                <Input allowClear placeholder="Nhập tên sự kiện" />
              </Form.Item>
            </Col>
            <Col span={1} />
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
                  format="DD-MM-YYYY"
                />
              </Form.Item>
            </Col>
          </Row>
          <br />
          <Row gutter={6}>
            <Col span={1} />
            <Col span={11}>
              <Form.Item name="isFutureEvent" valuePropName="checked" label="">
                <Checkbox>Sự kiện sắp diễn ra</Checkbox>
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item name="isSentNoti" valuePropName="checked" label="">
                <Checkbox>Gửi thông báo</Checkbox>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={13}>
              <Form.Item
                label="Ảnh sự kiện"
                name="file"
                // rules={[
                //   { required: true, message: "Vui lòng tải ảnh sự kiện" },
                // ]}
              >
                <UploadComponent
                  accept=".png"
                  isUploadServerWhenUploading
                  uploadType="single"
                  listType="picture-card"
                  maxLength={1}
                  title="Tải ảnh"
                  initialFiles={
                    location?.state?.id
                      ? [
                          {
                            uid: location?.state?.id,
                            name: "image.png",
                            status: "done",
                            url: listImages[0],
                          },
                        ]
                      : []
                  }
                  onSuccessUpload={(url: any) => setListImages([url])}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={6}>
            <Col span={24}>
              <p>
                <span style={{ color: "red" }}>* </span>Mô tả sự kiện
              </p>
              <MyEditor
                defaultValue={targetId ? description : ""}
                logData={(value: string) => {
                  setDescription(value.trim());
                }}
                editorStyle={{
                  border: "1px solid #ACB0B0",
                  borderRadius: "5px",
                  overflow: "hidden scroll",
                  padding: "0 16px",
                }}
                height={350}
                setIsAllSpace={setIsAllSpace}
                placeholder="Nhập mô tả sự kiện"
              />
            </Col>
          </Row>
        </Form>
      }
    />
  );
};

export default AddEditEventNews;
