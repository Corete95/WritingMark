import React, { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { BOOKMARK_CATEGORY } from "Config";
import axios from "axios";
import ListBox from "components/ListBox/ListBox";
import { IListBox } from "typings/db";
import { useDispatch, useSelector } from "react-redux";
import { POSTS_MYWRITE_REQUEST, POSTS_MYLIKE_REQUEST } from "redux/postTypes";

const BookMark: FC = () => {
  const [bookMarkCategory, setBookMarkCategory] = useState("내가 쓴 글");
  // const { posts } = useSelector((state: any) => state.post);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [posts, setPosts] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLInputElement>(null);
  const config: any = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    config.headers["authorization"] = token;
  }

  const handleCategory = (cateory: string) => {
    setBookMarkCategory(cateory);
  };

  useEffect(() => {
    if (bookMarkCategory === "내가 쓴 글") {
      axios
        .get("user/posts", config)
        .then((res) => {
          console.log("DATA", res.data),
            setPosts(res.data.result),
            setCount(res.data.count);
        })
        .catch((err: any) => {
          console.log(err.response?.data);
        });
    }
    if (bookMarkCategory === "내 찜목록") {
      axios
        .get("user/bookmarks", config)
        .then((res) => {
          console.log("bookmarks", res), console.log("asd", res.data.count);
          setPosts(res.data.result), setCount(res.data.count);
        })
        .catch((err: any) => {
          console.log(err.response?.data);
        });
    }
  }, [bookMarkCategory]);
  const loaderMorePosts = () => {
    if (posts.length === 0 || posts.length === count) return;
    const lastId = posts[posts.length - 1]?._id;
    if (posts.length < count) {
      {
        bookMarkCategory === "내가 쓴 글"
          ? axios
              .get(`user/posts?lastId=${lastId}`, config)
              .then((res) => {
                console.log("내가 쓴글 무한스크롤", res.data.result),
                  setPosts((pre) => [...pre, ...res.data.result]);
              })
              .catch((err: any) => console.log(err.response.data))
          : axios
              .get(`user/bookmarks?lastId=${lastId}`, config)
              .then((res) => {
                console.log("내 찜목록 무한스크롤", res.data.result),
                  setPosts((pre) => [...pre, ...res.data.result]);
              })
              .catch((err: any) => console.log(err.response.data));
      }
    }
  };
  console.log("카운트", posts);

  useEffect(() => {
    if (!elementRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) loaderMorePosts();
    });
    observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [loaderMorePosts]);

  return (
    <>
      <BookMarkContainer>
        {BOOKMARK_CATEGORY.map((bookmark) => {
          return (
            <span
              key={bookmark.id}
              className={bookMarkCategory === bookmark.name ? "activeOn" : ""}
              onClick={() => {
                handleCategory(bookmark.name);
              }}
            >
              {bookmark.name}
            </span>
          );
        })}
      </BookMarkContainer>
      <TotalPosts>총 게시글 수 : {count} 개</TotalPosts>
      <ListBoxContainer>
        {posts.length === 0 && <NoPosts>게시글이 없습니다.</NoPosts>}
        {/* {posts?.map((list, index: number) => {
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
              bookmark={list.count?.bookmark}
              comments={list.count?.comment}
              bookmarkState={list.bookmarkState}
              elementRef={index + 1 === posts.length ? elementRef : undefined}
            />
          );
        })} */}
        {bookMarkCategory === "내가 쓴 글"
          ? posts?.map((list, index: number) => {
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
                  bookmark={list.count?.bookmark}
                  comments={list.count?.comment}
                  bookmarkState={list.bookmarkState}
                  elementRef={
                    index + 1 === posts.length ? elementRef : undefined
                  }
                />
              );
            })
          : posts?.map((list, index: number) => {
              return (
                <ListBox
                  key={list._id}
                  id={list.postId}
                  name={list.post_id?.writer.nickname}
                  img={list.post_id?.writer.profileImage}
                  writerId={list.post_id?.writer._id}
                  time={list.post_id?.createdAt}
                  contents={list.post_id?.content}
                  contents_img={list.post_id?.image?.info_image}
                  bookmark={list.post_id?.count.bookmark}
                  comments={list.post_id?.count.comment}
                  bookmarkState={list.bookmarkState}
                  elementRef={
                    index + 1 === posts.length ? elementRef : undefined
                  }
                />
              );
            })}
      </ListBoxContainer>
    </>
  );
};

const BookMarkContainer = styled.div`
  margin-top: 100px;
  display: flex;
  ${({ theme }) => theme.media.mobile`
  margin-top: 50px;
  `}
  span {
    flex: 1;
    text-align: center;
    font-size: 18px;
    padding: 10px 5px;
    color: gray;
    cursor: pointer;
    &.activeOn {
      color: black;
      font-weight: bold;
      border: 1px solid black;
      border-bottom: 0px;
    }
  }
`;

const TotalPosts = styled.p`
  font-size: 17px;
  margin: 20px 0px;
  font-weight: bold;
`;
const ListBoxContainer = styled.div`
  margin-top: 25px;
`;

const NoPosts = styled.div`
  text-align: center;
  font-size: 20px;
  margin-top: 80px;
`;

export default BookMark;
