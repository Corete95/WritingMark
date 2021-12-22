import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { BOOKMARK_CATEGORY } from "Config";
import axios from "axios";

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
      <div>
        {test.length &&
          test.map((test: any) => {
            return (
              <>
                <div key={test.id}>
                  <span>{test.id}</span>
                  <span>{test.name}</span>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};

const BookMarkContainer = styled.div`
  margin-top: 50px;
  display: flex;

  span {
    flex: 1;
    text-align: center;
    font-size: 25px;
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
export default BookMark;
