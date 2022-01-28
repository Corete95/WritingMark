import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import axios, { AxiosError } from "axios";
import { POSTS_DELETE_REQUEST, POSTS_DETAIL_REQUEST } from "redux/postTypes";
import Comment from "components/Comment/Comment";
const ListDetail = () => {
  const { user } = useSelector((state: any) => state.user);
  const [detailData, setDetailData] = useState<any>([]);
  const [like, setLike] = useState(detailData.count?.bookmark);
  const [bookMarkState, setBookMarkState] = useState(Boolean);
  const [error, setError] = useState("");
  const [commentCount, setCommentCount] = useState(Number);
  const [commentValue, setCommentValue] = useState("");
  const [commentData, setCommentData] = useState<any>([]);
  const id = useParams<any>();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const max_length = 50;
  localStorage.setItem("user_id", user?._id);
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
        setCommentCount(result.data.result.count.comment);
        setLike(result.data.result.count.bookmark);
        const writerId = result.data.result.userBookmark.find(
          (e: string) => e == localStorage.getItem("user_id"),
        );
        if (writerId == localStorage.getItem("user_id")) {
          setBookMarkState(true);
        }
      } catch (error: any) {
        console.log(error.response);
        setError(error.response?.data?.message);
      }
    };
    postDetail();
  }, []);

  useEffect(() => {
    const commentData = async () => {
      try {
        const result = await axios.get(`post/${id.id}/comments`, config);
        setCommentData(result.data.result);
      } catch (error: any) {
        console.log(error.response);
      }
    };
    commentData();
  }, []);

  const bookMarkLike = async () => {
    try {
      const result = await axios.post(`user/bookmark/${id.id}`, {}, config);
      setLike((preData: number) => preData + 1);
      setBookMarkState(true);
    } catch (err: any) {
      console.log(err.response);
    }
  };

  const bookMarkCancel = async () => {
    try {
      const result = await axios.delete(`user/bookmark/${id.id}`, config);
      setLike((preData: number) => preData - 1);
      setBookMarkState(false);
    } catch (err) {
      console.log(err);
    }
  };

  const postDelete = () => {
    const id = detailData.postId;
    dispatch({
      type: POSTS_DELETE_REQUEST,
      payload: { id, token },
    });
  };

  const chatLimit = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    let text = e.currentTarget.value;
    const text_length = text.length;

    if (text_length > max_length) {
      alert(max_length + "이상 입력 불가능합니다!");
      text = text.substr(0, max_length);
      e.currentTarget.value = text;
      setCommentValue(e.currentTarget.value);
    }
  };

  const commentValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentValue(e.target.value);
  };

  const addComment = async () => {
    try {
      if (commentValue === "") return alert("댓글을 입력해주세요!");
      const result = await axios.post(
        `post/${id.id}/comment`,
        { content: commentValue },
        config,
      );
      const addData = [...commentData];
      addData.unshift(result.data.result);
      setCommentData([...addData]);
      setCommentCount((pre) => pre + 1);
      setCommentValue("");
    } catch (error: any) {
      console.log(error.response);
    }
  };

  const editComment = async (
    writerId: number,
    editComment: string,
    editState: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    try {
      const result = await axios.patch(
        `post/${id.id}/comment/${writerId}`,
        { content: editComment },
        config,
      );
      console.log(result);
      setCommentData(
        commentData.map((comment: any) => {
          if (comment._id === writerId) {
            return {
              ...comment,
              content: editComment,
            };
          } else {
            return comment;
          }
        }),
      );
      editState(false);
    } catch (error: any) {
      console.log(error.response);
    }
  };

  const deleteComment = async (writerId: number) => {
    try {
      const result = await axios.delete(
        `post/${id.id}/comment/${writerId}`,
        config,
      );
      console.log(result);
      setCommentCount((pre) => pre - 1);
      setCommentData(
        commentData.filter((comment: any) => comment._id !== writerId),
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (error) {
    return <Container>{error}</Container>;
  }
  console.log("DATA", commentData);
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
            <p>{detailData.createdAt?.slice(0, 16)}</p>
          </div>
        </ImgName>
        {detailData.writer?._id === user?._id && (
          <EditDelete>
            <Link to={`/ListDetailEdit/${detailData.postId}`}>수정</Link>
            <span className="delete" onClick={postDelete}>
              삭제
            </span>
          </EditDelete>
        )}
      </ListTop>
      <ListCenter>
        <pre>{detailData.content}</pre>
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
          글갈피 {like}개<span className="comments">댓글{commentCount}개 </span>
        </p>
      </BookmarkComments>
      <CommentCantainer>
        {user?._id ? (
          <CommentInputButton>
            <TextareaORValue>
              <textarea
                value={commentValue}
                onKeyUp={chatLimit}
                onChange={commentValueChange}
              />
              <p>
                {commentValue.length}/<span>{max_length}</span>
              </p>
            </TextareaORValue>
            <button onClick={addComment}>등록</button>
          </CommentInputButton>
        ) : (
          <CommentInputButton>
            <TextareaORValue>
              <textarea
                value={commentValue}
                onKeyUp={chatLimit}
                onChange={commentValueChange}
                disabled
                placeholder="로그인 후 이용 가능합니다."
              />
              <p>
                {commentValue.length}/<span>{max_length}</span>
              </p>
            </TextareaORValue>
            <button onClick={addComment} disabled>
              등록
            </button>
          </CommentInputButton>
        )}
        {commentData.map((comment: any) => {
          return (
            <Comment
              key={comment._id}
              id={comment._id}
              writerId={comment.writer._id}
              name={comment.writer?.nickname}
              time={comment.createdAt}
              img={comment.writer?.profileImage}
              comment={comment.content}
              editComment={editComment}
              deleteComment={deleteComment}
            />
          );
        })}
      </CommentCantainer>
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

const ListCenter = styled.div`
  margin-top: 20px;
  min-height: 400px;
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
const CommentCantainer = styled.div`
  margin-top: 30px;
`;
const CommentInputButton = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  border-radius: 24px 24px;
  background-color: #efecec;

  button {
    padding-right: 20px;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;
const TextareaORValue = styled.div`
  width: 90%;
  ${({ theme }) => theme.media.mobile`
    width: 85%;
  `}
  textarea {
    padding: 8px 8px;
    font-size: 14px;
    width: 100%;
    resize: none;
    background-color: transparent;
    border: none;
  }
  textarea:focus {
    outline: none;
  }
  p {
    font-size: 12px;
    float: right;
  }
`;
export default ListDetail;
