import React, { FC, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { IListBox } from "typings/db";
import ListBox from "components/ListBox/ListBox";
import { POSTS_CATEGORY_REQUEST } from "redux/postTypes";
import { useDispatch, useSelector } from "react-redux";

const Category: FC<IListBox> = () => {
  const params = useParams<Record<string, string | undefined>>();
  const { posts } = useSelector((state: any) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: POSTS_CATEGORY_REQUEST,
      payload: params,
    });
  }, [params]);

  return (
    <Container>
      {params.path}
      <WritingButton to="/Writing">글쓰기</WritingButton>
      <ListContainer>
        {posts?.map((list: IListBox) => {
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
              userbookmark={list?.userBookmark}
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
