import React from "react";
import Document from "./Document";
import EventPostSection from "./EventPostsSection";
import PostSection from "./PostSection";
import SubBar from "./SubBar";

interface IContent {
  posts: any[];
  eventPosts: any[];
  subjects: any[];
  normalEvents: any[];
  futureEvents: any[];
}

const Content = (props: IContent) => {
  const { posts, eventPosts, subjects, normalEvents, futureEvents } = props;
  return (
    <div>
      <SubBar />
      <PostSection posts={posts} />
      <EventPostSection
        eventPosts={eventPosts}
        futureEvents={futureEvents}
        normalEvents={normalEvents}
      />
      <Document subjects={subjects} />
    </div>
  );
};

export default Content;
