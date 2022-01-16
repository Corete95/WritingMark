import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { BOOKMARK_CATEGORY } from "Config";
import axios from "axios";
import ListBox from "components/ListBox/ListBox";
import { IListBox } from "typings/db";
import { useDispatch, useSelector } from "react-redux";
import { POSTS_MYWRITE_REQUEST, POSTS_MYLIKE_REQUEST } from "redux/postTypes";

const BookMark: FC = () => {
  const [bookMarkCategory, setBookMarkCategory] = useState("내가 쓴 글");
  const { posts } = useSelector((state: any) => state.post);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const handleCategory = (cateory: string, queryString: string) => {
    setBookMarkCategory(cateory);
  };

  useEffect(() => {
    if (bookMarkCategory === "내가 쓴 글") {
      dispatch({
        type: POSTS_MYWRITE_REQUEST,
        payload: token,
      });
    }
    if (bookMarkCategory === "내 찜목록") {
      dispatch({
        type: POSTS_MYLIKE_REQUEST,
        payload: token,
      });
    }
  }, [dispatch, bookMarkCategory]);

  console.log(posts);
  console.log(posts?.postId);
  return (
    <>
      <BookMarkContainer>
        {BOOKMARK_CATEGORY.map((bookmark) => {
          return (
            <span
              key={bookmark.id}
              className={bookMarkCategory === bookmark.name ? "activeOn" : ""}
              onClick={() => {
                handleCategory(bookmark.name, bookmark.queryString);
              }}
            >
              {bookmark.name}
            </span>
          );
        })}
      </BookMarkContainer>
      <ListBoxContainer>
        {/* {bookMarkCategory === "내가 쓴 글"
          ? posts?.map((list: any) => {
              return (
                <ListBox
                  key={list._id}
                  id={list.postId}
                  name={list.writer?.nickname}
                  img={list.writer?.profileImage}
                  time={list.createdAt}
                  contents={list.content}
                  contents_img={list.image?.info_image}
                  bookmark={list.count?.bookmark}
                  comments={list.count?.comment}
                  userbookmark={list?.userBookmark}
                />
              );
            })
          : posts?.map((list: any) => {
              return (
                <ListBox
                  key={list.postId?._id}
                  id={list.postId?.postId}
                  name={list.postId?.writer?.nickname}
                  img={list.postId?.writer?.profileImage}
                  time={list.postId?.createdAt}
                  contents={list.postId?.content}
                  contents_img={list.postId?.image?.info_image}
                  bookmark={list.postId?.count?.bookmark}
                  comments={list.postId?.count?.comment}
                  userbookmark={list.postId?.userBookmark}
                />
              );
            })} */}
        {posts?.map((list: any) => {
          return (
            <ListBox
              key={list._id}
              id={list.postId}
              name={list.writer?.nickname}
              img={list.writer.profileImage}
              time={list.createdAt}
              contents={list.content}
              contents_img={list.image?.info_image}
              bookmark={list.count.bookmark}
              comments={list.count.comment}
              userbookmark={list?.userBookmark}
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

const ListBoxContainer = styled.div`
  margin-top: 25px;
`;
export default BookMark;
function dispatch(arg0: {
  type: any;
  payload: { payloadCategory: any; token: any };
}) {
  throw new Error("Function not implemented.");
}
