import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* registerUser(action) {
  try {
    // clear any existing error on the registration page
    yield put({ type: 'CLEAR_REGISTRATION_ERROR' });

    // Upload avatar to Cloudinary
    let avatarUrl = null;
    if (action.payload.avatar) {
      const avatarFormData = new FormData();
      avatarFormData.append('file', action.payload.avatar);
      avatarFormData.append('upload_preset', 'ifdf0uhs'); // Replace with your upload preset
      
      const avatarResponse = yield axios.post(
        'https://api.cloudinary.com/v1_1/lyceum/image/upload',
        avatarFormData
      );
      avatarUrl = avatarResponse.data.secure_url;
    }

    // Modify the payload to include the avatar URL if available
    const updatedPayload = avatarUrl
      ? { ...action.payload, avatar: avatarUrl }
      : action.payload;

    // passes the modified payload to the server
    yield axios.post('/api/user/register', updatedPayload);

    // automatically log a user in after registration
    yield put({ type: 'LOGIN', payload: updatedPayload });

    // set to 'login' mode so they see the login screen
    // after registration or after they log out
    yield put({ type: 'SET_TO_LOGIN_MODE' });
  } catch (error) {
    console.log('Error with user registration:', error);
    yield put({ type: 'REGISTRATION_FAILED' });
  }
}

function* registrationSaga() {
  yield takeLatest('REGISTER', registerUser);
}

export default registrationSaga;
