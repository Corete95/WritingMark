import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import axios from "axios";
import { POSTS_DELETE_REQUEST } from "redux/postTypes";
import Comment from "components/Comment/Comment";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

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
  const MySwal = withReactContent(Swal);

  const config: any = {
    headers: {},
  };
  if (token) {
    config.headers["authorization"] = token;
  }

  useEffect(() => {
    const postDetail = async () => {
      try {
        const result = await axios.get(`/posts/${id.id}`, config);
        setDetailData(result.data.result);
        setCommentCount(result.data.result.count.comment);
        setLike(result.data.result.count.bookmark);
        setBookMarkState(result.data.result.bookmarkState);
      } catch (error: any) {
        setError(error.response?.data?.message);
      }
    };
    postDetail();
  }, []);

  useEffect(() => {
    const commentData = async () => {
      try {
        const result = await axios.get(`/post/${id.id}/comments`, config);
        setCommentData(result.data.result);
      } catch (error: any) {
        console.log(error.response);
      }
    };
    commentData();
  }, []);

  const bookMarkLike = async () => {
    try {
      const user = await userCheck();
      if (user) {
        return MySwal.fire({
          confirmButtonColor: "black",
          title: <SwalCss>????????? ??? ?????????????????????!</SwalCss>,
          confirmButtonText: "??????",
          timer: 1000,
        });
      }
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
    MySwal.fire({
      confirmButtonColor: "black",
      title: <SwalCss>???????????? ?????????????????????????</SwalCss>,
      text: "????????? ???????????? ????????? ??????????????????.",
      showCancelButton: true,
      confirmButtonText: "??????",
      cancelButtonText: "??????",
    }).then((success) => {
      if (success.isConfirmed) {
        const id = detailData.postId;
        dispatch({
          type: POSTS_DELETE_REQUEST,
          payload: { id, token },
        });
      }
    });
  };

  const chatLimit = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    let text = e.currentTarget.value;
    const text_length = text.length;

    if (text_length > max_length) {
      MySwal.fire({
        confirmButtonColor: "black",
        title: <SwalCss>{max_length}??? ?????? ?????? ??????????????????. </SwalCss>,
        confirmButtonText: "??????",
        timer: 1000,
      });
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
      if (commentValue === "")
        return MySwal.fire({
          confirmButtonColor: "black",
          title: <SwalCss>????????? ??????????????????.</SwalCss>,
          confirmButtonText: "??????",
          timer: 1000,
        });
      const result = await axios.post(
        `/post/${id.id}/comment`,
        { content: commentValue },
        config,
      );
      const addData = [...commentData];
      addData.unshift(result.data.result);
      setCommentData([...addData]);
      setCommentCount((preData) => preData + 1);
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
      if (editComment === "")
        return MySwal.fire({
          confirmButtonColor: "black",
          title: <SwalCss>????????? ??????????????????.</SwalCss>,
          confirmButtonText: "??????",
          timer: 1000,
        });
      const result = await axios.patch(
        `/post/${id.id}/comment/${writerId}`,
        { content: editComment },
        config,
      );
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

  const userCheck = async () => {
    const userId = user?._id ? false : true;
    await userId;
    return userId;
  };

  const deleteComment = async (writerId: number) => {
    try {
      const result = await MySwal.fire({
        confirmButtonColor: "black",
        title: <SwalCss>????????? ?????????????????????????</SwalCss>,
        text: "????????? ????????? ????????? ??????????????????.",
        showCancelButton: true,
        confirmButtonText: "??????",
        cancelButtonText: "??????",
      }).then((success) => {
        if (success.isConfirmed) {
          axios.delete(`post/${id.id}/comment/${writerId}`, config);
          setCommentCount((preData) => preData - 1);
          setCommentData(
            commentData.filter((comment: any) => comment._id !== writerId),
          );
        }
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  if (error) {
    return (
      <ErrorContainer>
        <div className="goHome">
          <Link to="/">?????? ????????????</Link>
        </div>
        <img src="/images/404page.png" />
      </ErrorContainer>
    );
  }

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
            <Link to={`/ListDetailEdit/${detailData.postId}`}>??????</Link>
            <span className="delete" onClick={postDelete}>
              ??????
            </span>
          </EditDelete>
        )}
      </ListTop>
      <p className="category">{detailData.categoryLabel}</p>
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
        {detailData.info_title !== "" ? (
          <InformationIcon large={true}>
            <img src="/images/claim.png" />
            <IconText>
              ?????? : <span>{detailData.info_title}</span>
            </IconText>
          </InformationIcon>
        ) : (
          ""
        )}
        {detailData.info_url !== "" ? (
          <InformationIcon large={true}>
            <a
              href={`https://${detailData.info_url}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/images/website.png" />
            </a>
            <IconText>
              ????????? ????????? ???????????? ????????? ???????????? ???????????????.
            </IconText>
          </InformationIcon>
        ) : (
          ""
        )}
      </ListBottom>
      <BookmarkComments>
        {bookMarkState ? (
          <img src="/images/bookmarkfull.png" onClick={bookMarkCancel} />
        ) : (
          <img src="/images/bookmark.png" onClick={bookMarkLike} />
        )}
        <p>
          ????????? {like}???<span className="comments">??????{commentCount}??? </span>
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
              {commentValue.length >= 1 && (
                <p>
                  {commentValue.length}/<span>{max_length}</span>
                </p>
              )}
            </TextareaORValue>
            <button onClick={addComment}>??????</button>
          </CommentInputButton>
        ) : (
          <CommentInputButton>
            <TextareaORValue>
              <textarea
                value={commentValue}
                onKeyUp={chatLimit}
                onChange={commentValueChange}
                disabled
                placeholder="????????? ??? ?????? ???????????????."
              />
              {commentValue.length >= 1 && (
                <p>
                  {commentValue.length}/<span>{max_length}</span>
                </p>
              )}
            </TextareaORValue>
            <button onClick={addComment} disabled>
              ??????
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
  .category {
    margin: 15px 0px;
    display: inline-flex;
    border: 1px solid #e6e1e1;
    font-size: 13px;
    padding-left: 1rem;
    padding-right: 1rem;
    height: 2rem;
    border-radius: 1rem;
    align-items: center;
  }
`;
const ErrorContainer = styled.div`
  margin: 0 auto;
  max-width: 640px;
  min-width: 320px;
  padding-top: 100px;
  text-align: center;

  .goHome {
    display: flex;
    justify-content: center;
    a {
      background-color: black;
      text-align: center;
      height: 32px;
      width: 150px;
      border-radius: 24px 24px;
      color: white;
      padding-top: 9px;
    }
  }
  img {
    width: 100%;
    height: 590px;
  }
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
    overflow: hidden;

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
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
  min-height: 400px;
  padding: 20px 0px;

  pre {
    overflow: hidden;
    white-space: break-spaces;
    line-height: 1.2;
  }
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

const InformationIcon = styled.div<{ large: boolean }>`
  display: flex;
  align-items: center;
  margin-top: 10px;
  font-size: 12px;
  img {
    ${(props) =>
      props.large
        ? css`
            width: 25px;
            height: 25px;
            cursor: pointer;
          `
        : css`
            width: 15px;
            height: 15px;
          `}
  }
`;

const IconText = styled.p`
  margin-left: 10px;
`;

const BookmarkComments = styled.div`
  display: flex;
  align-items: center;
  margin-top: 33px;
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
  margin-top: 20px;
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
    ${({ theme }) => theme.media.mobile`
    font-size:12px;
    width: 60px;
  `}
  }
`;
const TextareaORValue = styled.div`
  width: 90%;
  ${({ theme }) => theme.media.mobile`
    width: 82%;
  `}
  textarea {
    padding: 10px 25px;
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
const SwalCss = styled.p`
  font-size: 24px;
  font-weight: 800;
`;
export default ListDetail;
