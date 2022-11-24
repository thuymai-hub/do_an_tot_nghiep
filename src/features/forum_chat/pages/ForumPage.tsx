import { PageHeader, Popconfirm, Table, Tag } from "antd";
import ButtonAdd from "components/Button/ButtonAdd";
import IconAntd from "components/IconAntd";
import Container from "container/Container";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PROTECTED_ROUTES_PATH } from "routes/RoutesPath";
import Filter from "../components/Filter";
import { ForumItem } from "../components/ForumItem";

const listNews = [
  {
    id: 1,
    title: "TITLE 1",
    createdDate: "20/10/2022",
    type: "Giới thiệu",
    loveCount: 10,
    status: 0,
  },
  {
    id: 2,
    title: "TITLE 1",
    createdDate: "20/10/2022",
    type: "Giới thiệu",
    loveCount: 20,
    status: 1,
  },
];

export const ForumPage: React.FC = () => {
  const columns = [
    {
      width: "70px",
      title: <b>STT</b>,
      dataIndex: "stt",
      render: (text: any, record: any, index: any) => (
        <span id={record.id}>
          {(paging.current - 1) * paging.pageSize + index + 1}
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
  const [paging, setPaging] = React.useState<any>({
    total: 0,
    current: 1,
    pageSize: 10,
  });
  const [params, setParams] = React.useState<any>({
    searchKey: "",
    page: 1,
    postType: "",
  });
  const searchRef: any = useRef();

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
          title="Danh sách bài viết diễn đàn"
          extra={[
            <ButtonAdd
              key={1}
              text="Thêm mới"
              onClickButton={() => {
                navigate(PROTECTED_ROUTES_PATH.ADD_EDIT_STUDY_FOURM_POSTS);
              }}
            />,
          ]}
        />
      }
      filterComponent={<Filter />}
      contentComponent={
        2 < 1 ? (
          <div>
            <p>
              Kết quả lọc: <b>{10}</b>
            </p>
            <Table
              bordered
              columns={columns}
              dataSource={listNews}
              scroll={{
                x: 800,
                y: 320,
                // scrollToFirstRowOnChange: true,
              }}
              locale={{
                emptyText: "Chưa có bản ghi nào!",
              }}
              pagination={{
                ...paging,
                showSizeChanger: false,
                onChange: async (page, pageSize) => {
                  setParams({ ...params, page });
                  const element: any = document.getElementById("top-table");
                  element.scrollIntoView({ block: "start" });
                },
              }}
            />
          </div>
        ) : (
          <div>
            {[1, 2, 3]?.map((item) => (
              <ForumItem key={item} />
            ))}
          </div>
        )
      }
    />
  );
};
