import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Create badge saga
function* createBadgeSaga(action) {
  try {
    const { img, name, description } = action.payload;

    let imgUrl = 'https://res.cloudinary.com/lyceum/image/upload/v1692048545/badge_placeholder_iijd4x.jpg'; // Default image URL or any placeholder

    if (img instanceof File) {
      const formData = new FormData();
      formData.append('file', img);
      formData.append('upload_preset', 'ifdf0uhs');

      const response = yield axios.post(
        'https://api.cloudinary.com/v1_1/lyceum/image/upload',
        formData
      );

      imgUrl = response.data.secure_url;
    }

    // Create badge object with Cloudinary image URL
    const newBadge = {
      img: imgUrl,
      name,
      description,
    };

    yield call(axios.post, '/api/badges/create', newBadge);
    console.log('Successfully created badge', newBadge);
    yield put({ type: 'FETCH_BADGES' });
  } catch (error) {
    console.log('Error creating badge:', error);
  }
}

function* updateBadgeSaga(action) {
  try {
    const { id, img, name, description } = action.payload;

    // Upload badge image to Cloudinary
    const formData = new FormData();
    formData.append('file', img);
    formData.append('upload_preset', 'ifdf0uhs');

    const response = yield axios.post(
      'https://api.cloudinary.com/v1_1/lyceum/image/upload',
      formData
    );

    const imgUrl = response.data.secure_url;

    // Construct the updated badge object with Cloudinary URL
    const updatedBadge = {
      id,
      img: imgUrl,
      name,
      description,
    };

    yield call(axios.put, `/api/badges/update/${id}`, updatedBadge);
    console.log('Successfully updated badge', updatedBadge);

    // Dispatch action to fetch the updated badge data
    yield put({ type: 'FETCH_BADGE_DETAILS', payload: id });
  } catch (error) {
    console.log('Error updating badge', error);
  }
}



// Fetch badges saga
function* fetchBadgesSaga() {
  try {
    const badges = yield call(axios.get, '/api/badges/fetch');
    yield put({ type: 'SET_BADGES', payload: badges.data });
  } catch (error) {
    console.log('Error GETting badges:', error);
  }
}

// Delete badge saga
function* deleteBadgeSaga(action) {
  try {
    yield call(axios.delete, `/api/badges/delete/${action.payload}`);
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
