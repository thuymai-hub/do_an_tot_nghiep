import { Button, Input, PageHeader, Popconfirm, Spin, Table } from "antd";
import R from "assets";
import ButtonAdd from "components/Button/ButtonAdd";
import IconAntd from "components/IconAntd";
import Container from "container/Container";
import { NewsItemComp } from "features/news/components/NewsItemComp";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { PROTECTED_ROUTES_PATH } from "routes/RoutesPath";
import { useTableData } from "shared/hooks/useTableData";
import { mookData } from "shared/mookData/news";
import Filter from "../components/Filter";

const listPosts = [
  {
    id: 1,
    title: "TITLE 1",
    createdDate: "20/10/2022",
    type: "Giới thiệu",
    loveCount: 10,
  },
  {
    id: 2,
    title: "TITLE 1",
    createdDate: "20/10/2022",
    type: "Giới thiệu",
    loveCount: 20,
  },
];
export const EventPage: React.FC = () => {
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
      title: <b>Lượt yêu thích</b>,
      dataIndex: "loveCount",
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
                console.log("");
                navigate(PROTECTED_ROUTES_PATH.ADD_EDIT_STUDY_EVENTS, {
                  state: { id: 1 },
                });
              }}
            >
              <IconAntd icon="EditOutlined" fontSize={18} />
            </a>
            <Popconfirm
              title="Bạn có chắc chắn muốn xoá bài viết này?"
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
  const searchRef: any = useRef();
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
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
  useEffect(() => {
    getDataSource();
  }, []);

  const getDataSource = () => {
    setLoading(true);
    fetch("http://localhost:8000/wp-json/wp/v2/event")
      .then((res) => res.json())
      .then(
        (result) => {
          const convertData = result.map((newItem: any) => ({
            id: newItem.id,
            title: newItem.title?.rendered,
            imageUrl: `${R.images.logo_TL}`,
            contend: newItem.contend?.rendered,
            createAt: newItem.date,
          }));
          setDataSource(convertData);
          setLoading(false);
        },
        (error) => {
          console.log("error", error);
          setLoading(false);
        }
      );
  };

  const tranferPage = (mode = "add", id?: string | number) => {
    if (id) {
      navigate(`${PROTECTED_ROUTES_PATH.EVENTS}/${mode}/${id}`);
      return;
    } else {
      navigate(`${PROTECTED_ROUTES_PATH.EVENTS}/add`);
    }
  };

  const onSearch = (value: string) => {
    console.log("value", value);
  };

  const onDelete = (id: string) => {
    fetch(`http://localhost:8000/wp-json/wp/v2/event/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("run");

          getDataSource();
        },
        (error) => {
          console.log("error", error);
        }
      );
  };

  return (
    <Container
      header={
        <PageHeader
          style={{ borderRadius: 8 }}
          title="Bài viết sự kiện"
          extra={[
            <ButtonAdd
              key={1}
              text="Thêm mới"
              onClickButton={() => {
                navigate(PROTECTED_ROUTES_PATH.ADD_EDIT_STUDY_EVENTS);
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
            dataSource={listPosts}
            scroll={{
              // x: 1200,
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
      }
    />
  );
};
