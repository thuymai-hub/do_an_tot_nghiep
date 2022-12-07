import { message, PageHeader, Popconfirm, Spin, Table, Tag } from "antd";
import ButtonAdd from "components/Button/ButtonAdd";
import IconAntd from "components/IconAntd";
import Container from "container/Container";
import React from "react";
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

export const renderPostType = (id: string) => {
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
      width: "30%",
      dataIndex: "titlePost",
    },
    {
      title: <b>Loại bài viết</b>,
      width: "12%",
      dataIndex: "postType",
    },
    // {
    //   title: <b>Lượt yêu thích</b>,
    //   dataIndex: "loveCount",
    // },
    // {
    //   title: <b>Trạng thái</b>,
    //   dataIndex: "status",
    //   render: (value: string) => {
    //     if (value === "1") {
    //       return <Tag color="green">Phê duyệt</Tag>;
    //     } else return <Tag color="red">Chờ phê duyệt</Tag>;
    //   },
    // },
    {
      title: <b>Ngày tạo</b>,
      dataIndex: "createdDate",
      width: 150,
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
  const [listTypes, setListTyoes] = React.useState<Array<any>>([]);
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
        item?.titlePost?.toLowerCase().includes(search?.toLocaleLowerCase())
      );

      setTimeout(() => {
        setLoading(false);
        setDataSource(matchedData);
        setTotalItems(matchedData.length);
      }, 500);
    } else if (!search && postType) {
      setLoading(true);
      const matchedData = fullDataSource.filter(
        (item: any) => Number(item?.postTypeFull?.split("-")[0]) === postType
      );

      setTimeout(() => {
        setLoading(false);
        setDataSource(matchedData);
        setTotalItems(matchedData.length);
      }, 500);
    } else if (search && postType) {
      console.log(
        "🚀 ~ file: NewsPage.tsx ~ line 160 ~ onSearch ~ search",
        search
      );
      setLoading(true);
      const matchedData = fullDataSource.filter(
        (item: any) =>
          Number(item?.postTypeFull?.split("-")[0]) === postType &&
          item?.titlePost?.toLowerCase().includes(search?.toLocaleLowerCase())
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

  const getDataSource = () => {
    setLoading(true);
    fetch("http://localhost:8000/wp-json/wp/v2/posts?post_status=any")
      .then((res) => res.json())
      .then(
        (result) => {
          const convertData = result.map((item: any) => ({
            id: item?.id,
            titlePost: item?.acf?.title_post,
            createdDate: item?.date.slice(0, 10).split("-").reverse().join("-"),
            loveCount: item?.acf?.love_count,
            postType: item?.acf?.post_type.split("-")[1],
            postTypeFull: item?.acf?.post_type,
            status: item?.acf?.is_confirmed,
          }));
          setTotalItems(convertData.length);
          setDataSource(convertData);
          setFullDataSource(convertData);
          setLoading(false);
          console.log(
            "🚀 ~ file: NewsPage.tsx:201 ~ getDataSource ~ convertData",
            convertData
          );
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

  const getListNewsTypes = () => {
    setLoading(true);
    fetch("http://localhost:8000/wp-json/wp/v2/news_types")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("result:", result);
          const convertData = result.map((item: any) => ({
            value: `${item?.id}-${item?.acf?.title}`,
            label: item?.acf?.title,
          }));
          setListTyoes(convertData);
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
    getListNewsTypes();
  }, []);

  // React.useEffect(() => {
  //   onSearch();
  // }, [search, postType]);

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
            typePosts={listTypes}
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
              scroll={
                {
                  // x: 1200,
                  // y: 320,
                  // scrollToFirstRowOnChange: true,
                }
              }
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
