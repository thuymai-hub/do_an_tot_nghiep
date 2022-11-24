import { message, PageHeader, Popconfirm, Spin, Table } from "antd";
import ButtonAdd from "components/Button/ButtonAdd";
import IconAntd from "components/IconAntd";
import Container from "container/Container";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PROTECTED_ROUTES_PATH } from "routes/RoutesPath";
import { CliCookieService, CLI_COOKIE_KEYS } from "shared/services/cli-cookie";
import Filter from "../components/Filter";

export interface ITypePost {
  label: string;
  value: number;
}

export const typePosts = [
  { label: "Giới thiệu", value: 1 },
  { label: "Tuyển sinh", value: 2 },
  { label: "Đào tạo", value: 3 },
  { label: "Nghiên cứu", value: 4 },
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
      dataIndex: "postType",
      render: (value: string) => renderPostType(value),
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
                  state: { id: record?.id },
                });
              }}
            >
              <IconAntd icon="EditOutlined" fontSize={18} />
            </a>
            <Popconfirm
              title="Bạn có chắc chắn muốn xoá bài viết này?"
              placement="top"
              onConfirm={() => {
                onDelete(record?.id);
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
  const [postType, setPostType] = React.useState<number>();
  const [totalItem, setTotalItems] = React.useState<number>(0);
  const [dataSource, setDataSource] = React.useState<any>([]);
  const [fullDataSource, setFullDataSource] = React.useState<any>([]);
  const [search, setSearch] = React.useState<string>();
  const [loading, setLoading] = React.useState<boolean>(false);
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

  const onSearch = () => {
    if (search && !postType) {
      setLoading(true);
      const matchedData = fullDataSource.filter((item: any) =>
        item.title.toLowerCase().includes(search?.toLocaleLowerCase())
      );

      setTimeout(() => {
        setLoading(false);
        setDataSource(matchedData);
        setTotalItems(matchedData.length);
      }, 500);
    } else if (!search && postType) {
      setLoading(true);
      const matchedData = fullDataSource.filter(
        (item: any) => Number(item.postType) === postType
      );

      setTimeout(() => {
        setLoading(false);
        setDataSource(matchedData);
        setTotalItems(matchedData.length);
      }, 500);
    } else if (search && postType) {
      setLoading(true);
      const matchedData = fullDataSource.filter(
        (item: any) =>
          Number(item.postType) === postType &&
          item.title.toLowerCase().includes(search?.toLocaleLowerCase())
      );

      setTimeout(() => {
        setLoading(false);
        setDataSource(matchedData);
        setTotalItems(matchedData.length);
      }, 500);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setDataSource(fullDataSource);
        setTotalItems(fullDataSource.length);
      }, 500);
    }
  };

  const renderPostType = (id: string) => {
    switch (id) {
      case "1":
        return "Giới thiệu";
      case "2":
        return "Tuyển sinh";
      case "3":
        return "Đào tạo";
      case "4":
        return "Nghiên cứu";
      default:
        break;
    }
  };

  const getDataSource = () => {
    setLoading(true);
    fetch("http://localhost:8000/wp-json/wp/v2/posts?post_status=any")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("result:", result);
          const convertData = result.map((item: any) => ({
            id: item?.id,
            title: item?.acf?.title,
            createdDate: item?.date.slice(0, 10).split("-").reverse().join("-"),
            loveCount: item?.acf?.love_count,
            postType: item?.acf?.post_type,
          }));
          setTotalItems(convertData.length);
          setDataSource(convertData);
          setFullDataSource(convertData);
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
          message.success("Xoá bài viết thành công!");
          setLoading(false);
        },
        (error) => {
          console.log("error", error);
          setLoading(false);
        }
      );
  };

  React.useEffect(() => {
    getDataSource();
  }, []);

  React.useEffect(() => {
    onSearch();
  }, [search, postType]);

  return (
    <Spin spinning={loading}>
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
        filterComponent={
          <Filter
            typePosts={typePosts}
            search={search}
            setSearch={setSearch}
            setPostType={setPostType}
          />
        }
        contentComponent={
          <div>
            <p>
              Kết quả lọc: <b>{totalItem}</b>
            </p>
            <Table
              bordered
              columns={columns}
              dataSource={dataSource}
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
    </Spin>
  );
};
