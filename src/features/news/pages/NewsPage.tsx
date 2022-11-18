import {
  Button,
  Input,
  PageHeader,
  Popconfirm,
  Row,
  Select,
  Spin,
  Table,
} from "antd";
import R from "assets";
import ButtonAdd from "components/Button/ButtonAdd";
import IconAntd from "components/IconAntd";
import Container from "container/Container";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { PROTECTED_ROUTES_PATH } from "routes/RoutesPath";
import { CliCookieService, CLI_COOKIE_KEYS } from "shared/services/cli-cookie";
import Filter from "../components/Filter";
import { NewsItemComp } from "../components/NewsItemComp";

export interface ITypePost {
  label: string;
  value: number;
}

const listNews = [
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

export const typePosts = [
  { label: "Giới thiệu", value: 1 },
  { label: "Tuyển sinh", value: 2 },
  { label: "Đào tạo", value: 3 },
  { label: "Nghiên cứu", value: 4 },
  { label: "Sinh viên", value: 5 },
];

export const NewsPage: React.FC = () => {
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
                navigate(PROTECTED_ROUTES_PATH.ADD_EDIT_STUDY_NEWS, {
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
                onDelete(record.id);
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
    fetch("http://localhost:8000/wp-json/wp/v2/posts")
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
      navigate(`${PROTECTED_ROUTES_PATH.NEWS}/${mode}/${id}`);
      return;
    } else {
      navigate(`${PROTECTED_ROUTES_PATH.NEWS}/${mode}`);
    }
  };

  const onSearch = (value: string) => {
    console.log("value", value);
  };

  const handleChangeSelect = (value: string) => {
    console.log("value", value);
  };

  const onDelete = (id: string) => {
    setLoading(true);
    fetch(`http://localhost:8000/wp-json/wp/v2/posts/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${CliCookieService.get(
          CLI_COOKIE_KEYS.ACCESS_TOKEN
        )}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          getDataSource();
          setLoading(false);
        },
        (error) => {
          console.log("error", error);
          setLoading(false);
        }
      );
  };

  return (
    <Container
      header={
        <PageHeader
          style={{ borderRadius: 8 }}
          title="Danh sách bài viết"
          extra={[
            <ButtonAdd
              key={1}
              text="Thêm mới"
              onClickButton={() => {
                navigate(PROTECTED_ROUTES_PATH.ADD_EDIT_STUDY_NEWS);
              }}
            />,
          ]}
        />
      }
      filterComponent={<Filter typePosts={typePosts} />}
      contentComponent={
        <div>
          <p>
            Kết quả lọc: <b>{10}</b>
          </p>
          <Table
            bordered
            columns={columns}
            dataSource={listNews}
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
