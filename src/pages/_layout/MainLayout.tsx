import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { COLOURS } from '../../enum/colours';

interface NavLinkProps {
  isActive?: boolean;
}

export const externalLink = (url: string) => {
  window.open(url, '_blank');
};

const NavLink = styled(({ isActive, ...rest }) => <Link {...rest} />)<NavLinkProps>`
  padding: 0 10px;
  cursor: ${(props: NavLinkProps) => (props.isActive ? 'unset' : 'pointer')};
  ${(props: NavLinkProps) => (props.isActive ? `color: ${COLOURS.SECONDARY_TEXT}` : '')};
  :hover {
    color: ${COLOURS.SECONDARY_TEXT};
  }
`;

const MainNav = styled.div`
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

const NavMenu = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ContentContainer = styled.div`
  position: relative;
  width: 100%;
`;

const PageContent = styled.div`
  position: relative;
  top: 0;
  width: 100%;
`;

const MainFooter = styled.div`
  background-color: black;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px;
`;
const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ExternalLink = styled.div`
  cursor: pointer;
  :hover {
    color: ${COLOURS.SECONDARY_TEXT};
  }
`;

interface Props {
  children: React.ReactChild;
  isBusy?: boolean;
}

const MainLayout: React.FC<Props> = ({ children, isBusy }) => {
  const { pathname } = useLocation();

  return (
    <React.Fragment>
      <MainNav>
        <NavMenu>
          <NavLink isActive={pathname === '/'} to="/">
            Home
          </NavLink>
          <NavLink isActive={pathname === '/cart'} to="/cart">
            Cart
          </NavLink>
        </NavMenu>
      </MainNav>
      <ContentContainer className="content">
        {isBusy ? <p>Loading...</p> : <PageContent>{children}</PageContent>}
      </ContentContainer>

      <MainFooter className="footer">
        <FooterContainer>
          <ExternalLink onClick={() => externalLink('https://alexwilkinson.co')}>
            Alexander Wilkinson
          </ExternalLink>
        </FooterContainer>
      </MainFooter>
    </React.Fragment>
  );
};

export default MainLayout;
