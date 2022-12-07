import { PageHeader, Spin, Table, Tabs } from "antd";
import ButtonAdd from "components/Button/ButtonAdd";
import IconAntd from "components/IconAntd";
import Container from "container/Container";
import React from "react";
import AddEditCourseModal from "../components/AddEditCourseModal";
import AddEditNewsTypeModal from "../components/AddEditNewsTypeModal";

const ConfigPage = () => {
  const columns = [
    {
      width: 60,
      title: <b>STT</b>,
      dataIndex: "stt",
      render: (text: any, record: any, index: any) => <span>{index + 1}</span>,
    },
    {
      title: <b>Loại bài viết</b>,
      dataIndex: "title",
    },
    {
      title: <b>Ngày tạo</b>,
      dataIndex: "date",
      width: 250,
    },
    // {
    //   title: <b>Chi tiết</b>,
    //   dataIndex: "",
    //   width: 100,
    //   render: (_: any, record: any) => {
    //     return (
    //       <>
    //         <a
    //           onClick={() => {
    //             setCurrentRecord(record);
    //             setIsNewsTypeModal(true);
    //           }}
    //         >
    //           <IconAntd icon="EditOutlined" fontSize={18} />
    //         </a>
    //       </>
    //     );
    //   },
    // },
  ];

  const columnsCourse = [
    {
      width: 60,
      title: <b>STT</b>,
      dataIndex: "stt",
      render: (text: any, record: any, index: any) => <span>{index + 1}</span>,
    },
    {
      title: <b>Khoá học</b>,
      dataIndex: "title",
    },
    {
      title: <b>Ngày tạo</b>,
      dataIndex: "date",
      width: 250,
    },
    // {
    //   title: <b>Chi tiết</b>,
    //   dataIndex: "",
    //   width: 100,
    //   render: (_: any, record: any) => {
    //     return (
    //       <>
    //         <a
    //           onClick={() => {
    //             setCurrentCourse(record);
    //             setIsCourseModal(true);
    //           }}
    //         >
    //           <IconAntd icon="EditOutlined" fontSize={18} />
    //         </a>
    //       </>
    //     );
    //   },
    // },
  ];
  const [loading, setLoading] = React.useState<boolean>(false);
  const [listNewsType, setListNewsTypes] = React.useState<any[]>([]);
  const [isNewsTypeModal, setIsNewsTypeModal] = React.useState<boolean>(false);
  const [currentRecord, setCurrentRecord] = React.useState<any>();
  const [listCourse, setListCourse] = React.useState<any[]>([]);
  const [isCourseModal, setIsCourseModal] = React.useState<boolean>(false);
  const [currentCourse, setCurrentCourse] = React.useState<any>();

  const getListNewsTypes = () => {
    setLoading(true);
    fetch("http://localhost:8000/wp-json/wp/v2/news_types")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("result:", result);
          const convertData = result.map((item: any) => ({
            id: item?.id,
            title: item?.acf?.title,
            date: item?.acf?.created_date,
          }));
          setListNewsTypes(convertData);
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
            id: item?.id,
            title: item?.acf?.title,
            date: item?.acf?.created_date,
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

  const renderCourseContent = () => {
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "20px 0",
          }}
        >
          <p>
            Kết quả: <strong>{listCourse?.length}</strong>{" "}
          </p>
          <ButtonAdd
            text="Thêm mới"
            onClickButton={() => {
              setIsCourseModal(true);
              setCurrentCourse(undefined);
            }}
          />
        </div>
        <Table
          bordered
          columns={columnsCourse}
          dataSource={listCourse}
          locale={{
            emptyText: "Chưa có bản ghi nào!",
          }}
        />
      </>
    );
  };

  const renderNewsTypeContent = () => {
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "20px 0",
          }}
        >
          <p>
            Kết quả: <strong>{listNewsType?.length}</strong>{" "}
          </p>
          <ButtonAdd
            text="Thêm mới"
            onClickButton={() => {
              setCurrentRecord(undefined);
              setIsNewsTypeModal(true);
            }}
          />
        </div>
        <Table
          bordered
          columns={columns}
          dataSource={listNewsType}
          locale={{
            emptyText: "Chưa có bản ghi nào!",
          }}
        />
      </>
    );
  };

  React.useEffect(() => {
    getListNewsTypes();
    getListCourse();
  }, []);

  return (
    <Spin spinning={loading}>
      <Container
        header={<PageHeader style={{ borderRadius: 8 }} title="Cấu hình" />}
        contentComponent={
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Loại bài viết" key="1">
              {renderNewsTypeContent()}
              {isNewsTypeModal && (
                <AddEditNewsTypeModal
                  isModalOpen={isNewsTypeModal}
                  setIsModalOpen={setIsNewsTypeModal}
                  getListNewsTypes={getListNewsTypes}
                  setLoading={setLoading}
                  detail={currentRecord}
                />
              )}
            </Tabs.TabPane>
            <Tabs.TabPane tab="Khoá học" key="2">
              {renderCourseContent()}
              {isCourseModal && (
                <AddEditCourseModal
                  isModalOpen={isCourseModal}
                  setIsModalOpen={setIsCourseModal}
                  getListCourse={getListCourse}
                  setLoading={setLoading}
                  detail={currentCourse}
                />
              )}
            </Tabs.TabPane>
          </Tabs>
        }
      />
    </Spin>
  );
};

export default ConfigPage;
