import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface Props {
  id: number;
  writerId: string;
  img: string;
  comment: string;
  name: string;
  time: string;
  editComment: (
    id: number,
    comment: string,
    editState: React.Dispatch<React.SetStateAction<boolean>>,
  ) => void;
  deleteComment: (id: number) => void;
}
const Comment: FC<Props> = ({
  id,
  writerId,
  img,
  comment,
  name,
  time,
  editComment,
  deleteComment,
}) => {
  const { user } = useSelector((state: any) => state.user);
  const [editState, setEditState] = useState(false);
  const [editComments, setEditComments] = useState(comment);
  const MySwal = withReactContent(Swal);
  const max_length = 50;

  const chatLimit = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    let text = e.currentTarget.value;
    const text_length = text.length;

    if (text_length - 1 > max_length) {
      MySwal.fire({
        confirmButtonColor: "black",
        title: <SwalCss>{max_length}자 이상 입력 불가능합니다. </SwalCss>,
        confirmButtonText: "확인",
        timer: 1000,
      });
      text = text.substr(0, max_length);
      e.currentTarget.value = text;
      setEditComments(e.currentTarget.value);
    }
  };

  return (
    <CommentDiv>
      <UserImg>
        <img
          src={`https://writingmark.s3.ap-northeast-2.amazonaws.com/user/${img}`}
        />
      </UserImg>
      {editState ? (
        <UserComment>
          <UserCommentTop>
            <NameCreatedAt>
              <p>{name}</p> <span>{time.slice(0, 16)}</span>
            </NameCreatedAt>
          </UserCommentTop>
          <CommentTitle>
            <textarea
              value={editComments}
              onKeyUp={chatLimit}
              onChange={(e) => setEditComments(e.target.value)}
            />
            <ButtonORValue>
              <EditButton>
                <button
                  onClick={() => editComment(id, editComments, setEditState)}
                >
                  수정
                </button>
                <button onClick={() => setEditState(false)}>취소</button>
              </EditButton>
              <p>
                {editComments.length}/<span>{max_length}</span>
              </p>
            </ButtonORValue>
          </CommentTitle>
        </UserComment>
      ) : (
        <UserComment>
          <UserCommentTop>
            <NameCreatedAt>
              <p>{name}</p> <span>{time.slice(0, 16)}</span>
            </NameCreatedAt>
            {writerId === user?._id && (
              <EditDelete>
                <span className="edit" onClick={() => setEditState(true)}>
                  수정
                </span>
                <span onClick={() => deleteComment(id)}>삭제</span>
              </EditDelete>
            )}
          </UserCommentTop>
          <CommentTitle>
            <pre>{comment}</pre>
          </CommentTitle>
        </UserComment>
      )}
    </CommentDiv>
  );
};

const CommentDiv = styled.div`
  display: flex;
  padding: 20px 0px;
`;
const UserImg = styled.div`
  flex: 1;
  ${({ theme }) => theme.media.mobile`
      flex: 1.8;
  `}
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
`;
const UserComment = styled.div`
  flex: 8;
`;
const UserCommentTop = styled.div`
  display: flex;
  justify-content: space-between;
`;
const NameCreatedAt = styled.div`
  display: flex;
  p {
    font-size: 18px;
    font-weight: bold;
    margin-right: 17px;
  }
  span {
    padding-top: 2px;
    font-size: 14px;
  }
`;
const EditDelete = styled.div`
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  color: gray;
  span {
    cursor: pointer;
  }
  .edit {
    margin-right: 10px;
    ${({ theme }) => theme.media.mobile`
     margin-right: 5px;
  `}
  }
`;
const CommentTitle = styled.div`
  font-size: 14px;
  margin-top: 15px;
  pre {
    white-space: break-spaces;
    word-break: break-all;
  }
  textarea {
    width: 100%;
    height: 64px;
    resize: none;
    padding: 8px 8px;
    font-size: 14px;
    border: none;
    background-color: #efecec;
    border-radius: 24px 24px;
  }
  textarea:focus {
    outline: none;
  }
`;
const ButtonORValue = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  p {
    margin-right: 15px;
    font-size: 12px;
  }
`;
const EditButton = styled.div`
  margin-left: 11px;
  button {
    height: 21px;
    border: 1px solid #dedfe0;
    border-radius: 8px;
    color: #535353;
    margin-right: 5px;
    padding: 0 16px;
    cursor: pointer;
  }
`;

const SwalCss = styled.p`
  font-size: 25px;
  font-weight: 800;
`;

export default Comment;
