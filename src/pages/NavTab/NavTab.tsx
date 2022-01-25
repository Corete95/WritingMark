import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { NAV_CATEGORY } from "Config";
import { useDispatch, useSelector } from "react-redux";
import { POSTS_LOADING_REQUEST } from "redux/postTypes";
import ListBox from "components/ListBox/ListBox";
import { IListBox } from "typings/db";

const NavTab = () => {
  const [isActivatedCategory, setIsActivatedCategory] = useState("신규");
  const [payloadCategory, setPayloadCategory] = useState("new");
  const { posts } = useSelector((state: any) => state.post);
  const history = useHistory();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const handleCategory = (cateory: string, path: string, payload: string) => {
    setIsActivatedCategory(cateory);
    setPayloadCategory(payload);
    history.push(path);
  };

  useEffect(() => {
    dispatch({
      type: POSTS_LOADING_REQUEST,
      payload: { payloadCategory, token },
    });
  }, [dispatch, payloadCategory]);

  console.log(posts);
  return (
    <ContainerNavTab>
      <BottomNav>
        {NAV_CATEGORY.map((category) => {
          return (
            <div
              key={category.id}
              className={
                isActivatedCategory === category.name ? "activeOn" : ""
              }
              onClick={() => {
                handleCategory(category.name, category.path, category.payload);
              }}
            >
              <span> {category.name}</span>
            </div>
          );
        })}
      </BottomNav>
      <PostContainer>
        {posts?.map((list: IListBox) => {
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
        })}
      </PostContainer>
    </ContainerNavTab>
  );
};
const ContainerNavTab = styled.div`
  margin: 0 auto;
  max-width: 640px;
  min-width: 320px;
  padding-top: 31px;
`;
const BottomNav = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  line-height: 43px;
  border-bottom: 1px solid #e3e5e8;
  padding: 0 5px;

  div {
    flex: 1;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
    &.activeOn {
      font-weight: bold;
      border-bottom: 3px solid black;
    }
  }
`;
const PostContainer = styled.div`
  margin-top: 50px;
  ${({ theme }) => theme.media.mobile`
    margin:50px 16px 0px 16px;
  `}
`;
export default NavTab;
