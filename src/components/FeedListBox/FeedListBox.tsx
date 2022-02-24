import axios from "axios";
import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface Props {
  id: number;
  name: string;
  img: string;
  time: string;
  contents: string;
  contents_img: string;
  bookmark: number;
  comments: number;
  categoryLabel: string;
  categoryValue: string;
  bookmarkState?: any;
  writerId?: string;
  elementRef?: React.RefObject<HTMLInputElement> | undefined;
}

const FeedListBox: FC<Props> = ({
  id,
  name,
  img,
  time,
  contents,
  contents_img,
  bookmark,
  comments,
  categoryLabel,
  categoryValue,
  bookmarkState,
  writerId,
  elementRef,
}) => {
  const { user } = useSelector((state: any) => state.user);
  const [like, setLike] = useState(bookmark);
  const [bookMarkState, setBookMarkState] = useState(bookmarkState);
  const history = useHistory();
  const token = localStorage.getItem("token");
  const MySwal = withReactContent(Swal);
  const config: any = {
    headers: {},
  };
  if (token) {
    config.headers["authorization"] = token;
  }

  const userCheck = async () => {
    const userId = user?._id ? false : true;
    await userId;
    return userId;
  };

  const bookMarkLike = async () => {
    try {
      const user = await userCheck();
      if (user) {
        return MySwal.fire({
          confirmButtonColor: "black",
          title: <SwalCss>로그인 후 이용가능합니다!</SwalCss>,
          confirmButtonText: "확인",
          timer: 1000,
        });
      }
      const result = await axios.post(`/user/bookmark/${id}`, {}, config);
      console.log("좋아요", result);
      setLike((preData) => preData + 1);
      setBookMarkState(true);
    } catch (err: any) {
      console.log(err.response);
    }
  };

  const bookMarkCancel = async () => {
    try {
      const result = await axios.delete(`/user/bookmark/${id}`, config);
      console.log("좋아요 취소", result);
      setLike((preData) => preData - 1);
      setBookMarkState(false);
    } catch (err: any) {
      console.log(err.response);
    }
  };

  const timeForToday = (value: string) => {
    const today = new Date();
    const timeValue = new Date(value);
    const betweenTime = Math.floor(
      (today.getTime() - timeValue.getTime()) / 1000 / 60,
    );
    if (betweenTime < 1) return "방금전";
    if (betweenTime < 60) {
      return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 7) {
      return `${betweenTimeDay}일전`;
    }
    const returnValue = value.slice(0, 11);
    return `${returnValue}`;
  };

  const goToCategory = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    path: string,
  ) => {
    e.stopPropagation();
    history.push(`/Category/${path}`);
  };

  return (
    <>
      <FeedContainer ref={elementRef}>
        <FeedClickDiv onClick={() => history.push(`/ListDetail/${id}`)}>
          <FeedHeader>
            {contents_img === undefined ? (
              <img
                src={`https://writingmark.s3.ap-northeast-2.amazonaws.com/post/bgBasic.png`}
              />
            ) : (
              <img
                src={`https://writingmark.s3.ap-northeast-2.amazonaws.com/post/${contents_img}`}
              />
            )}
          </FeedHeader>
          <FeedCenter>
            <p className="feedContent">{contents}</p>
            <p
              className="category"
              onClick={(e) => goToCategory(e, categoryValue)}
            >
              # {categoryLabel}
            </p>
            <p className="createdAt">
              {timeForToday(time)}
              <span>·</span>
              {comments}개 댓글
            </p>
          </FeedCenter>
        </FeedClickDiv>
        <FeedBottom>
          <UserInfo>
            <img
              src={`https://writingmark.s3.ap-northeast-2.amazonaws.com/user/${img}`}
            />
            <span>{name}</span>
          </UserInfo>
          <BookMarks>
            {bookMarkState ? (
              <img src="/images/bookmarkFull.png" onClick={bookMarkCancel} />
            ) : (
              <img src="/images/bookmark.png" onClick={bookMarkLike} />
            )}
            <span>{like}</span>
          </BookMarks>
        </FeedBottom>
      </FeedContainer>
      <ToastContainer />
    </>
  );
};
const FeedContainer = styled.div`
  max-width: 310px;
  width: 100%;
  flex: 1 1 40%;
  margin-bottom: 20px;
  box-shadow: rgb(0 0 0 / 12%) 0px 3px 6px, rgb(0 0 0 / 24%) 0px 2px 5px;
  border-radius: 10px 10px;
  ${({ theme }) => theme.media.mobile`
   max-width:none;
  `}
`;
const FeedClickDiv = styled.div`
  cursor: pointer;
`;
const FeedHeader = styled.div`
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 10px 10px 0px 0px;
  }
`;
const FeedCenter = styled.div`
  /* max-height: 100px; */
  padding: 15px;
  .feedContent {
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    line-height: 1.2;
    height: 3.6em;
    text-align: left;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    margin-bottom: 30px;
    padding-top: 1px;
  }
  .category {
    display: inline-block;
    font-size: 12px;
    font-weight: 600;
    opacity: 0.8;
    cursor: pointer;
  }
  .category:hover {
    font-size: 13px;
    transition: transform 0.3s;
  }
  .createdAt {
    font-size: 12px;
    margin-top: 10px;
    font-weight: 400;
    opacity: 0.8;
    span {
      margin: 0px 4px;
    }
  }
`;
const FeedBottom = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #f1f3f5;
  padding: 10px 15px;
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    object-fit: cover;
  }
  span {
    font-size: 12px;
    margin-left: 10px;
  }
`;
const BookMarks = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
  span {
    font-size: 14px;
    margin-left: 4px;
  }
`;
const SwalCss = styled.p`
  font-size: 20px;
  font-weight: 800;
`;

export default FeedListBox;
