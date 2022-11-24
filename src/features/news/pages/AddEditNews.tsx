import {
  Button,
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
import axios from "axios";
import ButtonAdd from "components/Button/ButtonAdd";
import Container from "container/Container";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PROTECTED_ROUTES_PATH } from "routes/RoutesPath";
import MyEditor from "shared/components/MyEditor";
import UploadComponent from "shared/components/UploadComponent";
import { CliCookieService, CLI_COOKIE_KEYS } from "shared/services/cli-cookie";
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
          // const data = {
          //   id: result?.acf?.id,
          //   title: result?.acf?.title,
          //   description: result?.acf?.description,
          //   newsType: Number(result?.acf?.post_type),
          //   isSentNoti:
          //     Number(result?.acf?.is_send_noti?.[0].slice(0, 1)) === 1
          //       ? true
          //       : false,
          // };
          // setNewsDetail(data);
          form.setFieldsValue({
            id: result?.acf?.id,
            title: result?.acf?.title,
            description: result?.acf?.description,
            newsType: Number(result?.acf?.post_type),
            isSentNoti:
              Number(result?.acf?.is_send_noti?.[0].slice(0, 1)) === 1
                ? true
                : false,
          });
          setDescription(result?.acf?.content);
        },
        (error) => {
          console.log("error", error);
          setIsLoading(false);
        }
      );
  };

  const onFinish = async (values: any) => {
    setIsLoading(true);
    console.log("VALUE: ", values);
    const newPost = {
      // id: Math.ceil(Math.random() * 10000000),
      title: values.title,
      love_count: 0,
      post_type: values.newsType,
      is_sent_noti: values.isSentNoti ? "1" : "0",
      content: description,
    };
    fetch(`http://localhost:8000/wp-json/wp/v2/posts`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${CliCookieService.get(
          CLI_COOKIE_KEYS.ACCESS_TOKEN
        )}`,
      },
      body: JSON.stringify(newPost),
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
  };

  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };

  React.useEffect(() => {
    if (targetId) {
      getDetailData();
    }
  }, [targetId]);

  return (
    <Spin spinning={isLoading}>
      <Container
        header={
          <PageHeader
            onBack={() => navigate(PROTECTED_ROUTES_PATH.NEWS)}
            style={{ borderRadius: 8 }}
            title={targetId ? "Chỉnh sửa tin tức" : "Thêm mới tin tức"}
            extra={[
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Lưu
                </Button>
              </Form.Item>,
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
                  name="title"
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
                  // rules={[
                  //   { required: true, message: "Vui lòng tải ảnh bài viết" },
                  // ]}
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
            <Row>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Lưu
                </Button>
              </Form.Item>
            </Row>
          </Form>
        }
      />
    </Spin>
  );
};

export default AddEditNews;
