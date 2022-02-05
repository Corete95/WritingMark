import React, { useCallback, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { NAV_CATEGORY } from "Config";
import { useDispatch, useSelector } from "react-redux";
import { POSTS_LOADING_REQUEST } from "redux/postTypes";
import ListBox from "components/ListBox/ListBox";
import { IListBox } from "typings/db";
import axios from "axios";
import FeedListBox from "components/FeedListBox/FeedListBox";

const NavTab = () => {
  const [isActivatedCategory, setIsActivatedCategory] = useState("신규");
  const [payloadCategory, setPayloadCategory] = useState("new");
  const [count, setCount] = useState(0);
  // const { count } = useSelector((state: any) => state.post);
  const history = useHistory();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const elementRef = useRef<HTMLInputElement>(null);
  const endElementRef = useRef(false);
  const [posts, setPosts] = useState<IListBox[]>([]);
  const [loading, setLoading] = useState<boolean | null>(null);
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
  // useEffect(() => {
  //   dispatch({
  //     type: POSTS_LOADING_REQUEST,
  //     payload: { payloadCategory, token },
  //   });
  // }, [dispatch, payloadCategory]);

  useEffect(() => {
    if (payloadCategory === "new") {
      axios
        .get(`posts?tab=${payloadCategory}`, config)
        .then((res) => {
          console.log("DATA", res.data.result),
            setPosts(res.data.result),
            setCount(res.data.count);
        })
        .catch((err: any) => {
          console.log(err.response);
        });
    }
    if (payloadCategory === "hot") {
      axios
        .get(`posts?tab=${payloadCategory}`, config)
        .then((res) => {
          console.log("HOT_DATA", res.data.result),
            setPosts(res.data.result),
            setCount(res.data.count);
        })
        .catch((err: any) => {
          console.log(err.response);
        });
    }
  }, [payloadCategory]);
  // const loaderMorePosts = useCallback(() => {
  //   if (posts.length === 0) return;
  //   const last = posts[posts.length - 1]?._id;
  //   if (posts.length < count)
  //     dispatch({
  //       type: POSTS_LOADING_REQUEST,
  //       payload: { payloadCategory, token, last },
  //     });
  // }, [posts]);
  const loaderMorePosts = () => {
    if (posts.length === 0 || posts.length === count) return;
    const lastId = posts[posts.length - 1]?._id;
    if (posts.length < count) {
      console.log("포스트", posts.length);
      console.log("카운트", count);
      axios
        .get(`posts?tab=${payloadCategory}&lastId=${lastId}`, config)
        .then((res) => {
          console.log("무한스크롤DATA", res.data.result),
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

  // console.log(posts?.length);
  // console.log("갯수", posts.length);
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
        <FeedListBox />
        {posts?.map((list, index: number) => {
          return (
            <ListBox
              key={list._id}
              id={list.postId}
              name={list.writer?.nickname}
              img={list.writer?.profileImage}
              writerId={list.writer?._id}
              time={list.createdAt}
              contents={list.content}
              contents_img={list.image?.info_image}
              bookmark={list.count.bookmark}
              comments={list.count.comment}
              bookmarkState={list.bookmarkState}
              elementRef={index + 1 === posts.length ? elementRef : undefined}
            />
          );
        })}
      </PostContainer>
      {endElementRef ? (
        <>
          <EndPosts>더 이상의 게시물이 없습니다.</EndPosts>
          <button onClick={() => window.scrollTo({ top: 0 })}>위로</button>
        </>
      ) : (
        ""
      )}
    </ContainerNavTab>
  );
};
const ContainerNavTab = styled.div`
  margin: 0 auto;
  max-width: 640px;
  min-width: 320px;
  padding-top: 31px;
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

const EndPosts = styled.div`
  text-align: center;
  font-size: 18px;
  margin: 50px 0px;
`;
export default NavTab;
