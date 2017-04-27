import sinon from 'sinon';
import * as voteService from '../../services/topics';

const createVoteServiceStub = () => ({
  replace: method => ({
    with: data => {
      const sandbox = sinon.sandbox.create();
      sandbox.stub(voteService, 'default').returns({
        [method]: data
      });
      return sandbox;
    }
  })
});

export default createVoteServiceStub;

