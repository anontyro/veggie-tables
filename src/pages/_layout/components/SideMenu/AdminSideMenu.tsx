import React from 'react';
import BaseSideMenu from './BaseSideMenu';
import { useLocation } from 'react-router-dom';
import { FRONTEND_ROUTES } from '../../../../enum/routes';
import NavLink from '../../../../components/Buttons/NavLink';

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AdminSideMenu: React.FC<Props> = ({ isOpen = false, setIsOpen }) => {
  const { pathname } = useLocation();

  return (
    <BaseSideMenu isOpen={isOpen} setIsOpen={setIsOpen}>
      <React.Fragment>
        <h1>first</h1>
        <NavLink
          isActive={pathname === FRONTEND_ROUTES.ADMIN.ADD_ITEM}
          to={FRONTEND_ROUTES.ADMIN.ADD_ITEM}
        >
          Add Item
        </NavLink>
      </React.Fragment>
    </BaseSideMenu>
  );
};

export default AdminSideMenu;
