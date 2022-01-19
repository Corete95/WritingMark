import React, { FC, useCallback } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Navigation from "./Navigation";

const Nav: FC = () => {
  const [showNavigation, setShowNavigation] = useState(false);
  const { user } = useSelector((state: any) => state.user);

  const onClickNavigation = useCallback(() => {
    setShowNavigation((prev) => !prev);
  }, []);

  const goToMain = () => {
    window.location.replace("/");
  };

  return (
    <>
      <ContainerNav>
        <TopNav>
          <IconMenu onClick={onClickNavigation}>
            <img src="/images/menu.png" />
          </IconMenu>
          <Logo onClick={goToMain}>글갈피</Logo>
          <IconMenu>
            {user?._id ? (
              <Link to="/MyPage">
                <img src="/images/member.png" />
              </Link>
            ) : (
              <Link to="/login">
                <img src="/images/member.png" />
              </Link>
            )}
          </IconMenu>
        </TopNav>
      </ContainerNav>

      <Navigation show={showNavigation} onCloseModal={onClickNavigation} />
    </>
  );
};

const ContainerNav = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  margin: 0 auto;
  max-width: 640px;
  min-width: 320px;
  background-color: #fff;
  ${({ theme }) => theme.media.mobile`
    margin:0px 16px;
  `}
`;
const TopNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 6px 0px;
`;
const IconMenu = styled.div`
  cursor: pointer;
  img {
    width: 24px;
  }
`;
const Logo = styled.span`
  font-size: 20px;
  cursor: pointer;
`;

export default Nav;
