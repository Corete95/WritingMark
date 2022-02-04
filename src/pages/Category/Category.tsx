import React, { FC, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { IListBox } from "typings/db";
import ListBox from "components/ListBox/ListBox";
import { POSTS_CATEGORY_REQUEST } from "redux/postTypes";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Category: FC<IListBox> = () => {
  const params = useParams<Record<string, string | undefined>>();
  // const { posts } = useSelector((state: any) => state.post);
  const dispatch = useDispatch();
  const [posts, setPosts] = useState<IListBox[]>([]);
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLInputElement>(null);
  const token = localStorage.getItem("token");
  const config: any = {
    headers: {},
  };
  if (token) {
    config.headers["authorization"] = token;
  }
  // useEffect(() => {
  //   dispatch({
  //     type: POSTS_CATEGORY_REQUEST,
  //     payload: params,
  //   });
  // }, [params]);

  useEffect(() => {
    const categoryPost = async () => {
      try {
        const result = await axios.get(
          `posts/category?categoryname=${params.path}`,
          config,
        );
        console.log("result", result);
        setPosts(result.data.result);
        setCount(result.data.count);
      } catch (error: any) {
        console.log(error.response);
      }
    };
    categoryPost();
  }, [params]);

  const loaderMorePosts = () => {
    if (posts.length === 0 || posts.length === count) return;
    const lastId = posts[posts.length - 1]?._id;
    if (posts.length < count) {
      console.log("포스트", posts.length);
      console.log("카운트", count);
      console.log("라스트", lastId);
      axios
        .get(
          `posts/category?categoryname=${params.path}&lastId=${lastId}`,
          config,
        )
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

  return (
    <Container>
      {params.path}
      <WritingButton to="/Writing">글쓰기</WritingButton>
      <ListContainer>
        {posts?.map((list, index: number) => {
          return (
            <ListBox
              key={list._id}
              id={list.postId}
              name={list.writer.nickname}
              img={list.writer.profileImage}
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
      </ListContainer>
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto;
  max-width: 640px;
  min-width: 320px;
  padding-top: 80px;
  ${({ theme }) => theme.media.mobile`
  margin:0px 16px;
  `}
`;

const WritingButton = styled(Link)`
  float: right;
  width: 100px;
  height: 30px;
  color: white;
  text-align: center;
  padding-top: 7px;
  background-color: red;
  border: 1px solid red;
  cursor: pointer;
`;

const ListContainer = styled.div`
  margin-top: 50px;
`;
export default Category;
