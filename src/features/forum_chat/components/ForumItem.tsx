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
      <div className="flex justify-center mt-3">
        <div className="bg-white rounded-xl w-3/4 shadow-lg">
          <div className="grid grid-cols-12 gap-x-2 gap-y-4 px-4 py-2">
            <div className="col-span-1 flex justify-center items-center">
              <Avatar
                style={{ width: 36, height: 36 }}
                src={
                  "https://images.unsplash.com/photo-1669054078259-9f305691b761?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
                }
              />
            </div>
            <div className="col-span-11 flex justify-between">
              <div>
                <div className="font-semibold">{item.author}</div>
                <div>
                  <span style={{ fontSize: 12, color: "gray" }}>
                    {item?.createdDate}
                  </span>
                </div>
              </div>
              <div className="cursor-pointer flex justify-center items-center">
                {item?.status === "1" ? (
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => onConfirmPosts(item?.id)}
                  >
                    Phê duyệt
                  </Button>
                ) : (
                  <></>
                  // <Popover
                  //   trigger="click"
                  //   content={
                  //     <div>
                  //       <div className="cursor-pointer hover:bg-gray-200 p-1">
                  //         Sửa bài viết
                  //       </div>
                  //       <div className="cursor-pointer text-red-500 hover:bg-gray-200 p-1">
                  //         Xóa bài viết
                  //       </div>
                  //     </div>
                  //   }
                  //   title={null}
                  // >
                  //   <BsThreeDots />
                  // </Popover>
                )}
              </div>
            </div>
          </div>

          <div
            className="px-4 py-2 text-justify"
            dangerouslySetInnerHTML={{ __html: item?.content }}
          />
          <img
            style={{ height: 200, width: 350, borderRadius: 10, margin: 10 }}
            src={item?.image}
          />

          <hr />
          <div className="flex text-xl px-4 py-2">
            <div
              className="flex items-center cursor-pointer px-4 py-2 rounded hover:bg-gray-200"
              onClick={() => {
                if (item?.status === "1") {
                  message.error("Vui lòng phê duyệt bài viết!");
                } else {
                  if (item?.isLiked) {
                    unLikePost(item?.id);
                  } else {
                    likePost(item?.id, LocalStorage?.getUserName());
                  }
                }
              }}
            >
              {item?.isLiked ? (
                <AiFillHeart className="mr-2 " />
              ) : (
                <AiOutlineHeart className="mr-2 " />
              )}

              {item.loveCount}
            </div>
            <div
              className="flex items-center cursor-pointer px-4 py-2 rounded hover:bg-gray-200"
              onClick={() => {
                setIsShowingComment((value) => !value);
              }}
            >
              <AiOutlineComment className="mr-2 " />
              {item?.commentCount?.length || 0}
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
