import { all, fork } from 'redux-saga/effects';

import topics from './topics';
import users from './users';

export default function* rootSaga() {
  yield all([
    fork(topics),
    fork(users),
  ]);
}
