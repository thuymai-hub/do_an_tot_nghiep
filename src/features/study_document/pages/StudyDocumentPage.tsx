import { message, PageHeader, Popconfirm, Spin, Table } from "antd";
import ButtonAdd from "components/Button/ButtonAdd";
import IconAntd from "components/IconAntd";
import Container from "container/Container";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PROTECTED_ROUTES_PATH } from "routes/RoutesPath";
import { CliCookieService, CLI_COOKIE_KEYS } from "shared/services/cli-cookie";
import Filter from "../components/Filter";

export const renderCourseType = (id: string) => {
  switch (id) {
    case "1":
      return "Công nghệ thông tin";
    case "2":
      return "Thiết kế đồ hoạ";
    case "3":
      return "Quản trị kinh doanh";
    default:
      break;
  }
};

export const StudyDocumentPage: React.FC = () => {
  const columns = [
    {
      width: "70px",
      title: <b>STT</b>,
      dataIndex: "stt",
      render: (text: any, record: any, index: any) => <div>{index + 1}</div>,
    },
    {
      title: <b>Tên môn học</b>,
      width: "30%",
      dataIndex: "title",
    },
    {
      title: <b>Tên khoá học</b>,
      width: "20%",
      dataIndex: "courseType",
    },
    {
      title: <b>Ngày tạo</b>,
      dataIndex: "createdDate",
      width: "15%",
    },
    {
      title: <b>Người tạo</b>,
      dataIndex: "author",
      width: "15%",
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
              title="Bạn có chắc chắn muốn xoá môn học này?"
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
  const [courseType, setCourseType] = React.useState<number>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [totalItem, setTotalItems] = React.useState<number>(0);
  const [dataSource, setDataSource] = React.useState<any>([]);
  const [fullDataSource, setFullDataSource] = React.useState<any>([]);
  const [search, setSearch] = React.useState<string>();
  const [listCourse, setListCourse] = React.useState<any[]>([]);

  const getDataSource = () => {
    setLoading(true);
    fetch("http://localhost:8000/wp-json/wp/v2/subjects")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("result:", result);
          const convertData = result.map((item: any) => ({
            id: item?.id,
            title: item?.acf?.title,
            createdDate: item?.date.slice(0, 10).split("-").reverse().join("-"),
            courseType: item?.acf?.course_type.split("-")[1],
            courseTypeFull: item?.acf?.course_type,
            author: item?.acf?.author,
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

  const onSearch = () => {
    if (search && !courseType) {
      setLoading(true);
      const matchedData = fullDataSource.filter((item: any) =>
        item?.title?.toLowerCase().includes(search?.toLocaleLowerCase())
      );

      setTimeout(() => {
        setLoading(false);
        setDataSource(matchedData);
        setTotalItems(matchedData.length);
      }, 500);
    } else if (!search && courseType) {
      setLoading(true);
      const matchedData = fullDataSource.filter(
        (item: any) =>
          Number(item?.courseTypeFull?.split("-")[0]) === courseType
      );

      setTimeout(() => {
        setLoading(false);
        setDataSource(matchedData);
        setTotalItems(matchedData.length);
      }, 500);
    } else if (search && courseType) {
      setLoading(true);
      const matchedData = fullDataSource.filter(
        (item: any) =>
          Number(item?.courseTypeFull?.split("-")[0]) === courseType &&
          item?.title?.toLowerCase().includes(search?.toLocaleLowerCase())
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

  const onDelete = (id: string) => {
    setLoading(true);
    fetch(`http://localhost:8000/wp-json/wp/v2/subjects/${id}`, {
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
          message.success("Xoá môn học thành công!");
          setLoading(false);
        },
        (error) => {
          console.log("error", error);
          setLoading(false);
        }
      );
  };

  const getListCourse = () => {
    setLoading(true);
    fetch("http://localhost:8000/wp-json/wp/v2/courses")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("result:", result);
          const convertData = result.map((item: any) => ({
            value: `${item?.id}-${item?.acf?.title}`,
            label: item?.acf?.title,
          }));
          setListCourse(convertData);
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
    getListCourse();
  }, []);

  React.useEffect(() => {
    onSearch();
  }, [search, courseType]);

  return (
    <Spin spinning={loading}>
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
        filterComponent={
          <Filter
            search={search}
            setSearch={setSearch}
            setCourseType={setCourseType}
            listCourse={listCourse}
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
              locale={{
                emptyText: "Chưa có bản ghi nào!",
              }}
            />
          </div>
        }
      />
    </Spin>
  );
};
