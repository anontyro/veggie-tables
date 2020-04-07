import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  MainFooter,
  MainNav,
  NavMenu,
  ContentContainer,
  PageContent,
  FooterContainer,
  ExternalLink,
} from './components/LayoutStyles';
import NavLink, { externalLink } from '../../components/Buttons/NavLink';
import { FRONTEND_ROUTES } from '../../enum/routes';

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
          <NavLink isActive={pathname === FRONTEND_ROUTES.HOME} to={FRONTEND_ROUTES.HOME}>
            Home
          </NavLink>
          <NavLink isActive={pathname === FRONTEND_ROUTES.CART} to={FRONTEND_ROUTES.CART}>
            Cart
          </NavLink>
          <NavLink
            isActive={pathname === FRONTEND_ROUTES.ADMIN.ITEM_LIST}
            to={FRONTEND_ROUTES.ADMIN.ITEM_LIST}
          >
            Admin
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
