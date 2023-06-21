import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchUserBadgesSaga(action) {
  try {
    const userBadges = yield call(axios.get, '/users_badges/fetch');
    yield put({ type: 'SET_USER_BADGES', userBadges: userBadges.data });
  } catch (error) {
    console.error('Error GETting user badges:', error);
  }
}

function* addUserBadgeSaga(action) {
    try {
      const { userId, badgeId, tier, date } = action.payload;
      const requestData = {
        user_id: userId,
        badge_id: badgeId,
        tier: tier,
        date: date,
      };
      yield call(axios.post, '/users_badges/award', requestData);
      console.log('Successfully awarded user badge');
      yield put({ type: 'FETCH_USER_BADGES' });
    } catch (error) {
      console.error('Error adding user badge:', error);
    }
  }

function* updateUserBadgeSaga(action) { // expecting id and tier
  try {
    yield call(axios.put, `/users_badges/update/${action.payload.id}`, action.payload);
    console.log('Successfully updated user badge');
    yield put({ type: 'FETCH_USER_BADGES' });
  } catch (error) {
    console.error('Error updating user badge:', error);
  }
}

function* removeUserBadgeSaga(action) { // expecting userBadgeId
  try {
    yield call(axios.delete, `/users_badges/delete/${action.payload}`);
    console.log('Successfully removed user badge');
    yield put({ type: 'FETCH_USER_BADGES' });
  } catch (error) {
    console.error('Error removing user badge:', error);
  }
}

function* watchUserBadges() {
  yield takeLatest('FETCH_USER_BADGES', fetchUserBadgesSaga);
  yield takeLatest('ADD_USER_BADGE', addUserBadgeSaga);
  yield takeLatest('UPDATE_USER_BADGE', updateUserBadgeSaga);
  yield takeLatest('REMOVE_USER_BADGE', removeUserBadgeSaga);
}

export default watchUserBadges;
