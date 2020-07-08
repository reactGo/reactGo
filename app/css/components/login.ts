import styled from '@emotion/styled';
import { small, subHeading } from '../common/typography';
import { greenButton } from '../common/button';
import { input } from '../common/input';

export const Loading = styled.img`
  display: none;
  text-align: center;
  margin: 24px auto;
`;

export const LoginWrapper = styled.div<{ waiting: boolean }>`
  width: 420px;
  margin: 0 auto;
  background-color: var(--colorAthensGray);
  border: 2px solid var(--colorMercury);
  border-radius: var(--globalRadius);
  
  ${(props) => props.waiting && `
    & ${Loading} {
      display: block;
    }
  `};
`;

export const Alternative = styled.div`
  background: var(--colorWhite);
  padding: 12px 8px;
  font-size: var(--fontMedium);
  text-align: center;
`;

export const AlternativeLink = styled.button`
  color: var(--colorDodgerBlue);
  font-weight: bold;
  cursor: pointer;
  background: transparent;
  border: none;
  outline: none;
`;

export const EmailContainer = styled.div`
  padding: 16px 12px;
  border-bottom: 2px solid var(--colorMercury);
`;

export const GoogleContainer = styled.div`
  padding: 16px 12px;
`;

export const Header = styled.div``;

export const Heading = styled.h1`
  ${subHeading};
  padding: 16px 12px;
  text-align: center;
`;

export const Input = styled.input`
  ${input};
`;

export const Message = styled.p<{ show: boolean }>`
  color: var(--colorCrimson);
  font-size: var(--fontSmall);
  display: none;
  
  ${(props) => props.show && 'display: inline-block'};
`;

export const Button = styled.button`
  ${greenButton};
`;

export const Hint = styled.div`
  ${small};
  color: var(--colorBombay);
`;
