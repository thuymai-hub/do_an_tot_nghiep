import { message, Row, Spin } from "antd";
import LocalStorage from "apis/LocalStorage";
import { ForumItem } from "features/forum_chat/components/ForumItem";
import React from "react";
import { useSelector } from "react-redux";
import { CliCookieService, CLI_COOKIE_KEYS } from "shared/services/cli-cookie";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import { PageContainer } from "./HomePagePublic";
import { ContentContainer } from "./PostPagePublic";

const ForumPagePublic = () => {
  const userInfor = useSelector((state: any) => state?.user?.user);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [dataSource, setDataSource] = React.useState<any[]>();
  const [fullDataSource, setFullDataSource] = React.useState<any>([]);

  const checkAlreadyLike = (arr: string) => {
    const listIds = JSON.parse(arr);

    const check = listIds.filter((item: any) => Number(item) === userInfor?.id);
    if (check.length > 0) return true;
    return false;
  };

  const getDataSource = () => {
    setLoading(true);
    fetch("http://localhost:8000/wp-json/wp/v2/forum_posts")
      .then((res) => res.json())
      .then(
        (result) => {
          const convertData = result
            .map((item: any) => ({
              id: item?.id,
              createdDate: item?.date
                .slice(0, 10)
                .split("-")
                .reverse()
                .join("-"),
              loveCount: item?.acf?.love_count,
              postType: item?.acf?.post_type,
              author: item?.acf?.author,
              commentCount:
                item?.acf.comment_count === ""
                  ? []
                  : JSON.parse(item?.acf.comment_count),
              content: item?.acf?.content,
              image: item?.acf?.image,
              status: item?.acf?.is_confirmed,
              peopleList: item?.acf?.people_like,
              isLiked: checkAlreadyLike(item?.acf?.people_like),
            }))
            .filter((item: any) => item.status === "2");
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

  const addNewComment = (idPost: number, commentContent: string) => {
    const newComment = {
      id: Math.ceil(Math.random() * 1000000),
      content: commentContent,
      author: LocalStorage.getUserName(),
    };

    if (
      !CliCookieService.get(CLI_COOKIE_KEYS.ACCESS_TOKEN) ||
      CliCookieService.get(CLI_COOKIE_KEYS.ACCESS_TOKEN)?.length === 0
    ) {
      message.error("Vui lòng đăng nhập để thực hiện chức năng này!");
      return;
    }

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

  const likePost = (idPost: number) => {
    const newPerson = userInfor.id;

    const targetPost = fullDataSource?.filter(
      (item: any) => item.id === idPost
    );
    console.log(
      "🚀 ~ file: ForumPagePublic.tsx ~ line 116 ~ likePost ~ targetPost",
      targetPost
    );

    const targetListLove = JSON.parse(targetPost[0]?.peopleList);
    console.log(
      "🚀 ~ file: ForumPagePublic.tsx ~ line 118 ~ likePost ~ targetListLove",
      targetListLove
    );

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
    const targetPersonId = userInfor.id;

    const targetPost = fullDataSource?.filter(
      (item: any) => item.id === idPost
    );

    if (
      !CliCookieService.get(CLI_COOKIE_KEYS.ACCESS_TOKEN) ||
      CliCookieService.get(CLI_COOKIE_KEYS.ACCESS_TOKEN)?.length === 0
    ) {
      message.error("Vui lòng đăng nhập để thực hiện chức năng này!");
      return;
    }

    const targetListLove = JSON.parse(targetPost[0]?.peopleList);
    const newListLove = targetListLove?.filter(
      (item: any) => item.id !== targetPersonId
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

  return (
    <Spin spinning={loading}>
      <PageContainer>
        <NavBar />
        <br />
        <br />
        <br />
        <CustomContentContainer>
          {dataSource?.map((item: any, index: number) => (
            <ForumItem
              addNewComment={addNewComment}
              key={index}
              item={item}
              onConfirmPosts={() => {}}
              likePost={likePost}
              unLikePost={unLikePost}
            />
          ))}
        </CustomContentContainer>
      </PageContainer>
    </Spin>
  );
};

const CustomContentContainer = styled(ContentContainer)`
  padding-right: 150px;
`;

export default ForumPagePublic;
