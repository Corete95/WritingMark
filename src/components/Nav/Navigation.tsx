import React, { FC, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { NAVIGATION_CATEGORY } from '../../Config';

interface Props {
  show: boolean;
  onCloseModal: () => void;
}

const Navigation: FC<Props> = ({ show, onCloseModal }) => {
  const stopPropagation = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.stopPropagation();
    },
    [],
  );

  if (!show) {
    return null;
  }
  return (
    <NavigationModal onClick={onCloseModal}>
      <Container onClick={stopPropagation}>
        <Logo>
          <span>로고</span>
        </Logo>
        <Login>
          <span>
            <em>로그인</em>을 해주세요!
          </span>
        </Login>
        <NavigationCategory>
          {NAVIGATION_CATEGORY.map((category) => {
            return (
              <Link to={category.path} key={category.id} onClick={onCloseModal}>
                <span>{category.name}</span>
              </Link>
            );
          })}
        </NavigationCategory>
      </Container>
    </NavigationModal>
  );
};

const NavigationModal = styled.div`
  position: fixed;
  inset: 0px;
  z-index: 1022;
  background: rgba(0, 0, 0, 0.4);
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
  animation: 0.7s ${(props: any) => (props.show ? 'showOut' : 'showUp')}
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
  border-bottom: 1px solid #e3e5e8;
  text-align: center;
  span {
    font-size: 20px;
    line-height: 40px;
  }
`;
const Login = styled.div`
  border-bottom: 1px solid #e3e5e8;
  padding: 8px 0px;
  span {
    font-weight: bold;
    font-size: 20px;
    line-height: 40px;
    cursor: pointer;

    em {
      border-bottom: 1px solid black;
    }
  }
`;
const NavigationCategory = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #e3e5e8;
  padding: 20px 0px;
  a {
    margin: 14px 0px;
    font-size: 16px;
  }
`;
export default Navigation;
