import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';


// Saga function to fetch all users
function* fetchAllUsers() {
    try {
      // Make API request to fetch all users
      const response = yield axios.get('/api/user/all');
  
      // Dispatch action to store the fetched users in the Redux store
      yield put({ type: 'SET_ALL_USERS', payload: response.data });
      console.log( 'saga data',response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

function* allUserSaga() {
    yield takeEvery('FETCH_ALL_USERS', fetchAllUsers);
  }

  export default allUserSaga;