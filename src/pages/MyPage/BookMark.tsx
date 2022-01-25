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
        {/* {posts.length === 0 && <NoPosts>게시글이 없습니다.</NoPosts>} */}

        {posts.length !== 0 ? (
          posts?.map((list: IListBox) => {
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
                userbookmark={list?.userBookmark}
              />
            );
          })
        ) : (
          <NoPosts>게시글이 없습니다.</NoPosts>
        )}
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

const NoPosts = styled.div`
  text-align: center;
  font-size: 20px;
  margin-top: 80px;
`;
export default BookMark;
