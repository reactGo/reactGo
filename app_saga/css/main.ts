import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { box } from './common/layout';

export const global = css`
  @import url(https://fonts.googleapis.com/css?family=Montserrat:400,700);
  :root {
    --globalRadius:             4px;
    --ViewTransitionIn:         opacity .4s ease-in;
    --ViewTransitionOut:        opacity .1s ease-out;
    --colorBlack:               #000;
    --colorWhite:               #fff;
    --colorDodgerBlue:          #2196F3;
    --colorSalem:               #0F9D58;
    --colorDarkerSalem:         #0b6e3e;
    --colorPunch:               #db4437;
    --colorLoblolly:            #c3c8ce;
    --colorLimedSpruce:         #333f48;
    --colorAthensGray:          #f5f5f6;
    --colorMercury:             #e3e3e3;
    --colorBombay:              #b4bac1;
    --colorCrimson:             #ed193a;
    --colorDarkerCrimson:       color(var(--colorCrimson) blackness(+20%));
    --fontMontserrat:           'Montserrat', Helvetica, Arial, sans-serif;
    --fontSmall:                12px;
    --fontMedium:               16px;
    --fontLarge:                21px;
    --fontHuge:                 28px;
  }

  * { box-sizing: border-box; }
      
  body {
    margin: 0;
    font-family: var(--fontMontserrat);
  }
`;

export const AppWrapper = styled.div`
  ${box};
  height: 100%;
  font-weight: normal;
  font-smoothing: antialiased;
`;
