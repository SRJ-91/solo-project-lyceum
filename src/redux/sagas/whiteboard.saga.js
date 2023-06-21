import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchWhiteboardSaga() {
  try {
    const whiteboard = yield call(axios.get, `/whiteboard/fetch`);
    yield put({ type: 'SET_WHITEBOARD', payload: whiteboard.data });
  } catch (error) {
    console.error('Error fetching whiteboard notes:', error);
  }
}

function* addWhiteboardNoteSaga(action) {
  try {
    const { groupId, note } = action.payload;
    yield call(axios.post, `/whiteboard/create`, { groupId, note });
    yield put({ type: 'FETCH_WHITEBOARD', payload: groupId });
  } catch (error) {
    console.error('Error adding whiteboard note:', error);
  }
}

function* watchWhiteboard() {
  yield takeLatest('FETCH_WHITEBOARD', fetchWhiteboardSaga);
  yield takeLatest('ADD_WHITEBOARD_NOTE', addWhiteboardNoteSaga);
}

export default watchWhiteboard;
