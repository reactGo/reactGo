import styled from '@emotion/styled';

export const MessageWrapper = styled.div<{ show: boolean; success: boolean; }>`
  display: none;
  padding: 12px 0;
  border-radius: var(--globalRadius);
  color: var(--colorBlack);
  font-size: var(--fontMedium);
  text-align: center;
  
  ${(props) => props.show && 'display: block;'};
  ${(props) => props.success && `
    background-color: var(--colorSalem);
    color: var(--colorWhite);
  `};
`;
