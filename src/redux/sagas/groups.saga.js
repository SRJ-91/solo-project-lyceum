import { call, put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';

function* fetchGroupsSaga() {
  try {
    const groups = yield call(axios.get, '/api/groups/fetch');
    console.log('fetching all groups to see!', groups.data);
    yield put({ type: 'SET_GROUPS', payload: groups.data });
  } catch (error) {
    console.log('GETting groups has failed', error);
  }
}

function* createGroupSaga(action) {
  try {
    yield call(axios.post, '/api/groups/create', action.payload);
    console.log('Successfully created group', action.payload);
    yield put({ type: 'FETCH_GROUPS' });
  } catch (error) {
    console.log('Error in creating a group', error);
  }
}

function* updateGroupSaga(action) { //expects a user id plus the groups table keys
    try {
      yield call(axios.put, `/api/groups/update/${action.payload.id}`, action.payload);
      console.log('Successfully updated group', action.payload);
      yield put({ type: 'FETCH_GROUPS' });
    } catch (error) {
      console.log('Error updating group', error);
    }
  }
  

// Watcher saga for groups
function* watchGroups() {
    yield takeLatest('FETCH_GROUPS', fetchGroupsSaga);
    yield takeLatest('CREATE_GROUP', createGroupSaga);
    yield takeLatest('UPDATE_GROUP', updateGroupSaga);
  }
  
  export default watchGroups;