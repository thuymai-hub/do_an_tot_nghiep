import { Button, Form, Input, Modal, Row, Select } from "antd";
import React from "react";
import {
  EMAIL_REGEX,
  EMAIL_REGEX_2,
  NAME_REGEX,
  PHONE_REGEX,
} from "shared/utils/CONSTANT";
import { IDetailAccount } from "../interface";

interface IAddEditAccountModal {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onFinish: (form: any) => Promise<void>;
  detailAccount: IDetailAccount | undefined;
}

const accountTypes = [
  {
    id: 1,
    value: 1,
    label: "Quản trị viên",
  },
  {
    id: 2,
    value: 2,
    label: "Giảng viên",
  },
  {
    id: 3,
    value: 3,
    label: "Sinh viên",
  },
];

const AddEditAccountModal = (props: IAddEditAccountModal) => {
  const { isModalOpen, setIsModalOpen, onFinish, detailAccount } = props;
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const [form] = Form.useForm();

  React.useEffect(() => {
    form.setFieldsValue({
      name: detailAccount?.name,
      email: detailAccount?.email,
      phone: detailAccount?.phone,
      accountType: detailAccount?.accountType,
    });
  }, [detailAccount]);
  return (
    <Modal
      title={detailAccount ? "Cập nhật tài khoản" : "Thêm mới tài khoản"}
      open={isModalOpen}
      onOk={() => onFinish(form)}
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
          label="Tên người dùng"
          name="name"
          rules={[
            { required: true, message: "Vui lòng nhập họ tên!" },
            { max: 65, message: "Vui lòng nhập không quá 65 ký tự!" },
            {
              message: "Tên không đúng định dạng!",
              validator: (_, value) => {
                if (!NAME_REGEX.test(value) || !value) {
                  return Promise.resolve();
                }
                return Promise.reject();
              },
            },
          ]}
        >
          <Input autoComplete="off" allowClear placeholder="Họ tên" />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại!" },
            { max: 10, message: "Vui lòng nhập đúng 10 ký tự!" },
            {
              message: "Số điện thoại không đúng định dạng!",
              validator: (_, value) => {
                if (PHONE_REGEX.test(value) || !value || value.length > 10) {
                  return Promise.resolve();
                }
                return Promise.reject();
              },
            },
          ]}
        >
          <Input
            disabled={false}
            allowClear
            placeholder="Số điện thoại"
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
        </Form.Item>
        <Form.Item
          label="Loại tài khoản"
          name="accountType"
          rules={[{ required: true, message: "Vui lòng chọn loại tài khoản!" }]}
        >
          <Select
            placeholder="Chọn loại tài khoản"
            onChange={handleChange}
            options={accountTypes}
          />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { max: 100, message: "Vui lòng nhập không quá 100 ký tự!" },
            {
              message: "Email không đúng định dạng!",
              validator: (_, value) => {
                if (
                  (EMAIL_REGEX.test(value) && EMAIL_REGEX_2.test(value)) ||
                  !value ||
                  value.length > 100
                ) {
                  return Promise.resolve();
                }
                return Promise.reject();
              },
            },
          ]}
        >
          <Input autoComplete="off" allowClear placeholder="Email" />
        </Form.Item>

        {!detailAccount && (
          <>
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu!" },
                { min: 6, message: "Mật khẩu chứa tối thiểu 6 ký tự!" },
                { max: 65, message: "Mật khẩu chứa tối đa 65 ký tự!" },
                {
                  whitespace: true,
                  message: "Mật khẩu không thể chứa khoảng trắng!",
                },
              ]}
            >
              <Input.Password
                autoComplete="off"
                allowClear
                placeholder="Nhập mật khẩu"
              />
            </Form.Item>
            <Form.Item
              label="Nhập lại mật khẩu"
              name="confimedPassword"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu xác nhận!" },
                {
                  message: "Mật khẩu không khớp!",
                  validator: (_, value) => {
                    if (value === form.getFieldValue("password") || !value) {
                      return Promise.resolve();
                    }
                    return Promise.reject();
                  },
                },
              ]}
            >
              <Input.Password allowClear placeholder="Nhập lại mật khẩu" />
            </Form.Item>
          </>
        )}
        <br />
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

export default AddEditAccountModal;
