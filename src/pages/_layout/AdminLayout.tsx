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

interface Props {
  children: React.ReactChild;
  isBusy?: boolean;
}

const AdminLayout: React.FC<Props> = ({ children, isBusy }) => {
  const { pathname } = useLocation();

  return (
    <React.Fragment>
      <MainNav>
        <NavMenu>
          <NavLink isActive={pathname === '/admin/item-list'} to="/admin/item-list">
            Item List
          </NavLink>
          <NavLink isActive={pathname === '/admin/add-item'} to="/admin/add-item">
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
    </React.Fragment>
  );
};

export default AdminLayout;
