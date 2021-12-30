import React, { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { IListBox } from "typings/db";
import ListBox from "components/ListBox/ListBox";

const Category: FC<IListBox> = () => {
  const test = useParams<Record<string, string | undefined>>();
  const [listData, setListData] = useState<IListBox[]>([]);

  useEffect(() => {
    axios("http://localhost:3000/data/test.json").then((res) => {
      setListData(res.data);
    });
  }, []);

  return (
    <Container>
      {test.path}
      <WritingButton to="/Writing">글쓰기</WritingButton>
      <ListContainer>
        {listData.map((list) => {
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
