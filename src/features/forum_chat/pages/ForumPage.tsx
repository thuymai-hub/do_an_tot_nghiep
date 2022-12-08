import { message, PageHeader, Popconfirm, Spin, Tag } from "antd";
import LocalStorage from "apis/LocalStorage";
import ButtonAdd from "components/Button/ButtonAdd";
import IconAntd from "components/IconAntd";
import Container from "container/Container";
import { typePosts } from "features/news/pages/NewsPage";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PROTECTED_ROUTES_PATH } from "routes/RoutesPath";
import { CliCookieService, CLI_COOKIE_KEYS } from "shared/services/cli-cookie";
import Filter from "../components/Filter";
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
                // navigate(PROTECTED_ROUTES_PATH.ADD_EDIT_STUDY_FOURM_POSTS, {
                //   state: { id: 1 },
                // });
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
  const userInfor = useSelector((state: any) => state?.user?.user);
  const [search, setSearch] = React.useState<string>();
  const [status, setStatus] = React.useState<number>();
  const [dataSource, setDataSource] = React.useState<any[]>();
  const [fullDataSource, setFullDataSource] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const checkAlreadyLike = (arr: string) => {
    const listIds = JSON.parse(arr);
    console.log(
      "🚀 ~ file: ForumPage.tsx:104 ~ checkAlreadyLike ~ listIds",
      listIds
    );

    const check = listIds.filter((item: any) => Number(item) === userInfor?.id);
    console.log(
      "🚀 ~ file: ForumPage.tsx:107 ~ checkAlreadyLike ~ userInfor?.id",
      userInfor?.id
    );
    if (check.length > 0) return true;
    return false;
  };

  const onSearch = () => {
    if (search && !status) {
      setLoading(true);
      const matchedData = fullDataSource.filter((item: any) =>
        item?.content?.toLowerCase().includes(search?.toLocaleLowerCase())
      );

      setTimeout(() => {
        setLoading(false);
        setDataSource(matchedData);
      }, 500);
    } else if (!search && status) {
      setLoading(true);
      const matchedData = fullDataSource.filter(
        (item: any) => Number(item.status) === status
      );
      setTimeout(() => {
        setLoading(false);
        setDataSource(matchedData);
      }, 500);
    } else if (search && status) {
      setLoading(true);
      const matchedData = fullDataSource.filter(
        (item: any) =>
          Number(item.status) === status &&
          item?.content?.toLowerCase().includes(search?.toLocaleLowerCase())
      );

      setTimeout(() => {
        setLoading(false);
        setDataSource(matchedData);
      }, 500);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setDataSource(fullDataSource);
      }, 500);
    }
  };

  const getDataSource = () => {
    setLoading(true);
    fetch("http://localhost:8000/wp-json/wp/v2/forum_posts")
      .then((res) => res.json())
      .then(
        (result) => {
          const convertData = result.map((item: any) => ({
            id: item?.id,
            createdDate: item?.date.slice(0, 10).split("-").reverse().join("-"),
            loveCount: Number(item?.acf?.love_count),
            postType: item?.acf?.post_type,
            author: item?.acf?.author,
            commentCount:
              item?.acf.comment_count === ""
                ? []
                : JSON.parse(item?.acf.comment_count),
            content: item?.acf?.content,
            image: item?.acf?.image,
            status: item?.acf?.is_confirmed,
            isLiked: checkAlreadyLike(item?.acf?.people_like),
            peopleList:
              item?.acf.people_like === "" || !item?.acf?.people_like
                ? []
                : JSON.parse(item?.acf.people_like),
          }));
          // .filter((item: any) => item.status === "1");
          setDataSource(convertData);
          console.log("current data", convertData);
          setFullDataSource(convertData);
          setLoading(false);
        },
        (error) => {
          console.log("error", error);
          setLoading(false);
        }
      );
  };

  const addNewComment = (idPost: number, commentContent: string) => {
    const newComment = {
      id: Math.ceil(Math.random() * 1000000),
      content: commentContent,
      author: LocalStorage.getUserName(),
    };

    const targetPost = fullDataSource?.filter(
      (item: any) => item.id === idPost
    );

    const targetListComment = targetPost[0]?.commentCount;

    targetListComment.unshift(newComment);

    fetch(`http://localhost:8000/wp-json/wp/v2/forum_posts/${idPost}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${CliCookieService.get(
          CLI_COOKIE_KEYS.ACCESS_TOKEN
        )}`,
      },
      body: JSON.stringify({
        fields: {
          comment_count: `${JSON.stringify(targetListComment)}`,
        },
        status: "publish",
      }),
      method: "PUT",
    })
      .then((res: any) => res.json())
      .then((res: any) => {
        setLoading(false);
        message.success("Thêm bình luận mới thành công!");
        getDataSource();
      })
      .catch((err) => {
        message.error("Đã có lỗi xảy ra!");
        console.log("error: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onConfirmPosts = (id: number) => {
    fetch(`http://localhost:8000/wp-json/wp/v2/forum_posts/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${CliCookieService.get(
          CLI_COOKIE_KEYS.ACCESS_TOKEN
        )}`,
      },
      body: JSON.stringify({
        fields: {
          is_confirmed: 2,
        },
        status: "publish",
      }),
      method: "PUT",
    })
      .then((res: any) => res.json())
      .then((res: any) => {
        setLoading(false);
        message.success("Phê duyệt bài viết mới thành công!");
        getDataSource();
        setStatus(undefined);
        setSearch(undefined);
      })
      .catch((err) => {
        message.error("Đã có lỗi xảy ra!");
        console.log("error: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const likePost = (idPost: number) => {
    if (
      !CliCookieService.get(CLI_COOKIE_KEYS.ACCESS_TOKEN) ||
      CliCookieService.get(CLI_COOKIE_KEYS.ACCESS_TOKEN)?.length === 0
    ) {
      message.error("Vui lòng đăng nhập để thực hiện chức năng này!");
      return;
    }
    const newPerson = userInfor.id;
    const targetPost = fullDataSource?.filter(
      (item: any) => item.id === idPost
    );

    const targetListLove = targetPost[0]?.peopleList;

    targetListLove.push(newPerson);

    fetch(`http://localhost:8000/wp-json/wp/v2/forum_posts/${idPost}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${CliCookieService.get(
          CLI_COOKIE_KEYS.ACCESS_TOKEN
        )}`,
      },
      body: JSON.stringify({
        fields: {
          people_like: `${JSON.stringify(targetListLove)}`,
          love_count: Number(targetPost[0].loveCount) + 1,
        },
        status: "publish",
      }),
      method: "PUT",
    })
      .then((res: any) => res.json())
      .then((res: any) => {
        setLoading(false);
        message.success("Yêu thích thành công!");
        getDataSource();
      })
      .catch((err) => {
        message.error("Đã có lỗi xảy ra!");
        console.log("error: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const unLikePost = (idPost: number) => {
    if (
      !CliCookieService.get(CLI_COOKIE_KEYS.ACCESS_TOKEN) ||
      CliCookieService.get(CLI_COOKIE_KEYS.ACCESS_TOKEN)?.length === 0
    ) {
      message.error("Vui lòng đăng nhập để thực hiện chức năng này!");
      return;
    }
    const targetPersonId = userInfor?.id;

    const targetPost = fullDataSource?.filter(
      (item: any) => item.id === idPost
    );

    // const targetListLove = JSON.parse(targetPost[0]?.peopleList);
    const targetListLove = targetPost[0]?.peopleList;

    const newListLove = targetListLove?.filter(
      (item: any) => Number(item) !== targetPersonId
    );

    fetch(`http://localhost:8000/wp-json/wp/v2/forum_posts/${idPost}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${CliCookieService.get(
          CLI_COOKIE_KEYS.ACCESS_TOKEN
        )}`,
      },
      body: JSON.stringify({
        fields: {
          people_like: `${JSON.stringify(newListLove)}`,
          love_count: Number(targetPost[0].loveCount) - 1,
        },
        status: "publish",
      }),
      method: "PUT",
    })
      .then((res: any) => res.json())
      .then((res: any) => {
        setLoading(false);
        message.success("Bỏ yêu thích thành công!");
        getDataSource();
      })
      .catch((err) => {
        message.error("Đã có lỗi xảy ra!");
        console.log("error: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    getDataSource();
  }, []);

  React.useEffect(() => {
    onSearch();
  }, [search, status]);

  return (
    <Spin spinning={loading}>
      <Container
        header={
          <PageHeader
            style={{ borderRadius: 8 }}
            title="Diễn đàn"
            extra={[
              <ButtonAdd
                key={1}
                text="Thêm mới"
                onClickButton={() =>
                  navigate(PROTECTED_ROUTES_PATH.ADD_EDIT_FORUM_POST)
                }
              />,
            ]}
          />
        }
        filterComponent={
          <Filter
            search={search}
            status={status}
            setSearch={setSearch}
            setPostType={setStatus}
          />
        }
        contentComponent={
          <div>
            {dataSource?.map((item: any, index: number) => (
              <ForumItem
                addNewComment={addNewComment}
                key={index}
                item={item}
                onConfirmPosts={onConfirmPosts}
                likePost={likePost}
                unLikePost={unLikePost}
              />
            ))}
          </div>
        }
      />
    </Spin>
  );
};
