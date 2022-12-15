import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  message,
  PageHeader,
  Popconfirm,
  Row,
  Select,
  Spin,
} from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import LocalStorage from "apis/LocalStorage";
import ButtonAdd from "components/Button/ButtonAdd";
import ButtonSave from "components/Button/ButtonSave";
import IconAntd from "components/IconAntd";
import Editor, { EditorContentChanged } from "components/QuillEditor";
import Container from "container/Container";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { PROTECTED_ROUTES_PATH } from "routes/RoutesPath";
import MyEditor from "shared/components/MyEditor";
import UploadComponent from "shared/components/UploadComponent";
import { CliCookieService, CLI_COOKIE_KEYS } from "shared/services/cli-cookie";

const AddEditStudentPostPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();
  const targetId = location?.state?.id;
  const userInfor = useSelector((state: any) => state?.user?.user);
  const [isAllSpace, setIsAllSpace] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isConfirmed, setIsConfirmed] = React.useState<boolean>();
  const [description, setDescription] = React.useState<any>("");
  const [listImages, setListImages] = React.useState<Array<any>>([]);

  const getDetailData = () => {
    setIsLoading(true);
    fetch(`http://localhost:8000/wp-json/wp/v2/forum_posts/${targetId}`, {
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
            titlePost: result?.acf?.title_post,
            description: result?.acf?.description,
            newsType: Number(result?.acf?.post_type),
            isSentNoti: Number(result?.acf?.is_send_noti) === 1 ? true : false,
          });
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

  const onFinish = async (values: any) => {
    setIsLoading(true);
    if (!targetId) {
      const newPost = {
        love_count: 0,
        comment_count: "",
        people_like: "[]",
        is_send_noti: values.isSentNoti ? 1 : 0,
        content: description,
        image: listImages[0],
        is_confirmed: 1,
        date:
          moment().format().slice(0, 10) +
          " " +
          moment().hour() +
          ":" +
          moment().minutes(),
        author: LocalStorage.getUserName(),
        author_id: userInfor?.id,
      };
      fetch(`http://localhost:8000/wp-json/wp/v2/forum_posts`, {
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
            raw: Math.ceil(Math.random() * 10000),
            rendered: Math.ceil(Math.random() * 10000),
          },
          status: "publish",
        }),
        method: "POST",
      })
        .then((res: any) => res.json())
        .then((res: any) => {
          setIsLoading(false);
          message.success("Thêm bài viết mới thành công!");
          navigate(PROTECTED_ROUTES_PATH.STUDENT);
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
        title_post: values.titlePost,
        love_count: 0,
        post_type: values.newsType,
        is_send_noti: values.isSentNoti ? 1 : 0,
        content: description,
        image: listImages[0],
      };
      fetch(`http://localhost:8000/wp-json/wp/v2/forum_posts/${targetId}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${CliCookieService.get(
            CLI_COOKIE_KEYS.ACCESS_TOKEN
          )}`,
        },
        body: JSON.stringify({
          fields: newPost,
          status: "publish",
        }),
        method: "PUT",
      })
        .then((res: any) => res.json())
        .then((res: any) => {
          setIsLoading(false);
          message.success("Chỉnh sửa bài viết thành công!");
          navigate(PROTECTED_ROUTES_PATH.STUDENT);
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

  const onDelete = (id: string) => {
    setIsLoading(true);
    fetch(`http://localhost:8000/wp-json/wp/v2/forum_posts/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${CliCookieService.get(
          CLI_COOKIE_KEYS.ACCESS_TOKEN
        )}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          message.success("Xoá bài viết thành công!");
          navigate(PROTECTED_ROUTES_PATH.STUDENT);
          setIsLoading(false);
        },
        (error) => {
          console.log("error", error);
          setIsLoading(false);
        }
      );
  };

  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const onEditorContentChanged = (content: EditorContentChanged) => {
    setDescription(content.html);
  };

  React.useEffect(() => {
    if (targetId) {
      getDetailData();
    }
  }, [targetId]);

  return (
    <Spin spinning={isLoading}>
      <br />
      <br />
      <br />
      <Container
        header={
          <PageHeader
            onBack={() => navigate(PROTECTED_ROUTES_PATH.STUDENT)}
            style={{ borderRadius: 8 }}
            title={targetId ? "Chỉnh sửa bài viết" : "Thêm mới bài viết"}
            extra={
              targetId
                ? [
                    <ButtonAdd
                      htmlType="submit"
                      text={"Lưu"}
                      onClickButton={() => form.submit()}
                    />,
                    <Popconfirm
                      title="Bạn có chắc chắn muốn xoá bài viết này?"
                      placement="top"
                      onConfirm={() => onDelete(targetId)}
                      okText="Xoá"
                      cancelText="Huỷ"
                      okButtonProps={{
                        type: "primary",
                        danger: true,
                      }}
                      style={{ background: "red" }}
                    >
                      <Button
                        style={{
                          background: "red",
                          color: "white",
                          borderRadius: 6,
                        }}
                      >
                        Xoá
                      </Button>
                    </Popconfirm>,
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
              <Col span={13}>
                <Form.Item
                  label={"Ảnh bài viết"}
                  name="file"
                  // rules={[
                  //   { required: true, message: "Vui lòng tải ảnh bài viết" },
                  // ]}
                >
                  <UploadComponent
                    accept=".jpg, .jpeg, .png"
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
                    onSuccessUpload={(url: any) => {
                      setListImages([url]);
                    }}
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
                  <span style={{ color: "red" }}>* </span>Nội dung bài viết
                </p>
                <Editor value={description} onChange={onEditorContentChanged} />
              </Col>
            </Row>
          </Form>
        }
      />
    </Spin>
  );
};

export default AddEditStudentPostPage;
