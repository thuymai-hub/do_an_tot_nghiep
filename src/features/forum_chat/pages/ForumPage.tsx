import { Button, Input, PageHeader, Popconfirm, Tag } from "antd";
import ButtonAdd from "components/Button/ButtonAdd";
import IconAntd from "components/IconAntd";
import Container from "container/Container";
import React, { useRef, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { PROTECTED_ROUTES_PATH } from "routes/RoutesPath";
import { useTableData } from "shared/hooks/useTableData";
import { ForumItem } from "../components/ForumItem";

export const ForumPage: React.FC = () => {
  const columns = [
    {
      width: "70px",
      title: <b>STT</b>,
      dataIndex: "stt",
      render: (text: any, record: any, index: any) => (
        <span id={record.id}>
          {/* {(paging.current - 1) * paging.pageSize + index + 1} */}index
        </span>
      ),
    },
    {
      title: <b>Tiêu đề</b>,
      width: "35%",
      dataIndex: "title",
    },
    {
      title: <b>Loại bài viết</b>,
      width: "20%",
      dataIndex: "type",
    },
    {
      width: 150,
      title: <b>Lượt yêu thích</b>,
      dataIndex: "loveCount",
    },
    {
      width: 150,
      title: <b>Ngày tạo</b>,
      dataIndex: "createdDate",
    },
    {
      width: 180,
      title: <b>Trạng thái</b>,
      dataIndex: "status",
      render: (value: any) => {
        if (value === 0) {
          return <Tag color="red">Chưa phê duyệt</Tag>;
        } else return <Tag color="green">Đã phê duyệt</Tag>;
      },
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
                navigate(PROTECTED_ROUTES_PATH.ADD_EDIT_STUDY_FOURM_POSTS, {
                  state: { id: 1 },
                });
              }}
            >
              <IconAntd icon="EditOutlined" fontSize={18} />
            </a>
            <Popconfirm
              title="Bạn có chắc chắn muốn xoá bài viết này?"
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

  const tranferPage = (mode = "add", id?: string | number) => {
    if (id) {
      navigate(`${PROTECTED_ROUTES_PATH.FORUM}/${mode}/${id}`);
      return;
    } else {
      navigate(`${PROTECTED_ROUTES_PATH.FORUM}/add`);
    }
  };
  const onSearch = (value: string) => {
    console.log("value", value);
  };

  return (
    <Container
      header={
        <PageHeader
          style={{ borderRadius: 8 }}
          title="Danh sách tài khoản"
          extra={[
            <ButtonAdd key={1} text="Thêm mới" onClickButton={() => {}} />,
          ]}
        />
      }
      // filterComponent={<Filter />}
      contentComponent={
        <div>
          {[1, 2, 3]?.map((item) => (
            <ForumItem key={item} />
          ))}
        </div>
      }
    />
  );
};
