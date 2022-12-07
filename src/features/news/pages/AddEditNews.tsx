import {
  Checkbox,
  Col,
  Form,
  Input,
  message,
  PageHeader,
  Row,
  Select,
  Spin,
} from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import ButtonAdd from "components/Button/ButtonAdd";
import ButtonSave from "components/Button/ButtonSave";
import Container from "container/Container";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { PROTECTED_ROUTES_PATH } from "routes/RoutesPath";
import MyEditor from "shared/components/MyEditor";
import UploadComponent from "shared/components/UploadComponent";
import { CliCookieService, CLI_COOKIE_KEYS } from "shared/services/cli-cookie";
import { typePosts } from "./NewsPage";

const AddEditNews = () => {
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
  const [listTypes, setListTypes] = React.useState<Array<any>>([]);

  const getDetailData = () => {
    setIsLoading(true);
    fetch(`http://localhost:8000/wp-json/wp/v2/posts/${targetId}`, {
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
            newsType: result?.acf?.post_type.split("-")[1],
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
        title_post: values.titlePost,
        love_count: 0,
        comment_count: "",
        post_type: values.newsType,
        is_send_noti: values.isSentNoti ? 1 : 0,
        content: description,
        image: listImages[0],
        is_confirmed: 0,
        date:
          moment().format().slice(0, 10) +
          " " +
          moment().hour() +
          ":" +
          moment().minutes(),
        author: userInfor?.user_display_name,
      };
      fetch(`http://localhost:8000/wp-json/wp/v2/posts`, {
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
            raw: newPost.title_post,
            rendered: newPost.title_post,
          },
          status: "publish",
        }),
        method: "POST",
      })
        .then((res: any) => res.json())
        .then((res: any) => {
          setIsLoading(false);
          message.success("Thêm bài viết mới thành công!");
          navigate(PROTECTED_ROUTES_PATH.NEWS);
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
        // post_type: values.newsType,
        is_send_noti: values.isSentNoti ? 1 : 0,
        content: description,
        image: listImages[0],
      };
      fetch(`http://localhost:8000/wp-json/wp/v2/posts/${targetId}`, {
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
            raw: newPost.title_post,
            rendered: newPost.title_post,
          },
          status: "publish",
        }),
        method: "PUT",
      })
        .then((res: any) => res.json())
        .then((res: any) => {
          setIsLoading(false);
          message.success("Chỉnh sửa bài viết thành công!");
          navigate(PROTECTED_ROUTES_PATH.NEWS);
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

  const getListNewsTypes = () => {
    setIsLoading(true);
    fetch("http://localhost:8000/wp-json/wp/v2/news_types")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("result:", result);
          const convertData = result.map((item: any) => ({
            value: `${item?.id}-${item?.acf?.title}`,
            label: item?.acf?.title,
          }));
          setListTypes(convertData);
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

  React.useEffect(() => {
    if (targetId) {
      getDetailData();
    }
  }, [targetId]);

  React.useEffect(() => {
    getListNewsTypes();
  }, []);

  return (
    <Spin spinning={isLoading}>
      <Container
        header={
          <PageHeader
            onBack={() => navigate(PROTECTED_ROUTES_PATH.NEWS)}
            style={{ borderRadius: 8 }}
            title={targetId ? "Chỉnh sửa bài viết" : "Thêm mới bài viết"}
            extra={[
              <ButtonAdd
                htmlType="submit"
                text={"Lưu"}
                onClickButton={() => form.submit()}
              />,
            ]}
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
                  name="titlePost"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tiêu đề tin tức!",
                    },
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
                    options={listTypes}
                    disabled={targetId ? true : false}
                  />
                </Form.Item>
              </Col>
            </Row>
            <br />
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
                  <span style={{ color: "red" }}>* </span>Nội dung tin tức
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
                />
              </Col>
            </Row>
          </Form>
        }
      />
    </Spin>
  );
};

export default AddEditNews;
