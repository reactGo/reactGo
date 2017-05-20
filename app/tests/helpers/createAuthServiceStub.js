import sinon from 'sinon';
import * as authService from '../../services/authentication';

const createAuthServiceStub = () => ({
  replace: method => ({
    with: data => {
      const sandbox = sinon.sandbox.create();
      sandbox.stub(authService, 'default').returns({
        [method]: data
      });
      return sandbox;
    }
  })
});

export default createAuthServiceStub;

