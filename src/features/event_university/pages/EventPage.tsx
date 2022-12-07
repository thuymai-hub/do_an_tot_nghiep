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
      width: "30%",
      dataIndex: "titlePost",
    },
    {
      title: <b>Lượt yêu thích</b>,
      dataIndex: "loveCount",
      width: 100,
    },
    {
      title: <b>Ngày bắt đầu</b>,
      dataIndex: "startDate",
      width: 120,
    },
    {
      title: <b>Ngày kết thúc</b>,
      dataIndex: "endDate",
      width: 120,
    },
    {
      title: <b>Trạng thái</b>,
      dataIndex: "status",
      width: 100,
      render: (value: string) => {
        if (value === "1") {
          return <Tag color="green">Hoạt động</Tag>;
        } else return <Tag color="red">Ngừng hoạt động</Tag>;
      },
    },
    {
      title: <b>Chi tiết</b>,
      dataIndex: "",
      width: 80,
      render: (_: any, record: any) => {
        return (
          <>
            <a
              onClick={() => {
                navigate(PROTECTED_ROUTES_PATH.ADD_EDIT_STUDY_EVENTS, {
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
  console.log("🚀 ~ file: EventPage.tsx:101 ~ dataSource", dataSource);
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
    setLoading(true);
    if (search) {
      const matchedData = fullDataSource.filter((item: any) =>
        item?.titlePost?.toLowerCase().includes(search?.toLocaleLowerCase())
      );

      setTimeout(() => {
        setLoading(false);
        setDataSource(matchedData);
        setTotalItems(matchedData.length);
      }, 500);
    } else {
      setDataSource(fullDataSource);
    }
  };

  const getDataSource = () => {
    setLoading(true);
    fetch("http://localhost:8000/wp-json/wp/v2/event_posts")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("result:", result);
          const convertData = result.map((item: any) => ({
            id: item?.id,
            titlePost: item?.acf?.title,
            createdDate: item?.date.slice(0, 10).split("-").reverse().join("-"),
            loveCount: item?.acf?.love_count,
            postType: item?.acf?.post_type,
            startDate: item?.acf?.start_date,
            endDate: item?.acf?.end_date,
            status: item?.acf?.status,
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
    fetch(`http://localhost:8000/wp-json/wp/v2/event_posts/${id}`, {
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
          message.success("Xoá sự kiện thành công!");
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
  }, [search]);

  return (
    <Spin spinning={loading}>
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
        filterComponent={<Filter search={search} setSearch={setSearch} />}
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
