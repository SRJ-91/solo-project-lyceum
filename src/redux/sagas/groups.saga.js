import { call, put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';

function* fetchActiveGroupsSaga() {
  try {
    const groups = yield call(axios.get, '/api/groups/active');
    console.log('fetching all active groups to see!', groups.data);
    yield put({ type: 'SET_ACTIVE', payload: groups.data });
  } catch (error) {
    console.log('GETting groups has failed', error);
  }
}

function* fetchDoneGroupsSaga() {
  try {
    const groups = yield call(axios.get, '/api/groups/done');
    console.log('fetching all done groups to see!', groups.data);
    yield put({ type: 'SET_DONE', payload: groups.data });
  } catch (error) {
    console.log('GETting groups has failed', error);
  }
}

function* fetchGroupDetails(action) {
  try {
    const groupId = action.payload;
    const response = yield call(axios.get, `/api/groups/${groupId}`);
    yield put({ type: 'SET_SELECTED_GROUP', payload: response.data });
  } catch (error) {
    console.log('Error fetching group details:', error);
  }
}


function* createGroupSaga(action) {
  try {
    yield call(axios.post, '/api/groups/create', action.payload);
    console.log('Successfully created group', action.payload);
    yield put({ type: 'FETCH_ACTIVE' });
  } catch (error) {
    console.log('Error in creating a group', error);
  }
}

function* updateGroupSaga(action) { //expects a user id plus the groups table keys
  try {
    yield call(axios.put, `/api/groups/update/${action.payload.id}`, action.payload);
    console.log('Successfully updated group', action.payload);
    // yield put({ type: 'FETCH_ACTIVE' });
    yield put ({ type: 'FETCH_SELECTED_GROUP', payload: action.payload.id })
  } catch (error) {
    console.log('Error updating group', error);
  }
}

function* updateStatusSaga(action) { //expects a user id plus the groups table keys
  try {
    yield call(axios.put, `/api/groups/handle-status/${action.payload.id}`, action.payload);
    console.log('Successfully changed group status', action.payload);
    if (action.payload.status) {
      yield put({ type: 'FETCH_DONE' });
    } else {
      yield put({ type: 'FETCH_ACTIVE' });
    }
  } catch (error) {
    console.log('Error updating group status', error);
  }
}


// Watcher saga for groups
function* watchGroups() {
  yield takeLatest('FETCH_ACTIVE', fetchActiveGroupsSaga);
  yield takeLatest('FETCH_DONE', fetchDoneGroupsSaga);
  yield takeLatest('FETCH_SELECTED_GROUP', fetchGroupDetails);
  yield takeLatest('CREATE_GROUP', createGroupSaga);
  yield takeLatest('UPDATE_GROUP', updateGroupSaga);
  yield takeLatest('UPDATE_STATUS', updateStatusSaga);
}

export default watchGroups;