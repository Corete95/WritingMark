import React from "react";
import styled from "styled-components";

const FeedListBox = () => {
  return (
    <>
      <FeedContainer>
        <FeedHeader>
          <img src="/5.png" />
        </FeedHeader>
        <FeedCenter>
          <p className="feedContent">
            새로운 글 등록 입니다! 새로운 글 등록 입니다! 새로운 글 등록 입니다!
            새로운 글 등록 입니다! 새로운 글 등록 입니다!새로운 글 등록
            입니다!새로운 글 등록 입니다!새로운 글 등록 입니다!새로운 글 등록
          </p>
          <p className="category"># 소설</p>
          <p className="createdAt">
            2022.02.1 <span>·</span> 1개 댓글
          </p>
        </FeedCenter>
        <FeedBottom>
          <UserInfo>
            <img src="/5.png" />
            <span>김정현</span>
          </UserInfo>
          <BookMarks>
            <img src="/images/bookmarkfull.png" />
          </BookMarks>
        </FeedBottom>
      </FeedContainer>

      <FeedContainer>123</FeedContainer>
      <FeedContainer>123</FeedContainer>
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
  }
  .category {
    font-size: 12px;
    font-weight: 600;
    opacity: 0.8;
  }
  .createdAt {
    font-size: 12px;
    margin-top: 10px;
    font-weight: 400;
    opacity: 0.8;
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
  img {
    width: 18px;
    height: 18px;
  }
`;
export default FeedListBox;
