import styled from 'styled-components';
import { COLOURS } from '../../../enum/colours';

export const MainNav = styled.div`
  height: 60px;
  background-color: black;
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  color: white;
  padding: 20px;
  @media screen and (min-width: 600px) {
    flex-direction: row;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const ContentContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const PageContent = styled.div`
  position: relative;
  top: 0;
  width: 100%;
`;

export const MainFooter = styled.div`
  background-color: black;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px;
`;
export const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ExternalLink = styled.div`
  cursor: pointer;
  :hover {
    color: ${COLOURS.SECONDARY_TEXT};
  }
`;
