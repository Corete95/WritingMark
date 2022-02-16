import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import { CATEGORY_OPTIONS } from "Config";
import TextInformation from "pages/Writing/TextInformation";
import useInput from "hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { POSTS_DETAIL_EDIT_REQUEST } from "../../redux/postTypes";
import { Redirect, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface SelectProps {
  value: string;
  label: string;
}
type SelectValue = SelectProps | SelectProps[] | null | undefined;

const ListDetailEdit = () => {
  const { user } = useSelector((state: any) => state.user);
  const { postDetail } = useSelector((state: any) => state.post);
  const [select, setSelect] = useState<any>({ label: "", value: "" });
  const [image, setImage] = useState("");
  const [contents, onChangeContents, setContetns] = useInput("");
  const [title, onChangeTitle, setTitle] = useInput("");
  const [url, onChangeUrl, setUrl] = useInput("");
  const [imgUrl, setImgUrl] = useState<string>("");
  const [informationCheck, setInformationCheck] = useState(false);
  const ImgInput = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);
  const id = useParams<any>();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const config: any = {
      headers: {},
    };
    if (token) {
      config.headers["authorization"] = token;
    }
    const postDetail = async () => {
      try {
        const result = await axios.get(`posts/${id.id}`, config);
        setSelect({
          label: result.data.result.categoryLabel,
          value: result.data.result.categoryValue,
        });
        setContetns(result.data.result.content);
        setImgUrl(
          result.data.result.image
            ? "https://writingmark.s3.ap-northeast-2.amazonaws.com/post/" +
                result.data.result?.image?.info_image
            : "",
        );
        setImage(result.data.result.image?.info_image);
        setTitle(result.data.result.info_title);
        setUrl(result.data.result.info_url);
      } catch (error: any) {
        console.log(error.response);
      }
    };
    postDetail();
  }, []);

  const selectHandleChange = (selectedOption: SelectValue) => {
    setSelect(selectedOption);
  };

  const imageUploadBtn = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (ImgInput.current) {
      ImgInput.current.click();
    }
  };

  const imageHandler = (e: any) => {
    const imageFile = e.target.files[0];
    setImage(imageFile);
    const fileReader = new FileReader();
    if (imageFile) {
      fileReader.readAsDataURL(imageFile);
      fileReader.onload = (e: any) => setImgUrl(e.target.result);
    } else {
      return;
    }
  };

  const deleteImg = () => {
    MySwal.fire({
      confirmButtonColor: "black",
      imageUrl: `${imgUrl}`,
      imageHeight: 200,
      title: "이미지를 삭제 하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        setImgUrl("");
      }
    });
  };

  const informationCheckHandler = () => {
    setInformationCheck(!informationCheck);
  };

  const upLoad = () => {
    if (select === null)
      return MySwal.fire({
        confirmButtonColor: "black",
        title: "카테고리를 설정해주세요.",
        timer: 1000,
      });
    if (contents === "")
      return MySwal.fire({
        confirmButtonColor: "black",
        title: "내용을 입력해주세요.",
        timer: 1000,
      });
    const formData = new FormData();
    formData.append("category_value", select.value);
    formData.append("category_label", select.label);
    formData.append("content", contents);
    formData.append("info_title", title);
    formData.append("info_url", url);
    formData.append("info_image", image);
    const body = { formData, id };

    dispatch({
      type: POSTS_DETAIL_EDIT_REQUEST,
      payload: { body, token },
    });
  };

  if (!user?._id) {
    return <Redirect to="/" />;
  }
  return (
    <Container>
      <Category>
        <Select
          options={CATEGORY_OPTIONS}
          onChange={selectHandleChange}
          value={select}
          placeholder="카테고리를 정해주세요."
          className="selectStyles"
          classNamePrefix="selectStyles"
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary25: "gray",
              primary: "black",
            },
          })}
        />
      </Category>
      <Contents>
        <textarea value={contents} onChange={onChangeContents}></textarea>
        <ImgUpload>
          <img src="/images/camera.png" onClick={imageUploadBtn} />
          <input
            type="file"
            accept="image/*"
            ref={ImgInput}
            onChange={imageHandler}
          />
          {imgUrl && (
            <DeleteImg img={imgUrl}>
              <p onClick={deleteImg}>&times;</p>
            </DeleteImg>
          )}
        </ImgUpload>
      </Contents>
      <TextInformation
        informationCheckHandler={informationCheckHandler}
        informationCheck={informationCheck}
        title={title}
        onChangeTitle={onChangeTitle}
        url={url}
        onChangeUrl={onChangeUrl}
      />
      <ButtonDiv>
        <Button onClick={upLoad}>수정</Button>
        <Button onClick={() => history.back()}>취소</Button>
      </ButtonDiv>
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto;
  max-width: 640px;
  min-width: 320px;
  padding-top: 80px;
  ${({ theme }) => theme.media.mobile`
  margin:0px 15px;
  `}
`;

const Category = styled.div`
  display: flex;
  align-items: center;

  .selectStyles {
    width: 100%;
    text-align: center;
    font-size: 18px;
    ${({ theme }) => theme.media.mobile`
      margin-left:20px;
  `}
  }
`;

const Contents = styled.div`
  margin-top: 40px;

  textarea {
    width: 100%;
    height: 300px;
    padding: 20px 20px;
    font-size: 14px;
    border-right: none;
    border-left: none;
    resize: none;
  }
  textarea:focus {
    outline: none;
  }
`;

const ImgUpload = styled.div`
  display: flex;
  margin-top: 15px;
  img {
    width: 40px;
    height: 40px;
    margin-right: 20px;
    cursor: pointer;
  }
  input {
    display: none;
  }
`;

const DeleteImg = styled.div<{ img: string }>`
  width: 40px;
  height: 40px;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url(${(props) => props.img});

  p {
    float: right;
    position: relative;
    left: 7px;
    bottom: 8px;
    background: transparent;
    border: none;
    font-size: 22px;
    cursor: pointer;
  }
`;
const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  float: right;
`;

const Button = styled.button`
  margin-top: 30px;
  margin-left: 15px;
  width: 100px;
  height: 30px;
  color: white;
  background-color: black;
  border: 1px solid black;
  cursor: pointer;
`;
export default ListDetailEdit;
