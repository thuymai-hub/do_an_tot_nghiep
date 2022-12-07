import {
  Col,
  Form,
  Input,
  message,
  PageHeader,
  Row,
  Select,
  Spin,
  Table,
} from "antd";
import LocalStorage from "apis/LocalStorage";
import ButtonAdd from "components/Button/ButtonAdd";
import Container from "container/Container";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { PROTECTED_ROUTES_PATH } from "routes/RoutesPath";
import UploadComponent from "shared/components/UploadComponent";
import { CliCookieService, CLI_COOKIE_KEYS } from "shared/services/cli-cookie";
import { IDetailSubject } from "../components/interface";

const AddEditDoc = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();
  const userInfor = useSelector((state: any) => state?.user?.user);
  const [listImages, setListImages] = React.useState<Array<any>>([]);
  const [listFiles, setListFiles] = React.useState<Array<any>>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [currentCourse, setCurrentCourse] = React.useState<any>();
  const [listCourse, setListCourse] = React.useState<any[]>([]);

  const targetId = location?.state?.id;

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const getDetailData = () => {
    setIsLoading(true);
    fetch(`http://localhost:8000/wp-json/wp/v2/subjects/${targetId}`, {
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
            title: result?.acf?.title,
            description: result?.acf?.content,
            courseType: result?.acf?.course_type.split("-")[1],
          });
          setListImages([result?.acf?.image]);
          setListFiles([result?.acf?.file_docs]);
        },
        (error) => {
          console.log("error", error);
          setIsLoading(false);
        }
      );
  };

  const getListCourse = () => {
    setIsLoading(true);
    fetch("http://localhost:8000/wp-json/wp/v2/courses")
      .then((res) => res.json())
      .then(
        (result) => {
          const convertData = result.map((item: any) => ({
            value: `${item?.id}-${item?.acf?.title}`,
            label: item?.acf?.title,
          }));
          setListCourse(convertData);
          setIsLoading(false);
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
        title: values.title,
        course_type: values?.courseType,
        content: values.description,
        image: listImages[0],
        file_docs: listFiles[0],
        created_date:
          moment().format().slice(0, 10) +
          " " +
          moment().hour() +
          ":" +
          moment().minutes(),
        author: LocalStorage.getUserName() || "Jaden Smith",
        author_id: userInfor?.id,
      };
      fetch(`http://localhost:8000/wp-json/wp/v2/subjects`, {
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
          message.success("Thêm môn học mới thành công!");
          navigate(PROTECTED_ROUTES_PATH.STUDY_DOCUMENT);
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
        title: values.title,
        content: values.description,
        image: listImages[0],
        file_docs: listFiles[0],
      };
      fetch(`http://localhost:8000/wp-json/wp/v2/subjects/${targetId}`, {
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
          message.success("Chỉnh sửa môn học thành công!");
          navigate(PROTECTED_ROUTES_PATH.STUDY_DOCUMENT);
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

  React.useEffect(() => {
    if (targetId) getDetailData();
  }, [targetId]);

  React.useEffect(() => {
    getListCourse();
  }, []);

  return (
    <Spin spinning={isLoading}>
      <Container
        header={
          <PageHeader
            onBack={() => navigate(PROTECTED_ROUTES_PATH.STUDY_DOCUMENT)}
            style={{ borderRadius: 8 }}
            title={targetId ? "Chỉnh sửa môn học" : "Thêm mới môn học"}
            extra={[
              <ButtonAdd
                key={1}
                text="Lưu"
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
                  label="Tên môn học"
                  name="title"
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
                  name="courseType"
                  rules={[
                    { required: true, message: "Vui lòng chọn khoá học!" },
                  ]}
                >
                  <Select
                    disabled={targetId ? true : false}
                    placeholder="Chọn loại khoá học"
                    onChange={handleChange}
                    options={listCourse}
                  />
                </Form.Item>
              </Col>
            </Row>
            <br />
            <Row gutter={6}>
              <Col span={12}>
                <Form.Item label="Ảnh bìa môn học" name="image">
                  <UploadComponent
                    accept=".jpeg,.png, .jpg"
                    isUploadServerWhenUploading
                    uploadType="single"
                    listType="picture-card"
                    maxLength={1}
                    title="Tải ảnh"
                    initialFiles={
                      targetId
                        ? [
                            {
                              uid: targetId,
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
              <Col span={12}>
                <Form.Item
                  label="Ghi chú"
                  name="description"
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
            <Row gutter={6}>
              <Col span={12}>
                <Form.Item label="Tài liệu môn học" name="file">
                  <UploadComponent
                    accept=".pdf"
                    isUploadServerWhenUploading
                    uploadType="single"
                    listType="picture-card"
                    maxLength={1}
                    title="Tải file"
                    initialFiles={
                      targetId
                        ? [
                            {
                              uid: targetId,
                              name: "doc.pdf",
                              status: "done",
                              url: listFiles[0],
                            },
                          ]
                        : []
                    }
                    onSuccessUpload={(url: any) => setListFiles([url])}
                  />
                  <span style={{ color: "gray", fontSize: 12 }}>
                    * Vui lòng tải file dưới 2 MB
                  </span>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        }
      />
    </Spin>
  );
};

export default AddEditDoc;
