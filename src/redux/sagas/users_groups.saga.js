import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchUserGroupsSaga(action) {
  try {
    const response = yield call(axios.get, `/api/users_groups/${action.payload}`);
    yield put({ type: 'SET_USER_GROUPS', payload: response.data });
    console.log('the payload is', response);
  } catch (error) {
    console.error('Error GETting user groups:', error);
  }
}

function* addUserToGroupSaga(action) { //expecting groupId, userId, role
  try {
    yield call(axios.post, `/api/users_groups/add`, action.payload);
    console.log('Successfully created users_group', action.payload);
    yield put({ type: 'FETCH_MEMBERS', payload: action.reading_group_id });;
  } catch (error) {
    console.error('Error adding user to group:', error);
  }
}

function* updateUserRoleSaga(action) {
  try {
    yield call(axios.put, `/api/users_groups/update/${action.payload.id}`, action.payload);
    yield put({ type: 'FETCH_MEMBERS'});
  } catch (error) {
    console.error('Error updating user role:', error);
  }
}

function* removeUserFromGroupSaga(action) {
  try {
    yield call(axios.delete, `/api/users_groups/kick/${action.payload.memberId}/${action.payload.groupId}`);
    console.log('kicked user from group:', action.payload.memberId);
    yield put({ type: 'FETCH_MEMBERS', payload: action.payload.groupId});
  } catch (error) {
    console.error('Error removing user from group:', error);
  }
}

function* watchUserGroups() {
  yield takeLatest('FETCH_MEMBERS', fetchUserGroupsSaga);
  yield takeLatest('ADD_MEMBERS', addUserToGroupSaga);
  yield takeLatest('UPDATE_USER_ROLE', updateUserRoleSaga);
  yield takeLatest('REMOVE_USER_FROM_GROUP', removeUserFromGroupSaga);
}

export default watchUserGroups;
