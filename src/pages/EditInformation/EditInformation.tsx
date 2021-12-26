import Loading from "components/Loading";
import React, { useRef, useState } from "react";
import styled from "styles/themed-components";

const EditInformation = () => {
  const [imgFile, setImgFile] = useState(null);
  const [loading, setLoading] = useState<any>(null);
  const [imgSrc, setImgSrc] = useState<string>("/5.png");
  const ImgInput = useRef<HTMLInputElement>(null);

  const imageHandler = (e: any) => {
    setLoading(true);
    const imageFile = e.target.files[0];
    setImgFile(imageFile);
    const fileReader = new FileReader();
    if (imageFile) {
      fileReader.readAsDataURL(imageFile);
    } else {
      return;
    }
    fileReader.onload = (e: any) => setImgSrc(e.target.result);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const imageUploadBtn = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (ImgInput.current) ImgInput.current.click();
  };

  const imageDeleteBtn = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setImgSrc("/5.png");
  };

  console.log(imgFile);
  return (
    <Container>
      <InformationContaniner>
        <h1>회원정보 수정</h1>
        <InformationForm>
          <UploadDiv>
            {loading ? <Loading /> : <img src={imgSrc} />}
            <UploadButton>
              <input
                type="file"
                accept="image/*"
                ref={ImgInput}
                onChange={imageHandler}
              />
              <button onClick={imageUploadBtn}>이미지 업로드</button>
              <button onClick={imageDeleteBtn}>이미지 삭제</button>
            </UploadButton>
          </UploadDiv>
          <div>123</div>
          <div>123</div>
        </InformationForm>
      </InformationContaniner>
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto;
  max-width: 640px;
  min-width: 320px;
  padding-top: 80px;
`;

const InformationContaniner = styled.div`
  margin: 0 auto;
  max-width: 400px;
  h1 {
    font-weight: bold;
    text-align: center;
    font-size: 20px;
    line-height: 32px;
    margin-bottom: 40px;
  }
`;

const InformationForm = styled.form``;
const UploadDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 170px;
    height: 170px;
    border-radius: 50%;
    margin-right: 20px;
  }
`;
const UploadButton = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;
  input {
    display: none;
  }
  button {
    height: 32px;
    margin-bottom: 15px;
  }
`;
export default EditInformation;
