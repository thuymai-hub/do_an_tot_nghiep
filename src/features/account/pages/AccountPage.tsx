import { Button, Input, PageHeader, Popconfirm, Table } from "antd";
import ButtonAdd from "components/Button/ButtonAdd";
import IconAntd from "components/IconAntd";
import Container from "container/Container";
import moment from "moment";
import React, { useRef, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useTableData } from "shared/hooks/useTableData";
import AddEditAccountModal from "../components/AddEditAccountModal";
import Filter from "../components/Filter";
import { IDetailAccount } from "../interface";

const { Search } = Input;
interface TFilter {
  page?: number;
  search?: string;
}

const data = [
  {
    key: "1",
    stt: 1,
    id: 1,
    name: "Mai Ánh Thùy",
    type: "Sinh viên",
  },
  {
    key: "2",
    stt: 2,
    id: 2,
    name: "Nguyễn Văn A",
    type: "Admin",
  },
  {
    key: "3",
    stt: 2,
    id: 3,
    name: "Nguyễn Văn B",
    type: "Giảng viên",
  },
];

export const AccountPage: React.FC = () => {
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Tên tài khoản",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Loại tài khoản",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createAt",
      key: "createAt",
      render: () => <div>{moment().format("DD/MM/YYYY")}</div>,
    },
    {
      title: <b>Chi tiết</b>,
      dataIndex: "",
      width: 100,
      render: (_: any, record: any) => {
        return (
          <>
            <a
              onClick={() => {
                setIsModalOpen(true);
                getDetailAccount(record.id);
              }}
            >
              <IconAntd icon="EditOutlined" fontSize={18} />
            </a>
            <Popconfirm
              title="Bạn có chắc chắn muốn xoá tài khoản này?"
              placement="top"
              onConfirm={() => {}}
              okText="Xoá"
              cancelText="Huỷ"
              okButtonProps={{
                type: "primary",
                danger: true,
              }}
              style={{ background: "red" }}
            >
              <a style={{ color: "red" }} href="#">
                <IconAntd icon="DeleteOutlined" fontSize={18} marginLeft={20} />
              </a>
            </Popconfirm>
          </>
        );
      },
    },
  ];
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [detailAccount, setDetailAccount] = React.useState<IDetailAccount>();
  const [paging, setPaging] = React.useState<any>({
    total: 0,
    current: 1,
    pageSize: 10,
  });

  const onFinish = async (form: any) => {
    try {
      console.log("FORM: ", form);
      setIsLoading(true);
      setIsModalOpen(false);
    } catch (error) {
      console.log("ERROR: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getDetailAccount = async (id: number) => {
    try {
      setIsLoading(true);
      const data = {
        name: "Defaul",
        phone: "0961638946",
        accountType: 1,
        email: "a@gmail.com",
      };
      setDetailAccount(data);
    } catch (error) {
      console.log("ERROR: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container
      header={
        <PageHeader
          style={{ borderRadius: 8 }}
          title="Danh sách tài khoản"
          extra={[
            <ButtonAdd
              key={1}
              text="Thêm mới"
              onClickButton={() => {
                setIsModalOpen(true);
              }}
            />,
          ]}
        />
      }
      filterComponent={<Filter />}
      contentComponent={
        <div>
          <p>
            Kết quả lọc: <b>{10}</b>
          </p>
          <Table
            bordered
            columns={columns}
            dataSource={data}
            scroll={{
              x: 1200,
              scrollToFirstRowOnChange: true,
            }}
            locale={{
              emptyText: "Chưa có bản ghi nào!",
            }}
            pagination={{
              ...paging,
              showSizeChanger: false,
              onChange: async (page, pageSize) => {
                setPaging({ ...paging, page });
                const element: any = document.getElementById("top-table");
                element.scrollIntoView({ block: "start" });
              },
            }}
          />
          {isModalOpen && (
            <AddEditAccountModal
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              onFinish={onFinish}
              detailAccount={detailAccount}
            />
          )}
        </div>
      }
    />
  );
};
