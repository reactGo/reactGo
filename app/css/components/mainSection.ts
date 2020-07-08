import styled from '@emotion/styled';
import { card, title } from '../common/card';
import { subHeading } from '../common/typography';

export const MainSectionWrapper = styled.div`
  ${card};
  width: 50%;
  border-radius: var(--globalRadius);
`;

export const Header = styled.h3`
  ${title};
  ${subHeading};
  background: #ed193a;
  color: #fff;
`;

export const List = styled.ul`
  list-style: none;
  padding: 16px;
`;
