import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchPostsSaga() {
  try {
    const posts = yield call(axios.get, '/api/posts/fetch');
    console.log('Fetching posts:', posts);
    yield put({ type: 'SET_POSTS', payload: posts.data });
  } catch (error) {
    console.log('Error fetching posts:', error);
  }
}

function* createPostSaga(action) {
  try {
    yield call(axios.post, '/api/posts/create', action.payload);
    console.log('Successfully created post:', action.payload);
    yield put({ type: 'FETCH_POSTS' });
  } catch (error) {
    console.log('Error creating post:', error);
  }
}

function* updatePostSaga(action) { //expects title, content, status
  try {
    yield call(axios.put, `/api/posts/update/${action.payload.id}`, action.payload );
    console.log('Successfully updated post:', action.payload);
    yield put({ type: 'FETCH_POSTS' });
  } catch (error) {
    console.log('Error updating post:', error);
  }
}

function* deletePostSaga(action) {
  try {
    yield call(axios.delete, `/api/posts/delete/${action.payload.id}`);
    console.log('Successfully deleted post:', action.payload);
    yield put({ type: 'FETCH_POSTS' });
  } catch (error) {
    console.log('Error deleting post:', error);
  }
}

function* watchPosts() {
  yield takeLatest('FETCH_POSTS', fetchPostsSaga);
  yield takeLatest('CREATE_POST', createPostSaga);
  yield takeLatest('UPDATE_POST', updatePostSaga);
  yield takeLatest('DELETE_POST', deletePostSaga);
}

export default watchPosts;
