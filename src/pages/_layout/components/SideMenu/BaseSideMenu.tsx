import React from 'react';
import styled from 'styled-components';

interface MenuProps {
  isOpen?: boolean;
}

const MenuContainer = styled.div<MenuProps>`
  width: 100vw;
  height: 100vh;
  background-color: #7aa1da;
  position: fixed;
  top: 0;
  left: 0;
  transform: translate3d(100vw, 0, 0);
  transition: transform 0.3s cubic-bezier(0, 0.52, 0, 1);
  ${(props: MenuProps) => (props.isOpen ? `transform: translate3d(0vw, 0, 0)` : '')};
`;

const CloseButton = styled.button`
  background: none;
  border: 0;
  box-sizing: border-box;
  color: transparent;
  cursor: pointer;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 18px;
  right: 40px;
  top: 20px;
  letter-spacing: 1.5px;
  line-height: 50px;
  outline: none;
  overflow: hidden;
  padding: 10px 0 0;
  position: absolute;
  text-transform: uppercase;
  transition: all 0.2s ease-in;
  width: 70px;

  ::before,
  ::after {
    background-color: white;
    content: '';
    display: block;
    height: 1px;
    left: 0;
    position: absolute;
    transform-origin: center left;
    transition: all 0.2s ease-in;
    width: 141.4214px;
    z-index: -1;
  }

  ::before {
    top: 0;
    transform: rotate(45deg);
  }

  ::after {
    bottom: 0;
    transform: rotate(-45deg);
  }

  :hover {
    color: #8a2387;
  }

  :hover::before,
  :hover::after {
    height: 50px;
    transform: rotate(0deg);
  }
`;

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactChild;
}

const BaseSideMenu: React.FC<Props> = ({ isOpen = false, setIsOpen, children }) => {
  return (
    <MenuContainer isOpen={isOpen}>
      <CloseButton
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        close
      </CloseButton>
      {children}
    </MenuContainer>
  );
};

export default BaseSideMenu;
