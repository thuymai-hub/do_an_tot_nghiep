import { Avatar, Button, Comment, Input, message } from "antd";
import LocalStorage from "apis/LocalStorage";
import React from "react";
import {
  AiOutlineComment,
  AiOutlineHeart,
  AiOutlineSend,
  AiFillHeart,
} from "react-icons/ai";

interface IForumItem {
  item: any;
  addNewComment: (idPost: number, commentContent: string) => void;
  onConfirmPosts: (id: number) => void;
  likePost: (idPost: number, authorName?: string | null) => void;
  unLikePost: (idPost: number) => void;
}

export const ForumItem = (props: IForumItem) => {
  const { item, addNewComment, onConfirmPosts, likePost, unLikePost } = props;
  const [comment, setComment] = React.useState<string>("");
  const [isShowingComment, setIsShowingComment] =
    React.useState<boolean>(false);

  return (
    <>
      <div className="flex justify-center mt-2">
        <div
          style={{ position: "relative", boxShadow: "2px 2px 10px lightgray" }}
          className="bg-white rounded-xl w-3/4"
        >
          <div className="item-header">
            <div className="col-span-1 flex justify-center items-center">
              <Avatar
                style={{ width: 40, height: 40 }}
                src={
                  "https://images.unsplash.com/photo-1669054078259-9f305691b761?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
                }
              />
            </div>
            <div className="item-info">
              <div>
                <div className="author">{item.author}</div>
                <div>
                  <span style={{ fontSize: 12, color: "gray" }}>
                    {item?.createdDate}
                  </span>
                </div>
              </div>
              <div
                style={{ position: "absolute", top: 20, right: 20 }}
                className="cursor-pointer flex justify-center items-center"
              >
                {item?.status === "1" && (
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => onConfirmPosts(item?.id)}
                  >
                    Phê duyệt
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div
            className="px-4 py-2 text-justify"
            dangerouslySetInnerHTML={{ __html: item?.content }}
          />
          <img className="image" src={item?.image} />

          <hr />
          <div className="item-interact">
            <div
              className="love-block"
              onClick={() => {
                if (item?.status === "1") {
                  message.error("Vui lòng phê duyệt bài viết!");
                } else {
                  if (item?.isLiked) {
                    unLikePost(item?.id);
                  } else {
                    console.log("2");
                    likePost(item?.id);
                  }
                }
              }}
            >
              {item?.isLiked ? (
                <AiFillHeart className="love-icon " />
              ) : (
                <AiOutlineHeart className="love-icon " />
              )}

              <span style={{ fontSize: 20 }}>{item.loveCount}</span>
            </div>
            <div
              className="love-block"
              onClick={() => {
                setIsShowingComment((value) => !value);
              }}
            >
              <AiOutlineComment className="love-icon " />
              <span style={{ fontSize: 20 }}>
                {item?.commentCount?.length || 0}
              </span>
            </div>
          </div>
          <div className="px-4 pb-2 flex flex-row">
            <Input.Group compact>
              <Input
                size="large"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Bình luận về bài viết này"
                style={{ width: "calc(100% - 50px)" }}
              />
              <Button
                type="primary"
                size="large"
                disabled={
                  !comment || comment.length === 0 || item?.status === "1"
                    ? true
                    : false
                }
                onClick={() => {
                  setComment("");
                  setIsShowingComment(true);
                  addNewComment(item?.id, comment);
                }}
              >
                <AiOutlineSend />
              </Button>
            </Input.Group>
          </div>
          {isShowingComment && (
            <div className="px-4 pb-2">
              {item?.commentCount?.map((item: any, index: number) => {
                return (
                  <Comment
                    key={index}
                    author={item?.author || "Defaul Name"}
                    avatar={
                      "https://images.unsplash.com/photo-1669342358012-478137ff1f75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
                    }
                    content={item?.content || "Default Comment"}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
      <br />
    </>
  );
};
