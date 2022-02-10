import React from "react";
import { KAKAO_KEY } from "Config";
import styled from "styled-components";
import axios from "axios";
import { useDispatch } from "react-redux";
import { KAKAO_LOGIN_REQUEST } from "redux/types";
const { Kakao } = window;

const SocialKakao = () => {
  const dispatch = useDispatch();

  const loginWithKakao = () => {
    Kakao.isInitialized();
    window.Kakao.Auth.login({
      success: function (authObj: any) {
        console.log("authObj", authObj);
        // fetch(`${KAKAO_KEY}`, {
        //   method: "GET",
        //   headers: { Authorization: authObj.access_token },
        // })
        //   .then((res) => res.json())
        //   .then((res) => {
        //     console.log(res);
        //   });

        // axios
        //   .get("/user/kakao", {
        //     headers: { Authorization: authObj.access_token },
        //   })
        //   .then((res) => console.log(res))
        //   .catch((error) => console.log(error.response));
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
    width: 32px;
    height: 28px;
    background-size: 21px;
    background-image: url(https://static.sixshop.com/resources/images/kakao/login-kakao.png);
    background-repeat: no-repeat;
    background-position: center;
  }
  .text {
    display: inline-block;
    border-left: 1px solid;
    border-color: rgba(0, 0, 0, 0.1);
    width: 140px;
    line-height: 28px;
    text-align: center;
    float: right;
  }
`;
export default SocialKakao;
