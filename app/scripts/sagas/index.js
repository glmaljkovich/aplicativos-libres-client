import { all, fork } from 'redux-saga/effects';

import github from './github';
import user from './user';
import messages from './messages';
import votes from './abortion-project';
import ui from './ui';
import orders from './orders';
import fbEvents from './fb-events';

/**
 * rootSaga
 */
export default function* root() {
  yield all([
    fork(github),
    fork(user),
    fork(messages),
    fork(votes),
    fork(ui),
    fork(orders),
    fork(fbEvents),
  ]);
}
