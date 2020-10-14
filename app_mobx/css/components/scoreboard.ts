import styled from '@emotion/styled';
import { card, title } from '../common/card';
import { subHeading } from '../common/typography';
import { flexNotMoreThan200 } from '../common/layout';

export const ScoreboardWrapper = styled.div`
  ${card};
  width: 40%;
`;

export const Header = styled.h3`
  ${title};
  ${subHeading};
  background: #0F9D58;
  color: #fff;
`;

export const List = styled.ul`
  padding: 16px;
  list-style: none;
`;

export const Item = styled.li`
  display: flex;
  justify-content: space-between;
`;

export const Topic = styled.span`
  ${flexNotMoreThan200};
  font-size: var(--fontMedium);
`;

export const Count = styled.span``;
