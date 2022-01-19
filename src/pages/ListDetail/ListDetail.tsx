import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const ListDetail = () => {
  const { user } = useSelector((state: any) => state.user);
  const [detailData, setDetailData] = useState<any>([]);
  const { postDetail } = useSelector((state: any) => state.post);
  const [like, setLike] = useState(detailData.count?.bookmark);
  const [bookMarkState, setBookMarkState] = useState(Boolean);
  const [error, setError] = useState("");
  const id = useParams<any>();
  const token = localStorage.getItem("token");
  localStorage.setItem("user_id", user._id);
  const config: any = {
    headers: {},
  };
  if (token) {
    config.headers["authorization"] = token;
  }

  useEffect(() => {
    const postDetail = async () => {
      try {
        const result = await axios.get(`posts/${id.id}`, config);
        setDetailData(result.data.result);
        setLike(result.data.result.count.bookmark);
        if (
          result.data.result.userBookmark == localStorage.getItem("user_id")
        ) {
          setBookMarkState(true);
        }
      } catch (error: any) {
        console.log(error.response);
        setError(error.response.data?.message);
      }
    };
    postDetail();
  }, []);

  const bookMarkLike = async () => {
    try {
      const result = await axios.post(`user/bookmark/${id.id}`, {}, config);
      setLike((preData: any) => preData + 1);
      setBookMarkState(true);
    } catch (err) {
      console.log(err);
    }
  };

  const bookMarkCancel = async () => {
    try {
      const result = await axios.delete(`user/bookmark/${id.id}`, config);
      setLike((preData: any) => preData - 1);
      setBookMarkState(false);
    } catch (err) {
      console.log(err);
    }
  };

  if (error) {
    return <Container>{error}</Container>;
  }
  console.log(detailData);
  return (
    <Container>
      <ListTop>
        <ImgName>
          <div className="imgDiv">
            <img
              src={`https://writingmark.s3.ap-northeast-2.amazonaws.com/user/${detailData.writer?.profileImage}`}
            />
          </div>
          <div className="nameDiv">
            <p>{detailData.writer?.nickname}</p>
            <p>{detailData.createdAt}</p>
          </div>
        </ImgName>
        {detailData.writer?._id === user._id && (
          <EditDelete>
            <span className="edit">수정</span>
            <span className="delete">삭제</span>
          </EditDelete>
        )}
      </ListTop>
      <ListCenter>
        <div> {detailData.content}</div>
        {detailData?.image ? (
          <img
            src={`https://writingmark.s3.ap-northeast-2.amazonaws.com/post/${detailData.image?.info_image}`}
          />
        ) : (
          ""
        )}
      </ListCenter>
      <ListBottom>
        <WarningIcon>
          <img src="/images/warning.png" />
          <IconText>
            소설 / 제목 : <span> {detailData.info_title}</span>
          </IconText>
        </WarningIcon>
        <UrlIcon>
          <img src="/images/url.png" />
          <IconText>
            아이콘 클릭시 컨텐츠와 관련된 사이트로 이동합니다.
          </IconText>
        </UrlIcon>
      </ListBottom>
      <BookmarkComments>
        {bookMarkState ? (
          <img src="/images/bookmarkfull.png" onClick={bookMarkCancel} />
        ) : (
          <img src="/images/bookmark.png" onClick={bookMarkLike} />
        )}
        <p>
          글갈피 {like}개
          <span className="comments">댓글{detailData.count?.comment}개 </span>
        </p>
      </BookmarkComments>
    </Container>
  );
};
const Container = styled.div`
  margin: 0 auto;
  max-width: 640px;
  min-width: 320px;
  padding-top: 100px;
  ${({ theme }) => theme.media.mobile`
  margin:0px 16px;
  `}
`;

const ListTop = styled.div`
  display: flex;
  justify-content: space-between;
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
  display: flex;
  align-items: end;
  color: gray;
  font-size: 13px;
  span {
    cursor: pointer;
  }
  .edit {
    margin-right: 13px;
  }
`;
const ListCenter = styled.div`
  margin-top: 20px;
  min-height: 400px;
  border: 1px solid gray;
  padding: 20px 20px;

  img {
    margin-top: 40px;
    width: 100%;
    height: 400px;
    object-fit: contain;
  }
`;

const ListBottom = styled.div`
  margin-top: 30px;
  font-size: 14px;
`;

const WarningIcon = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 20px;
    height: 20px;
    border: 1px solid black;
    border-radius: 50%;
    cursor: pointer;
  }
`;
const UrlIcon = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  img {
    width: 20px;
    height: 20px;
    border: 1px solid black;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const IconText = styled.p`
  margin-left: 10px;
`;

const BookmarkComments = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  font-size: 14px;
  img {
    width: 20px;
    cursor: pointer;
  }
  .comments {
    margin-left: 7px;
  }
`;
export default ListDetail;
