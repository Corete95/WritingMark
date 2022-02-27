import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { KAKAO_LOGIN_REQUEST } from "redux/types";
const { Kakao } = window;

const SocialKakao = () => {
  const dispatch = useDispatch();

  const loginWithKakao = () => {
    Kakao.isInitialized();
    window.Kakao.Auth.login({
      success: function (authObj: any) {
        dispatch({
          type: KAKAO_LOGIN_REQUEST,
          payload: authObj.access_token,
        });
      },
      fail: function (err: string) {
        alert(JSON.stringify(err));
      },
    });
  };

  return (
    <KakaoBtn id="custom-login-btn" onClick={() => loginWithKakao()}>
      <div className="kakaoImg"></div>
      <div className="text">카카오톡 시작하기</div>
    </KakaoBtn>
  );
};
const KakaoBtn = styled.button`
  width: 190px;
  height: 50px;
  background-color: #fee500;
  border: 1px solid #fee500;
  cursor: pointer;
  .kakaoImg {
    display: inline-block;
    float: left;
    width: 28px;
    height: 28px;
    background-size: 21px;
    background-image: url(https://static.sixshop.com/resources/images/kakao/login-kakao.png);
    background-repeat: no-repeat;
    background-position: center;
    ${({ theme }) => theme.media.mobile`
    width: 22px;
    height: 22px;
    background-size: 24px;
  `}
  }
  .text {
    display: inline-block;
    border-left: 1px solid;
    border-color: rgba(0, 0, 0, 0.1);
    width: 140px;
    line-height: 28px;
    text-align: center;
    float: right;
    ${({ theme }) => theme.media.mobile`
     width: 137px;
    line-height: 22px;
  `}
  }
`;
export default SocialKakao;
