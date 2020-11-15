import React, { FC } from 'react';
import { Switch } from 'react-router-dom';
import { renderRoutes, RouteConfig } from 'react-router-config';
import { Global } from '@emotion/react';

import { AppWrapper, global } from '../css/main';
import Navigation from './Navigation';
import Message from './Message';

interface Props {
    route: RouteConfig;
}
const App: FC<Props> = ({ route }) => (
  <AppWrapper>
    <Global
      styles={global}
    />
    <Navigation />
    <Message />
    <Switch>
      {renderRoutes(route.routes)}
    </Switch>
  </AppWrapper>
);

export default App;
