import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import allUserSaga from './all_users.saga';
import watchGroups from './groups.saga';
import watchBadges from './badges.saga';
import watchWhiteboard from './whiteboard.saga';
import watchPosts from './posts.saga';
import watchUserGroups from './users_groups.saga';
import watchUserBadges from './users_badges.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    allUserSaga(),
    watchGroups(),
    watchBadges(),
    watchWhiteboard(),
    watchPosts(),
    watchUserGroups(),
    watchUserBadges()
  ]);
}
