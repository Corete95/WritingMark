import React, { FC, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { NAV_CATEGORY } from "Config";

const NavTab: FC = () => {
  const [isActivatedCategory, setIsActivatedCategory] = useState("신규");
  const history = useHistory();

  const handleCategory = (cateory: string, path: string) => {
    setIsActivatedCategory(cateory);
    history.push(path);
  };
  return (
    <ContainerNavTab>
      <BottomNav>
        {NAV_CATEGORY.map((category) => {
          return (
            <div
              key={category.id}
              className={
                isActivatedCategory === category.name ? "activeOn" : ""
              }
              onClick={() => {
                handleCategory(category.name, category.path);
              }}
            >
              <span> {category.name}</span>
            </div>
          );
        })}
      </BottomNav>
    </ContainerNavTab>
  );
};
const ContainerNavTab = styled.div`
  margin: 0 auto;
  max-width: 640px;
  min-width: 320px;
  padding-top: 31px;
`;
const BottomNav = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  line-height: 43px;
  border-bottom: 1px solid #e3e5e8;
  padding: 0 5px;

  div {
    flex: 1;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
    &.activeOn {
      font-weight: bold;
      border-bottom: 3px solid black;
    }
  }
`;
export default NavTab;
