import styled from '@emotion/styled';
import { flexNotMoreThan200 } from '../common/layout';

export const TopicItemWrapper = styled.li`
  display: flex;
  justify-content: space-between;
`;

export const Topic = styled.span`
  ${flexNotMoreThan200};
  font-size: var(--fontMedium);
`;

export const Button = styled.button`
  font-size: var(--fontMedium);
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  margin: 0 28px;
  color: #fff;
`;

export const Increment = styled(Button)`
   background-color: var(--colorSalem);
`;

export const Decrement = styled(Button)`
  background-color: var(--colorDodgerBlue);
`;

export const Destroy = styled(Button)`
  background-color: var(--colorPunch);
`;
