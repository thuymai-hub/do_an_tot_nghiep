import { Button, Input, PageHeader, Popconfirm, Table } from "antd";
import ButtonAdd from "components/Button/ButtonAdd";
import IconAntd from "components/IconAntd";
import Container from "container/Container";
import React, { useRef, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsRecord } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { PROTECTED_ROUTES_PATH } from "routes/RoutesPath";
import { useTableData } from "shared/hooks/useTableData";
import Filter from "../components/Filter";

interface TFilter {
  page?: number;
  search?: string;
}

const listNews = [
  {
    id: 1,
    title: "TITLE 1",
    createdDate: "20/10/2022",
    type: "Giới thiệu",
    loveCount: 10,
    course: "Khoá 1",
  },
  {
    id: 2,
    title: "TITLE 1",
    createdDate: "20/10/2022",
    type: "Giới thiệu",
    loveCount: 20,
    course: "Khoá 2",
  },
];
export const StudyDocumentPage: React.FC = () => {
  const columns = [
    {
      width: "70px",
      title: <b>STT</b>,
      dataIndex: "stt",
      render: (text: any, record: any, index: any) => (
        <td id={record.id}>
          {(paging.current - 1) * paging.pageSize + index + 1}
        </td>
      ),
    },
    {
      title: <b>Tên môn học</b>,
      width: "35%",
      dataIndex: "title",
    },
    {
      title: <b>Tên khoá học</b>,
      width: "35%",
      dataIndex: "course",
    },
    {
      title: <b>Ngày tạo</b>,
      dataIndex: "createdDate",
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
                navigate(PROTECTED_ROUTES_PATH.ADD_EDIT_STUDY_DOCUMENT, {
                  state: { id: record.id },
                });
              }}
            >
              <IconAntd icon="EditOutlined" fontSize={18} />
            </a>
            <Popconfirm
              title="Bạn có chắc chắn muốn xoá khoá học này?"
              placement="top"
              onConfirm={() => {
                console.log("");
              }}
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
  const [expandFilter, setExpandFilter] = useState<TFilter>({
    search: "",
    page: 1,
  });
  const searchRef: any = useRef();
  const [paging, setPaging] = React.useState<any>({
    total: 0,
    current: 1,
    pageSize: 10,
  });

  return (
    <Container
      header={
        <PageHeader
          style={{ borderRadius: 8 }}
          title="Danh sách môn học"
          extra={[
            <ButtonAdd
              key={1}
              text="Thêm mới"
              onClickButton={() => {
                navigate(PROTECTED_ROUTES_PATH.ADD_EDIT_STUDY_DOCUMENT);
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
            dataSource={listNews}
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
        </div>
      }
    />
  );
};
