import React, { FC, useState } from "react";
import styled from "styled-components";

interface Props {
  id: number;
  img: string;
  comment: string;
  name: string;
  time: string;
  editComment: (
    id: number,
    comment: string,
    editState: React.Dispatch<React.SetStateAction<boolean>>,
  ) => void;
}
const Comment: FC<Props> = ({ id, img, comment, name, time, editComment }) => {
  const [editState, setEditState] = useState(false);
  const [editComments, setEditComments] = useState(comment);

  return (
    <CommentDiv>
      <UserImg>
        <img src={img} />
      </UserImg>
      <UserComment>
        <UserCommentTop>
          <NameCreatedAt>
            <p>{name}</p> <span>{time}</span>
          </NameCreatedAt>
          <EditDelete>
            <span className="edit" onClick={() => setEditState(true)}>
              수정
            </span>
            <span>삭제</span>
          </EditDelete>
        </UserCommentTop>
        <CommentTitle>
          {editState ? (
            <>
              <textarea
                value={editComments}
                onChange={(e) => setEditComments(e.target.value)}
              />
              <button
                onClick={() => editComment(id, editComments, setEditState)}
              >
                123
              </button>
            </>
          ) : (
            <pre> {comment}</pre>
          )}
        </CommentTitle>
      </UserComment>
    </CommentDiv>
  );
};

const CommentDiv = styled.div`
  display: flex;
  padding: 20px 0px;
  border-bottom: 1px solid gray;
`;
const UserImg = styled.div`
  flex: 1;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
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
    margin-right: 20px;
  }
`;
const EditDelete = styled.div`
  font-size: 12px;
  color: gray;
  span {
    cursor: pointer;
  }
  .edit {
    margin-right: 10px;
  }
`;
const CommentTitle = styled.div`
  margin-top: 15px;
  pre {
    white-space: break-spaces;
  }
  textarea {
    width: 100%;
    height: 100px;
    resize: none;
    padding: 5px 5px;
    font-size: 16px;
  }
`;
export default Comment;
