import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const ListDetail = () => {
  const id = useParams<any>();
  console.log(id);
  return (
    <Container>
      <ListTop>
        <ImgName>
          <div className="imgDiv">
            <img src="/5.png" />
          </div>
          <div className="nameDiv">
            <p>김정현</p>
            <p>2022.1.1</p>
          </div>
        </ImgName>
        <EditDelete>
          <span className="edit">수정</span>
          <span className="delete">삭제</span>
        </EditDelete>
      </ListTop>
      <ListCenter></ListCenter>
      <ListBottom>
        <WarningIcon>
          <img src="/images/warning.png" />
          <IconText>
            소설 / 제목 : <span> 당신이 빛이라면</span>
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
        <img src="/images/bookmarkfull.png" />
        <p>
          글갈피 10개<span className="comments">댓글2개 </span>
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
