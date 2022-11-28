import { message, PageHeader, Popconfirm, Spin, Switch, Table } from "antd";
import ButtonAdd from "components/Button/ButtonAdd";
import IconAntd from "components/IconAntd";
import Container from "container/Container";
import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CliCookieService, CLI_COOKIE_KEYS } from "shared/services/cli-cookie";
import AddEditAccountModal from "../components/AddEditAccountModal";
import Filter from "../components/Filter";
import { IDetailAccount } from "../interface";

export const AccountPage: React.FC = () => {
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
    },
    {
      title: "Tên người dùng",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Loại tài khoản",
      dataIndex: "type",
      render: (value: string) => <div>{renderAccountType(value)}</div>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createAt",
      render: () => <div>{moment().format("DD/MM/YYYY")}</div>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (value: any, record: any) => (
        <Switch
          checked={value}
          onChange={() => changeStatus(record.id, value)}
        />
      ),
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
                setIsModalOpen(true);
                getDetailData(record.id);
              }}
            >
              <IconAntd icon="EditOutlined" fontSize={18} />
            </a>
            <Popconfirm
              title="Bạn có chắc chắn muốn xoá tài khoản này?"
              placement="top"
              onConfirm={() => onDelete(record.id)}
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
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [accountDetail, setAccountDetail] = React.useState<any>();
  const [totalItems, setTotalItems] = React.useState<number>(0);
  const [dataSource, setDataSource] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState<string>();
  const [fullDataSource, setFullDataSource] = React.useState<any>([]);
  const [accountType, setAccountType] = React.useState<number>();
  const [paging, setPaging] = React.useState<any>({
    total: 0,
    current: 1,
    pageSize: 10,
  });

  const renderAccountType = (value: string) => {
    switch (value) {
      case "1":
        return "Quản trị viên";
      case "2":
        return "Giảng viên";
      case "3":
        return "Sinh viên";

      default:
        break;
    }
  };

  const getDataSource = () => {
    setIsLoading(true);
    fetch("http://localhost:8000/wp-json/wp/v2/accounts")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(
            "🚀 ~ file: AccountPage.tsx ~ line 122 ~ getDataSource ~ result",
            result
          );
          const convertData = result.map((item: any, index: number) => ({
            stt: index + 1,
            id: item?.id,
            name: item?.acf?.name,
            createAt: item?.created_date,
            status: item?.acf?.status === "1" ? true : false,
            phone: item?.acf?.phone,
            email: item?.acf?.email,
            type: item?.acf?.account_type,
          }));
          setTotalItems(convertData.length);
          setDataSource(convertData);
          setFullDataSource(convertData);
          setIsLoading(false);
        },
        (error) => {
          console.log("error", error);
          setIsLoading(false);
        }
      );
  };

  const changeStatus = (id: number, current: any) => {
    setIsLoading(true);
    fetch(`http://localhost:8000/wp-json/wp/v2/accounts/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${CliCookieService.get(
          CLI_COOKIE_KEYS.ACCESS_TOKEN
        )}`,
      },
      body: JSON.stringify({
        fields: { status: current ? "0" : "1" },
        status: "publish",
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          message.success("Chỉnh sửa trạng thái tài khoản thành công!");
          getDataSource();
          setIsLoading(false);
        },
        (error) => {
          console.log("error", error);
          setIsLoading(false);
        }
      );
  };

  const onFinish = async (values: any) => {
    setIsLoading(true);
    if (!accountDetail) {
      const account = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        account_type: values.type,
        status: 1,
        password: values.password,
      };
      fetch(`http://localhost:8000/wp-json/wp/v2/accounts`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${CliCookieService.get(
            CLI_COOKIE_KEYS.ACCESS_TOKEN
          )}`,
        },
        body: JSON.stringify({
          fields: account,
          status: "publish",
          title: {
            raw: account.name,
            rendered: account.name,
          },
        }),
        method: "POST",
      })
        .then((res: any) => res.json())
        .then((res: any) => {
          setIsLoading(false);
          message.success("Thêm tài khoản mới thành công!");
          setIsModalOpen(false);
          getDataSource();
        })
        .catch((err) => {
          message.error("Đã có lỗi xảy ra!");
          console.log("error: ", err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      const account = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        account_type: values.type,
      };
      fetch(
        `http://localhost:8000/wp-json/wp/v2/accounts/${accountDetail.id}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${CliCookieService.get(
              CLI_COOKIE_KEYS.ACCESS_TOKEN
            )}`,
          },
          body: JSON.stringify({
            fields: account,
            status: "publish",
          }),
          method: "PUT",
        }
      )
        .then((res: any) => res.json())
        .then((res: any) => {
          setIsLoading(false);
          message.success("Chỉnh sửa tài khoản mới thành công!");
          setIsModalOpen(false);
          getDataSource();
        })
        .catch((err) => {
          message.error("Đã có lỗi xảy ra!");
          console.log("error: ", err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const onDelete = (id: string) => {
    setIsLoading(true);
    fetch(`http://localhost:8000/wp-json/wp/v2/accounts/${id}`, {
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
          message.success("Xoá tài khoản thành công!");
          setIsLoading(false);
        },
        (error) => {
          console.log("error", error);
          setIsLoading(false);
        }
      );
  };

  const onSearch = () => {
    if (search && !accountType) {
      setIsLoading(true);
      const matchedData = fullDataSource.filter((item: any) =>
        item?.name?.toLowerCase().includes(search?.toLocaleLowerCase())
      );

      setTimeout(() => {
        setIsLoading(false);
        setDataSource(matchedData);
        setTotalItems(matchedData.length);
      }, 500);
    } else if (!search && accountType) {
      console.log(
        "🚀 ~ file: AccountPage.tsx ~ line 226 ~ onSearch ~ accountType",
        accountType
      );
      setIsLoading(true);
      const matchedData = fullDataSource.filter(
        (item: any) => Number(item.type) === accountType
      );

      setTimeout(() => {
        setIsLoading(false);
        setDataSource(matchedData);
        setTotalItems(matchedData.length);
      }, 500);
    } else if (search && accountType) {
      setIsLoading(true);
      const matchedData = fullDataSource.filter(
        (item: any) =>
          Number(item.type) === accountType &&
          item.name.toLowerCase().includes(search?.toLocaleLowerCase())
      );

      setTimeout(() => {
        setIsLoading(false);
        setDataSource(matchedData);
        setTotalItems(matchedData.length);
      }, 500);
    } else {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setDataSource(fullDataSource);
        setTotalItems(fullDataSource.length);
      }, 500);
    }
  };

  const getDetailData = (id: number) => {
    setIsLoading(true);
    fetch(`http://localhost:8000/wp-json/wp/v2/accounts/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CliCookieService.get(
          CLI_COOKIE_KEYS.ACCESS_TOKEN
        )}`,
      },
    })
      .then((res: any) => res.json())
      .then(
        (result: any) => {
          setIsLoading(false);
          const data = {
            id: id,
            name: result?.acf?.name,
            phone: result?.acf?.phone,
            email: result?.acf?.email,
            type: Number(result?.acf?.account_type),
          };
          setAccountDetail(data);
        },
        (error) => {
          console.log("error", error);
          setIsLoading(false);
        }
      );
  };

  React.useEffect(() => {
    onSearch();
  }, [search, accountType]);

  React.useEffect(() => {
    getDataSource();
  }, []);

  return (
    <Spin spinning={isLoading}>
      <Container
        header={
          <PageHeader
            style={{ borderRadius: 8 }}
            title="Danh sách tài khoản"
            extra={[
              <ButtonAdd
                key={1}
                text="Thêm mới"
                onClickButton={() => {
                  setIsModalOpen(true);
                }}
              />,
            ]}
          />
        }
        filterComponent={
          <Filter
            search={search}
            setSearch={setSearch}
            accountType={accountType}
            setAccountType={setAccountType}
          />
        }
        contentComponent={
          <div>
            <p>
              Kết quả lọc: <b>{totalItems}</b>
            </p>
            <Table
              bordered
              columns={columns}
              dataSource={dataSource}
              scroll={{
                // x: 80,
                scrollToFirstRowOnChange: true,
              }}
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
            {isModalOpen && (
              <AddEditAccountModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                onFinish={onFinish}
                detailAccount={accountDetail}
              />
            )}
          </div>
        }
      />
    </Spin>
  );
};
