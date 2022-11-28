import React from "react";
import EventPostSection from "./EventPostsSection";
import PostSection from "./PostSection";

interface IContent {
  posts: any[];
  eventPosts: any[];
}

const Content = (props: IContent) => {
  const { posts, eventPosts } = props;
  return (
    <div className="w3-content w3-padding" style={{ maxWidth: 1564 }}>
      <EventPostSection eventPosts={eventPosts} />
      <PostSection posts={posts} />
    </div>
  );
};

export default Content;
