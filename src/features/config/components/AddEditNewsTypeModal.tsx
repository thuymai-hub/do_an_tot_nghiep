import { Button, Form, Input, message, Modal, Row } from "antd";
import moment from "moment";
import React from "react";
import { CliCookieService, CLI_COOKIE_KEYS } from "shared/services/cli-cookie";
import { NAME_REGEX } from "shared/utils/CONSTANT";

interface IAddEditNewsTypeModal {
  isModalOpen: boolean;
  detail?: any;
  setIsModalOpen: any;
  getListNewsTypes: any;
  setLoading: any;
}

const AddEditNewsTypeModal = (props: IAddEditNewsTypeModal) => {
  const { isModalOpen, detail, setIsModalOpen, getListNewsTypes, setLoading } =
    props;
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    if (!detail) {
      const newsType = {
        title: values?.title,
        created_date: moment().format("DD-MM-YYYY"),
      };

      fetch(`http://localhost:8000/wp-json/wp/v2/news_types`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${CliCookieService.get(
            CLI_COOKIE_KEYS.ACCESS_TOKEN
          )}`,
        },
        body: JSON.stringify({
          fields: newsType,
          title: {
            raw: newsType.title,
            rendered: newsType.title,
          },
          status: "publish",
        }),
        method: "POST",
      })
        .then((res: any) => res.json())
        .then((res: any) => {
          setLoading(false);
          message.success("Thêm loại bài mới thành công!");
          getListNewsTypes();
          setIsModalOpen(false);
          form.resetFields();
        })
        .catch((err) => {
          message.error("Đã có lỗi xảy ra!");
          console.log("error: ", err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      const newsType = {
        title: values?.title,
        created_date: moment().format("DD-MM-YYYY"),
      };

      fetch(`http://localhost:8000/wp-json/wp/v2/news_types/${detail.id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${CliCookieService.get(
            CLI_COOKIE_KEYS.ACCESS_TOKEN
          )}`,
        },
        body: JSON.stringify({
          fields: newsType,
          title: {
            raw: newsType.title,
            rendered: newsType.title,
          },
          status: "publish",
        }),
        method: "PUT",
      })
        .then((res: any) => res.json())
        .then((res: any) => {
          setLoading(false);
          message.success("Chỉnh sửa loại bài thành công!");
          getListNewsTypes();
          setIsModalOpen(false);
          form.resetFields();
        })
        .catch((err) => {
          message.error("Đã có lỗi xảy ra!");
          console.log("error: ", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  React.useEffect(() => {
    if (detail) {
      form.setFieldsValue({ title: detail.title });
    }
  }, [detail]);

  return (
    <Modal
      title={detail ? "Cập nhật loại bài viết" : "Thêm mới loại bài viết"}
      open={isModalOpen}
      onOk={() => {}}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
    >
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Loại bài viết"
          name="title"
          rules={[
            { required: true, message: "Vui lòng nhập loại bài viết!" },
            { max: 65, message: "Vui lòng nhập không quá 65 ký tự!" },
            {
              message: "Tên loại bài viết không đúng định dạng!",
              validator: (_, value) => {
                if (!NAME_REGEX.test(value) || !value) {
                  return Promise.resolve();
                }
                return Promise.reject();
              },
            },
          ]}
        >
          <Input autoComplete="off" allowClear placeholder="Loại bài viết" />
        </Form.Item>
        <Row justify={"center"}>
          <Button
            type="default"
            style={{ marginRight: 10 }}
            onClick={() => setIsModalOpen(false)}
          >
            Huỷ
          </Button>
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddEditNewsTypeModal;
