import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { NAV_CATEGORY } from "Config";
import { useDispatch } from "react-redux";
import { IListBox } from "typings/db";
import axios from "axios";
import FeedListBox from "components/FeedListBox/FeedListBox";

const NavTab = () => {
  const [isActivatedCategory, setIsActivatedCategory] = useState("신규");
  const [payloadCategory, setPayloadCategory] = useState("new");
  const [count, setCount] = useState(0);
  const history = useHistory();
  const token = localStorage.getItem("token");
  const elementRef = useRef<HTMLInputElement>(null);
  const [posts, setPosts] = useState<IListBox[]>([]);
  const config: any = {
    headers: {},
  };
  if (token) {
    config.headers["authorization"] = token;
  }

  const handleCategory = (cateory: string, path: string, payload: string) => {
    setIsActivatedCategory(cateory);
    setPayloadCategory(payload);
    history.push(path);
  };

  useEffect(() => {
    if (payloadCategory === "new") {
      axios
        .get(`posts?tab=${payloadCategory}`, config)
        .then((res) => {
          setPosts(res.data.result), setCount(res.data.count);
        })
        .catch((err: any) => {
          console.log(err.response);
        });
    }
    if (payloadCategory === "hot") {
      axios
        .get(`posts?tab=${payloadCategory}`, config)
        .then((res) => {
          setPosts(res.data.result), setCount(res.data.count);
        })
        .catch((err: any) => {
          console.log(err.response);
        });
    }
  }, [payloadCategory]);

  const loaderMorePosts = () => {
    if (posts.length === 0 || posts.length === count) return;

    const lastId = posts[posts.length - 1]?._id;
    if (posts.length < count) {
      axios
        .get(`posts?tab=${payloadCategory}&lastId=${lastId}`, config)
        .then((res) => {
          setPosts((pre) => [...pre, ...res.data.result]);
        })
        .catch((err: any) => console.log(err.response.data));
    }
  };

  useEffect(() => {
    if (!elementRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) loaderMorePosts();
    });
    observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [loaderMorePosts]);

  return (
    <ContainerNavTab>
      <BottomNav>
        {NAV_CATEGORY.map((category) => {
          return (
            <div
              key={category.id}
              className={
                isActivatedCategory === category.name ? "activeOn" : ""
              }
              onClick={() => {
                handleCategory(category.name, category.path, category.payload);
              }}
            >
              <span> {category.name}</span>
            </div>
          );
        })}
      </BottomNav>
      <PostContainer>
        {posts?.map((post, index: number) => {
          return (
            <FeedListBox
              key={post._id}
              id={post.postId}
              name={post.writer.nickname}
              img={post.writer.profileImage}
              time={post.createdAt}
              contents={post.content}
              contents_img={post.image?.info_image}
              bookmark={post.count.bookmark}
              comments={post.count.comment}
              categoryLabel={post.categoryLabel}
              categoryValue={post.categoryValue}
              bookmarkState={post.bookmarkState}
              elementRef={index + 1 === posts.length ? elementRef : undefined}
            />
          );
        })}
      </PostContainer>
    </ContainerNavTab>
  );
};
const ContainerNavTab = styled.div`
  margin: 0 auto;
  max-width: 640px;
  min-width: 320px;
  padding-top: 53px;
`;
const BottomNav = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  line-height: 43px;
  border-bottom: 1px solid #e3e5e8;
  padding: 0 5px;

  div {
    flex: 1;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
    &.activeOn {
      font-weight: bold;
      border-bottom: 3px solid black;
    }
  }
`;
const PostContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 50px;
  ${({ theme }) => theme.media.mobile`
    display: block;
    margin:50px 16px 0px 16px;
  `}
`;

export default NavTab;
