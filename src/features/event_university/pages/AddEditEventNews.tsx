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
import Editor, { EditorContentChanged } from "components/QuillEditor";
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

  const onEditorContentChanged = (content: EditorContentChanged) => {
    setDescription(content.html);
  };

  const onFinish = async (values: any) => {
    setIsLoading(true);
    if (!targetId) {
      const newPost = {
        title: values.eventTitle,
        place: values.place,
        short_description: values.shortDes,
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
          message.success("Th??m s??? ki???n m???i th??nh c??ng!");
          navigate(PROTECTED_ROUTES_PATH.EVENTS);
        })
        .catch((err) => {
          message.error("???? c?? l???i x???y ra!");
          console.log("error: ", err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      const newPost = {
        title: values.eventTitle,
        place: values.place,
        short_description: values.shortDes,
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
          message.success("Ch???nh s???a s??? ki???n th??nh c??ng!");
          navigate(PROTECTED_ROUTES_PATH.EVENTS);
        })
        .catch((err) => {
          message.error("???? c?? l???i x???y ra!");
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
        message.success("Ch???nh s???a tr???ng th??i s??? ki???n th??nh c??ng!");
        navigate(PROTECTED_ROUTES_PATH.EVENTS);
      })
      .catch((err) => {
        message.error("???? c?? l???i x???y ra!");
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
            place: result?.acf?.place,
            eventTitle: result?.acf?.title,
            shortDes: result?.acf?.short_description,
            description: result?.acf?.description,
            date: [
              moment(result?.acf?.start_date, "DD-MM-YYYY"),
              moment(result?.acf?.end_date, "DD-MM-YYYY"),
            ],
            isSentNoti: Number(result?.acf?.is_send_noti) === 1 ? true : false,
            isFutureEvent:
              Number(result?.acf?.is_future_event) === 1 ? true : false,
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
          title={targetId ? "Ch???nh s???a s??? ki???n" : "Th??m m???i s??? ki???n"}
          extra={
            targetId && isWorking
              ? [
                  <ButtonAdd
                    htmlType="submit"
                    text={"L??u"}
                    onClickButton={() => form.submit()}
                  />,

                  <Popconfirm
                    title="B???n c?? ch???c ch???n mu???n ng???ng ho???t ?????ng s??? ki???n n??y?"
                    placement="top"
                    onConfirm={onChangeStatusEvent}
                    okText="Ng???ng"
                    cancelText="Hu???"
                    okButtonProps={{
                      type: "primary",
                      danger: true,
                    }}
                    style={{ background: "red" }}
                  >
                    <ButtonSave
                      htmlType="submit"
                      background={"red"}
                      text={"Ng???ng ho???t ?????ng"}
                    />
                    ,
                  </Popconfirm>,
                ]
              : targetId && !isWorking
              ? [
                  <ButtonAdd
                    htmlType="submit"
                    text={"L??u"}
                    onClickButton={() => form.submit()}
                  />,
                  <ButtonSave
                    htmlType="submit"
                    text={"M??? ho???t ?????ng"}
                    onClickButton={onChangeStatusEvent}
                  />,
                ]
              : [
                  <ButtonAdd
                    htmlType="submit"
                    text={"L??u"}
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
                label="T??n s??? ki???n"
                name="eventTitle"
                rules={[
                  { required: true, message: "Vui l??ng nh???p t??n s??? ki???n!" },
                ]}
              >
                <Input allowClear placeholder="Nh???p t??n s??? ki???n" />
              </Form.Item>
            </Col>
            <Col span={1} />
            <Col span={12}>
              <Form.Item
                label="Th???i gian di???n ra"
                name="date"
                rules={[
                  {
                    required: true,
                    message: "Vui l??ng ch???n th???i gian di???n ra!",
                  },
                ]}
              >
                <DatePicker.RangePicker
                  placeholder={["Ng??y b???t ?????u", "Ng??y k???t th??c"]}
                  style={{ width: "100%" }}
                  format="DD-MM-YYYY"
                />
              </Form.Item>
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={11}>
              <Form.Item
                label="M?? t??? ng???n"
                name="shortDes"
                rules={[
                  { required: true, message: "Vui l??ng nh???p m?? t??? ng???n!" },
                ]}
              >
                <Input allowClear placeholder="Nh???p m?? t??? ng???n" />
              </Form.Item>
            </Col>
            <Col span={13}>
              <Form.Item
                label="?????a ??i???m"
                name="place"
                rules={[
                  {
                    required: true,
                    message: "Vui l??ng nh???p m?? ?????a ??i???m di???n ra!",
                  },
                ]}
              >
                <Input allowClear placeholder="Nh???p ?????a ??i???m" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={6}>
            <Col span={1} />
            <Col span={11}>
              <Form.Item name="isFutureEvent" valuePropName="checked" label="">
                <Checkbox>S??? ki???n s???p di???n ra</Checkbox>
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item name="isSentNoti" valuePropName="checked" label="">
                <Checkbox>G???i th??ng b??o</Checkbox>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={13}>
              <Form.Item
                label="???nh s??? ki???n"
                name="file"
                // rules={[
                //   { required: true, message: "Vui l??ng t???i ???nh s??? ki???n" },
                // ]}
              >
                <UploadComponent
                  accept=".jpg"
                  isUploadServerWhenUploading
                  uploadType="single"
                  listType="picture-card"
                  maxLength={1}
                  title="T???i ???nh"
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
                <span style={{ color: "red" }}>* </span>M?? t??? s??? ki???n
              </p>
              {/* <MyEditor
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
                placeholder="Nh???p m?? t??? s??? ki???n"
              /> */}
              <Editor value={description} onChange={onEditorContentChanged} />
            </Col>
          </Row>
        </Form>
      }
    />
  );
};

export default AddEditEventNews;
