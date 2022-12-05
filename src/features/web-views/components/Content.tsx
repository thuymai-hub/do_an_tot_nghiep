import React from "react";
import Document from "./Document";
import EventPostSection from "./EventPostsSection";
import PostSection from "./PostSection";
import SubBar from "./SubBar";

interface IContent {
  posts: any[];
  eventPosts: any[];
  subjects: any[];
}

const Content = (props: IContent) => {
  const { posts, eventPosts, subjects } = props;
  return (
    <div style={{ maxWidth: 1564 }}>
      <SubBar />
      <PostSection posts={posts} />
      <EventPostSection eventPosts={eventPosts} />
      <Document subjects={subjects} />
    </div>
  );
};

export default Content;
