import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { COLOURS } from '../../enum/colours';

interface NavLinkProps {
  isActive?: boolean;
}

export const externalLink = (url: string) => {
  window.open(url, '_blank');
};

const NavLink = styled(({ isActive, to, ...rest }) => <Link to={to} {...rest} />)<NavLinkProps>`
  padding: 0 10px;
  cursor: ${(props: NavLinkProps) => (props.isActive ? 'unset' : 'pointer')};
  ${(props: NavLinkProps) => (props.isActive ? `color: ${COLOURS.SECONDARY_TEXT}` : '')};
  :hover {
    color: ${COLOURS.SECONDARY_TEXT};
  }
`;

export default NavLink;
