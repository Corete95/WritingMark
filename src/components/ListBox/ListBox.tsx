import React, { FC, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { IListBox } from "typings/db";
import axios, { AxiosRequestConfig } from "axios";
import { POSTS_DELETE_REQUEST } from "redux/postTypes";
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
  bookmarkState?: any;
  writerId?: string;
  elementRef?: React.RefObject<HTMLInputElement> | undefined;
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
  bookmarkState,
  writerId,
  elementRef,
}) => {
  const { user } = useSelector((state: any) => state.user);
  const [like, setLike] = useState(bookmark);
  const [bookMarkState, setBookMarkState] = useState(bookmarkState);
  const history = useHistory();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const MySwal = withReactContent(Swal);
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
      console.log("123123", result);
      setBookMarkState(true);
    } catch (err: any) {
      console.log(err.response);
    }
  };

  const bookMarkCancel = async () => {
    try {
      const result = await axios.delete(`user/bookmark/${id}`, config);
      setLike((preData) => preData - 1);
      setBookMarkState(false);
    } catch (err) {
      console.log(err);
    }
  };

  const postDelete = () => {
    MySwal.fire({
      confirmButtonColor: "black",
      title: <SwalCss>게시글을 삭제하시겠습니까?</SwalCss>,
      text: "삭제된 게시글은 복구가 불가능합니다.",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((success) => {
      if (success.isConfirmed) {
        dispatch({
          type: POSTS_DELETE_REQUEST,
          payload: { id, token },
        });
      }
    });
  };

  return (
    <ListBoxContainer key={id} ref={elementRef}>
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
            <Link to={`/ListDetailEdit/${id}`}>수정</Link>
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
  .delete {
    margin-left: 6px;
  }
  a:link {
    color: gray;
  }
  a:visited {
    color: gray;
  }
  a:hover {
    color: gray;
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

const SwalCss = styled.p`
  font-size: 25px;
  font-weight: 800;
`;

export default ListBox;
