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
          setListFiles(result?.acf?.file_docs.split(","));
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
        file_docs: `${listFiles}`,
        created_date:
          moment().format().slice(0, 10) +
          " " +
          moment().hour() +
          ":" +
          moment().minutes(),
        author: LocalStorage.getUserName() || "Jaden Smith",
        author_id: userInfor?.id,
      };
      console.log("listFiles: ", listFiles);
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
          message.success("Th??m m??n h???c m???i th??nh c??ng!");
          navigate(PROTECTED_ROUTES_PATH.STUDY_DOCUMENT);
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
          message.success("Ch???nh s???a m??n h???c th??nh c??ng!");
          navigate(PROTECTED_ROUTES_PATH.STUDY_DOCUMENT);
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
            title={targetId ? "Ch???nh s???a m??n h???c" : "Th??m m???i m??n h???c"}
            extra={[
              <ButtonAdd
                key={1}
                text="L??u"
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
                  label="T??n m??n h???c"
                  name="title"
                  rules={[
                    { required: true, message: "Vui l??ng nh???p t??n m??n h???c!" },
                  ]}
                >
                  <Input allowClear placeholder="Nh???p t??n m??n h???c" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Kho?? h???c"
                  name="courseType"
                  rules={[
                    { required: true, message: "Vui l??ng ch???n kho?? h???c!" },
                  ]}
                >
                  <Select
                    disabled={targetId ? true : false}
                    placeholder="Ch???n lo???i kho?? h???c"
                    onChange={handleChange}
                    options={listCourse}
                  />
                </Form.Item>
              </Col>
            </Row>
            <br />
            <Row gutter={6}>
              <Col span={12}>
                <Form.Item label="???nh b??a m??n h???c" name="image">
                  <UploadComponent
                    accept=".jpeg,.png, .jpg"
                    isUploadServerWhenUploading
                    uploadType="single"
                    listType="picture-card"
                    maxLength={1}
                    title="T???i ???nh"
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
                  label="Ghi ch??"
                  name="description"
                  rules={[
                    {
                      whitespace: true,
                      message: "Vui l??ng kh??ng nh???p kho???ng tr???ng!",
                    },
                  ]}
                >
                  <Input.TextArea
                    allowClear
                    rows={5}
                    placeholder="Nh???p ghi ch??"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={6}>
              <Col span={12}>
                <Form.Item label="T??i li???u m??n h???c" name="file">
                  <UploadComponent
                    accept=".pdf"
                    isUploadServerWhenUploading
                    uploadType="list"
                    listType="picture-card"
                    maxLength={4}
                    title="T???i file"
                    initialFiles={
                      targetId
                        ? listFiles.map((item: any, index: number) => ({
                            uid: index,
                            name: `doc${index}.pdf`,
                            status: "done",
                            url: item,
                          }))
                        : []
                    }
                    onSuccessUpload={(url: any) => {
                      listFiles.push(url);
                      setListFiles(listFiles);
                    }}
                    onSuccessRemove={(index: number) => {
                      const newList = listFiles
                        .slice(0, index)
                        .concat(listFiles.slice(index + 1, 5));
                      setListFiles(newList);
                    }}
                  />
                  <span style={{ color: "gray", fontSize: 12 }}>
                    * Vui l??ng t???i file d?????i 2 MB
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
