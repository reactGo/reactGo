import App from './containers/App';
import Vote from './pages/Vote';
import LoginOrRegister from './pages/LoginOrRegister';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import { topicStore } from './store';

const routes = [{
  component: App,
  routes: [{
    path: '/',
    exact: true,
    component: Vote,
    fetchData: () => {
      return topicStore.getTopics();
    },
  }, {
    path: '/login',
    component: LoginOrRegister,
  }, {
    path: '/dashboard',
    component: Dashboard,
  }, {
    path: '/about',
    component: About,
  }],
}];

export default routes;
