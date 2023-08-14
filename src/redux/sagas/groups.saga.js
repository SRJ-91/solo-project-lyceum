import { call, put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';

function* createGroupSaga(action) {
  try {
    const {
      badge_id,
      region,
      book_name,
      team_name,
      cover, //Add cover to deconstructed properties
      logo, // Add logo to deconstructed properties
      start_date,
      end_date,
      cohort,
      details,
    } = action.payload;

    let coverUrl = 'public/images/stock-photo-old-books-on-wooden-table.jpg';
    let logoUrl = 'public/images/stock-photo-old-books-on-wooden-table.jpg';

    // Upload cover image to Cloudinary
    if (cover !== '') {
      console.log('the cover is', cover);
      const coverFormData = new FormData();
      coverFormData.append('file', cover);
      coverFormData.append('upload_preset', 'ifdf0uhs');

      const coverResponse = yield axios.post(
        'https://api.cloudinary.com/v1_1/lyceum/image/upload',
        coverFormData
      );
      coverUrl = coverResponse.data.secure_url;
    }

    // Upload logo image to Cloudinary
    if (logo !== '') {
      console.log('the logo is', logo);
      const logoFormData = new FormData();
      logoFormData.append('file', logo);
      logoFormData.append('upload_preset', 'ifdf0uhs');

      const logoResponse = yield axios.post(
        'https://api.cloudinary.com/v1_1/lyceum/image/upload',
        logoFormData
      );
      logoUrl = logoResponse.data.secure_url;
    }

    // Construct the new group object with Cloudinary URLs
    const newGroup = {
      badge_id,
      region,
      book_name,
      team_name,
      cover: coverUrl, // Use Cloudinary URLs here
      logo: logoUrl,  //Use Cloudinary URLS here
      start_date,
      end_date,
      cohort,
      details,
    };

    // Send the new group object to your API route
    yield call(axios.post, '/api/groups/create', newGroup);
    console.log('Successfully created group', newGroup);
    yield put({ type: 'FETCH_ACTIVE' });
  } catch (error) {
    console.log('Error in creating a group', error);
  }
}

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