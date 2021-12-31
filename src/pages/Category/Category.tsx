import React, { FC, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { IListBox } from "typings/db";
import ListBox from "components/ListBox/ListBox";
import { DataContext } from "context/DataContext";

const Category: FC<IListBox> = () => {
  const params = useParams<Record<string, string | undefined>>();
  const { listData, setListData, changeBookmark } = useContext(DataContext);

  return (
    <Container>
      {params.path}
      <WritingButton to="/Writing">글쓰기</WritingButton>
      <ListContainer>
        {listData.map((list: IListBox) => {
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
              changeBookmark={changeBookmark}
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
