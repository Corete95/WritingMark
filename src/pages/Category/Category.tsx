import React, { FC, useEffect, useRef, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { IListBox } from "typings/db";
import ListBox from "components/ListBox/ListBox";
import { POSTS_CATEGORY_REQUEST } from "redux/postTypes";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import FeedListBox from "components/FeedListBox/FeedListBox";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Category: FC<IListBox> = () => {
  const params = useParams<Record<string, string | undefined>>();
  // const { posts } = useSelector((state: any) => state.post);
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.user);
  const [posts, setPosts] = useState<IListBox[]>([]);
  const [count, setCount] = useState(0);
  const MySwal = withReactContent(Swal);
  const history = useHistory();
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
          `/posts/category?categoryname=${params.path}`,
          config,
        );
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
          `/posts/category?categoryname=${params.path}&lastId=${lastId}`,
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

  console.log(posts);

  const goWriting = () => {
    if (!user?._id) {
      return MySwal.fire({
        confirmButtonColor: "black",
        title: <SwalCss>로그인 후 이용가능합니다!</SwalCss>,
        confirmButtonText: "확인",
        timer: 1000,
      });
    }
    history.push("/Writing");
  };
  return (
    <Container>
      <CategoryTop>
        <span># {posts[0]?.categoryLabel}</span>
        <WritingButton onClick={goWriting}>글쓰기</WritingButton>
      </CategoryTop>
      <ListContainer>
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
      </ListContainer>
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto;
  max-width: 640px;
  min-width: 320px;
  padding-top: 80px;
`;
const CategoryTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 23px;
    font-weight: bold;
  }
  ${({ theme }) => theme.media.mobile`
  margin:0px 16px;
  `}
`;

const WritingButton = styled.button`
  border-radius: 24px 24px;
  font-size: 14px;
  width: 80px;
  height: 30px;
  color: white;
  background-color: black;
  text-align: center;
  border: none;
  cursor: pointer;
`;

const ListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 25px;
  ${({ theme }) => theme.media.mobile`
    display: block;
    margin:50px 16px 0px 16px;
  `}
`;
const SwalCss = styled.p`
  font-size: 20px;
  font-weight: 800;
`;

export default Category;
