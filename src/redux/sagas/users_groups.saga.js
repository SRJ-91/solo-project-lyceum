import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchUserGroupsSaga(action) {
  try {
    const usersGroups = yield call(axios.get, `/users_groups/fetch`);
    yield put({ type: 'SET_USER_GROUPS', userGroups: usersGroups.data });
  } catch (error) {
    console.error('Error GETting user groups:', error);
  }
}

function* addUserToGroupSaga(action) { //expecting groupId, userId, role
  try {
    yield call(axios.post, `/users_groups/create`, action.payload);
    console.log('Successfully created users_group', action.payload);
    yield put({ type: 'FETCH_USER_GROUPS'});
  } catch (error) {
    console.error('Error adding user to group:', error);
  }
}

function* updateUserRoleSaga(action) {
  try {
    yield call(axios.put, `/users_groups/update/${action.payload.id}`, action.payload);
    yield put({ type: 'FETCH_USER_GROUPS'});
  } catch (error) {
    console.error('Error updating user role:', error);
  }
}

function* removeUserFromGroupSaga(action) {
  try {
    yield call(axios.delete, `/users_groups/delete/${action.payload}`);
    console.log('kicked user from group', action.payload);
    yield put({ type: 'FETCH_USER_GROUPS'});
  } catch (error) {
    console.error('Error removing user from group:', error);
  }
}

function* watchUserGroups() {
  yield takeLatest('FETCH_USER_GROUPS', fetchUserGroupsSaga);
  yield takeLatest('ADD_USER_TO_GROUP', addUserToGroupSaga);
  yield takeLatest('UPDATE_USER_ROLE', updateUserRoleSaga);
  yield takeLatest('REMOVE_USER_FROM_GROUP', removeUserFromGroupSaga);
}

export default watchUserGroups;
