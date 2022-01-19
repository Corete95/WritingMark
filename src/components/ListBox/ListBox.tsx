import React, { FC, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { IListBox } from "typings/db";
import axios, { AxiosRequestConfig } from "axios";
import { POSTS_DELETE_REQUEST } from "redux/postTypes";

interface Props {
  id: number;
  name: string;
  img: string;
  time: string;
  contents: string;
  contents_img: string;
  bookmark: number;
  comments: number;
  userbookmark?: any;
  writerId?: string;
}
const ListBox: FC<Props> = ({
  id,
  name,
  img,
  time,
  contents,
  contents_img,
  bookmark,
  comments,
  userbookmark,
  writerId,
}) => {
  const { user } = useSelector((state: any) => state.user);
  const liked = userbookmark?.find((v: number) => v == user?._id);
  const [like, setLike] = useState(bookmark);
  const [bookMarkState, setBookMarkState] = useState(liked);
  const history = useHistory();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const config: any = {
    headers: {},
  };
  if (token) {
    config.headers["authorization"] = token;
  }

  const bookMarkLike = async () => {
    try {
      const result = await axios.post(`user/bookmark/${id}`, {}, config);
      setLike((preData) => preData + 1);
      setBookMarkState(result.data.result.userBookmark);
    } catch (err) {
      console.log(err);
    }
  };

  const bookMarkCancel = async () => {
    try {
      const result = await axios.delete(`user/bookmark/${id}`, config);
      setLike((preData) => preData - 1);
      setBookMarkState(null);
    } catch (err) {
      console.log(err);
    }
  };
  const postDelete = () => {
    dispatch({
      type: POSTS_DELETE_REQUEST,
      payload: { id, token },
    });
  };
  return (
    <ListBoxContainer key={id}>
      <TopBottom>
        <ImgName>
          <div className="imgDiv">
            <img
              src={`https://writingmark.s3.ap-northeast-2.amazonaws.com/user/${img}`}
            />
          </div>
          <div className="nameDiv">
            <p>{name}</p>
            <p>{time}</p>
          </div>
        </ImgName>
        {writerId === user?._id && (
          <EditDelete>
            <span className="edit">수정</span>
            <span className="delete" onClick={postDelete}>
              삭제
            </span>
          </EditDelete>
        )}
      </TopBottom>
      <BoxCenter onClick={() => history.push(`/ListDetail/${id}`)}>
        <ContentsText width={contents_img}>{contents}</ContentsText>
        {contents_img ? (
          <img
            src={`https://writingmark.s3.ap-northeast-2.amazonaws.com/post/${contents_img}`}
          />
        ) : (
          ""
        )}
      </BoxCenter>
      <TopBottom>
        <div className="likeComments">
          {bookMarkState ? (
            <img src="/images/bookmarkfull.png" onClick={bookMarkCancel} />
          ) : (
            <img src="/images/bookmark.png" onClick={bookMarkLike} />
          )}
          <span>
            글갈피 {like}개<span className="comments">댓글{comments}개 </span>
          </span>
        </div>
      </TopBottom>
    </ListBoxContainer>
  );
};

const ListBoxContainer = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 40px;
`;

const TopBottom = styled.div`
  display: flex;
  justify-content: space-between;

  .likeComments {
    display: flex;
    align-items: center;
    margin-left: 15px;
    img {
      width: 20px;
      cursor: pointer;
    }
    span {
      font-size: 14px;
    }
    .comments {
      margin-left: 7px;
    }
  }

  .link {
    img {
      width: 20px;
    }
  }
`;

const ImgName = styled.div`
  display: flex;
  .imgDiv {
    width: 50px;
    height: 50px;
    border-radius: 70%;
    overflow: hidden;

    img {
      width: 100%;
      height: auto;
      image-rendering: -webkit-optimize-contrast;
    }
  }

  .nameDiv {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;

    p {
      line-height: 23px;
    }
  }
`;

const EditDelete = styled.div`
  margin: auto 0;
  color: gray;
  font-size: 13px;
  span {
    cursor: pointer;
  }
  .edit {
    margin-right: 13px;
  }
`;

const BoxCenter = styled.div`
  display: flex;
  border: 1px solid #c4c4c4;
  margin: 7px 0px;
  max-height: 150px;
  min-height: 150px;
  cursor: pointer;
  img {
    width: 30%;
  }
`;
const ContentsText = styled.div<{ width: string }>`
  ${({ width }) => {
    return width ? `width:70%` : `width:100%`;
  }};
  margin: 20px 23px;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 23px;
  ${({ theme }) => theme.media.mobile`
   margin: 8px 14px;
  `}
`;

export default ListBox;
