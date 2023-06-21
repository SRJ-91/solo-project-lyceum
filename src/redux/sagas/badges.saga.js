import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Fetch badges saga
function* fetchBadgesSaga() {
  try {
    const badges = yield call(axios.get, '/badges/fetch');
    yield put({ type: 'SET_BADGES', badges: badges.data });
  } catch (error) {
    console.log('Error GETting badges:', error);
  }
}

// Create badge saga
function* createBadgeSaga(action) {
  try {
    yield call(axios.post, '/badges/create', action.payload);
    console.log('Successfully created badge', action.payload);
    yield put({ type: 'FETCH_BADGES' });
  } catch (error) {
    console.log('Error creating badge:', error);
  }
}

// Update badge saga
function* updateBadgeSaga(action) {
  try {
    yield call(axios.put, `/badges/update/${action.payload.id}`, action.payload);
    console.log('Successfully updated badge', action.payload);
    yield put({ type: 'FETCH_BADGES' });
  } catch (error) {
    console.log('Error updating badge:', error);
  }
}

// Delete badge saga
function* deleteBadgeSaga(action) {
  try {
    yield call(axios.delete, `/badges/delete/${action.payload.id}`);
    console.log('Successfully deleted badge', action.payload);
    yield put({ type: 'FETCH_BADGES' });
  } catch (error) {
    console.log('Error deleting badge:', error);
  }
}

// Watcher saga for badges
function* watchBadges() {
  yield takeLatest('FETCH_BADGES', fetchBadgesSaga);
  yield takeLatest('CREATE_BADGE', createBadgeSaga);
  yield takeLatest('UPDATE_BADGE', updateBadgeSaga);
  yield takeLatest('DELETE_BADGE', deleteBadgeSaga);
}

export default watchBadges;
