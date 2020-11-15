import { css } from '@emotion/react';
import { normal } from './typography';

export const input = css`
  ${normal};
  padding: 0.75rem 1rem;
  border: 2px solid var(--colorLoblolly);
  border-radius: 4px;
  width: 100%;

  background-color: var(--colorWhite);
  color: var(--colorLimedSpruce);
  margin-bottom: 0.75rem;
`;
