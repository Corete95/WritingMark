import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { BOOKMARK_CATEGORY } from "Config";
import axios from "axios";
import ListBox from "components/ListBox/ListBox";

const BookMark: FC = () => {
  const [bookMarkCategory, setBookMarkCategory] = useState("내가 쓴 글");
  const [test, setTest] = useState([]);
  const [queryString, setQueryString] = useState("test.json");

  useEffect(() => {
    axios(`http://localhost:3000/data/${queryString}`).then((res: any) => {
      setTest(res.data);
    });
  }, [queryString]);

  const handleCategory = (cateory: string, queryString: string) => {
    setBookMarkCategory(cateory);
    setQueryString(queryString);
  };
  console.log(test);
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
        {test.length &&
          test.map((test: any) => {
            return (
              <ListBox
                key={test.id}
                id={test.id}
                name={test.name}
                img={test.img}
                time={test.time}
                contents={test.contents}
                contents_img={test.contents_img}
                bookmark={test.bookmark}
                comments={test.comments}
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
