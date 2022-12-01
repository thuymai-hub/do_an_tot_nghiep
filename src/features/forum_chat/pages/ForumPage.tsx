import { message, PageHeader, Spin } from "antd";
import LocalStorage from "apis/LocalStorage";
import ButtonAdd from "components/Button/ButtonAdd";
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
  const navigate = useNavigate();
  const userInfor = useSelector((state: any) => state?.user?.user);
  const [search, setSearch] = React.useState<string>();
  const [status, setStatus] = React.useState<number>();
  const [dataSource, setDataSource] = React.useState<any[]>();
  const [fullDataSource, setFullDataSource] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const checkAlreadyLike = (arr: string) => {
    const listIds = JSON.parse(arr);

    const check = listIds.filter((item: any) => Number(item) === userInfor?.id);
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
    const newPerson = userInfor.id;

    const targetPost = fullDataSource?.filter(
      (item: any) => item.id === idPost
    );

    const targetListLove = JSON.parse(targetPost[0]?.peopleList);

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
    const targetPersonId = userInfor?.id;

    const targetPost = fullDataSource?.filter(
      (item: any) => item.id === idPost
    );

    const targetListLove = JSON.parse(targetPost[0]?.peopleList);
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
