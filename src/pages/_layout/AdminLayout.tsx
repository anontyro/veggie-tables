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
import MainModal from '../../components/Modals';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';

interface Props {
  children: React.ReactChild;
  isBusy?: boolean;
}

const AdminLayout: React.FC<Props> = ({ children, isBusy }) => {
  const { pathname } = useLocation();
  const { modalType } = useSelector((state: RootState) => state.modal);

  return (
    <React.Fragment>
      <MainNav>
        <NavMenu>
          <NavLink isActive={pathname === FRONTEND_ROUTES.HOME} to={FRONTEND_ROUTES.HOME}>
            Veggie Tables
          </NavLink>
          <NavLink
            isActive={pathname === FRONTEND_ROUTES.ADMIN.ITEM_LIST}
            to={FRONTEND_ROUTES.ADMIN.ITEM_LIST}
          >
            Item List
          </NavLink>
          <NavLink
            isActive={pathname === FRONTEND_ROUTES.ADMIN.ADD_ITEM}
            to={FRONTEND_ROUTES.ADMIN.ADD_ITEM}
          >
            Add Item
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
      <MainModal activeModal={modalType} />
    </React.Fragment>
  );
};

export default AdminLayout;
