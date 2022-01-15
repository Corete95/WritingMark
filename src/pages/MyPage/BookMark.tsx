import React, { FC, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { BOOKMARK_CATEGORY } from "Config";
import axios from "axios";
import ListBox from "components/ListBox/ListBox";
import { IListBox } from "typings/db";
import { DataContext } from "context/DataContext";

const BookMark: FC = () => {
  const [bookMarkCategory, setBookMarkCategory] = useState("내가 쓴 글");
  const { listData, changeBookmark, setQueryString } = useContext(DataContext);

  // useEffect(() => {
  //   axios(`http://localhost:3000/data/${queryString}`).then((res) => {
  //     setListData(res.data);
  //   });
  // }, [queryString]);

  const handleCategory = (cateory: string, queryString: string) => {
    setBookMarkCategory(cateory);
    setQueryString(queryString);
  };

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
        {listData?.map((list: IListBox) => {
          return (
            <ListBox
              key={list.id}
              id={list.id}
              name={list.name}
              img={list.img}
              time={list.time}
              contents={list.contents}
              contents_img={list.contents_img}
              bookmark={list.bookmark}
              comments={list.comments}
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
