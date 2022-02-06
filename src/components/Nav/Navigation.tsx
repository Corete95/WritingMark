import React, { FC, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { NAVIGATION_CATEGORY } from "Config";
import { useSelector } from "react-redux";

interface Props {
  show: boolean;
  onCloseModal: () => void;
}

const Navigation: FC<Props> = ({ show, onCloseModal }) => {
  const { user } = useSelector((state: any) => state.user);
  const history = useHistory();

  const stopPropagation = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.stopPropagation();
    },
    [],
  );

  const LogOut = () => {
    localStorage.removeItem("token");
    if (window.Kakao.Auth.getAccessToken()) {
      console.log("카카오 인증 엑세스 토큰 존재");
      window.Kakao.Auth.logout(() => {
        console.log("카카오 로그아웃 완료");
      });
    }
    setTimeout(() => {
      history.push("/");
      window.location.reload();
    }, 500);
  };

  if (!show) {
    return null;
  }

  return (
    <NavigationModal onClick={onCloseModal}>
      <Container onClick={stopPropagation}>
        <Logo>
          <img src="/images/writingMark.png" />
        </Logo>
        <img className="lineBasic" src="/images/lineBasic.png" />
        <Login>
          {user?._id ? (
            <>
              <span>
                <em
                  onClick={() => {
                    history.push("/MyPage");
                    onCloseModal();
                  }}
                >
                  {user.nickname}
                </em>
                님 반갑습니다!
              </span>
              <UserButton>
                <WritingBtn to="/Writing" onClick={onCloseModal}>
                  글쓰기
                </WritingBtn>
                <WritingBtn to="/" onClick={LogOut}>
                  로그아웃
                </WritingBtn>
              </UserButton>
            </>
          ) : (
            <span>
              <em
                onClick={() => {
                  history.push("/Login");
                  onCloseModal();
                }}
              >
                로그인
              </em>
              을 해주세요!
            </span>
          )}
        </Login>
        <img className="lineClip" src="/images/lineClip1.png" />
        <NavigationCategory>
          {NAVIGATION_CATEGORY?.map((category) => {
            return (
              <Link to={category.path} key={category.id} onClick={onCloseModal}>
                <span>{category.name}</span>
              </Link>
            );
          })}
        </NavigationCategory>
        <img className="test1" src="/images/lineBasic.png" />
      </Container>
    </NavigationModal>
  );
};

const NavigationModal = styled.div`
  position: fixed;
  inset: 0px;
  z-index: 1022;
  background: rgba(0, 0, 0, 0.4);
  .lineClip {
    width: 100%;
    height: 55px;
  }
  .lineBasic {
    width: 100%;
  }
`;

const Container = styled.div`
  overflow-y: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 400px;
  padding: 20px 20px;
  background-color: #fff;
  animation: 0.7s ${(props: any) => (props.show ? "showOut" : "showUp")}
    forwards;

  @keyframes showUp {
    0% {
      transform: translate(-100%, 0);
    }

    100% {
      transform: translate(0, 0);
    }
  }

  @keyframes showOut {
    0% {
      transform: translate(0, 0);
    }

    100% {
      transform: translate(-100%, 0);
    }
  }

  ${({ theme }) => theme.media.mobile`
    width:304px;
  `}
`;

const Logo = styled.div`
  text-align: center;
  img {
    width: 100px;
  }
`;
const Login = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0px;
  span {
    padding-left: 15px;
    font-weight: bold;
    font-size: 20px;
    line-height: 40px;

    em {
      border-bottom: 1px solid black;
      cursor: pointer;
    }
  }
`;
const NavigationCategory = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 0px 20px 15px;
  a {
    margin: 14px 0px;
    font-size: 18px;
    font-weight: 700;
  }
  a:link {
    color: black;
  }
  a:visited {
    color: black;
  }
  a:hover {
    color: black;
  }
`;
const UserButton = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 10px;
`;
const WritingBtn = styled(Link)`
  background-color: black;
  text-align: center;
  height: 32px;
  width: 150px;
  border-radius: 24px 24px;
  color: white;
  padding-top: 9px;
  ${({ theme }) => theme.media.mobile`
    width:100px;
  `}
`;
export default Navigation;
