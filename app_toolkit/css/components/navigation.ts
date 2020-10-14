import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

export const NavigationWrapper = styled.nav`
  padding: 0 28px;
`;

export const Item = styled(NavLink)`
  display: inline-block;
  text-decoration: none;
  padding: 16px 32px;
  color: var(--colorBlack);
  background: transparent;
  border: none;
  font-family: var(--fontMontserrat);
  font-size: 16px;
  cursor: pointer;
  
  &.active {
    color: var(--colorDodgerBlue);
  }
`;

export const Logo = styled(Item)`
  font-size: var(--fontHuge);
`;
