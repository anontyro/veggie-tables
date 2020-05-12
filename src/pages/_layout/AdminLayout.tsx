import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  MainFooter,
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
import AdminSideMenu from './components/SideMenu/AdminSideMenu';
import PullOutSideMenu from './components/SideMenu/PullOutSideMenu';

interface Props {
  children: React.ReactChild;
  isBusy?: boolean;
}

const AdminLayout: React.FC<Props> = ({ children, isBusy }) => {
  const { pathname } = useLocation();
  const { modalType } = useSelector((state: RootState) => state.modal);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  return (
    <React.Fragment>
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
      <AdminSideMenu isOpen={isSideMenuOpen} setIsOpen={setIsSideMenuOpen} />
      <PullOutSideMenu>
        <React.Fragment>
          <li>
            <NavLink isActive={pathname === FRONTEND_ROUTES.HOME} to={FRONTEND_ROUTES.HOME}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              isActive={pathname === FRONTEND_ROUTES.ADMIN.ITEM_LIST}
              to={FRONTEND_ROUTES.ADMIN.ITEM_LIST}
            >
              Item List
            </NavLink>
          </li>
          <li>
            <NavLink
              isActive={pathname === FRONTEND_ROUTES.ADMIN.ADD_ITEM}
              to={FRONTEND_ROUTES.ADMIN.ADD_ITEM}
            >
              Add Item
            </NavLink>
          </li>
        </React.Fragment>
      </PullOutSideMenu>
    </React.Fragment>
  );
};

export default AdminLayout;
