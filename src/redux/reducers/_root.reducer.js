import { combineReducers } from 'redux';
import errors from './errors.reducer';
import userReducer from './user.reducer';
import allUsers from './all_users.reducer';
import groupsReducer from './groups.reducer';
import badgesReducer from './badges.reducer';
import postsReducer from './posts.reducer';
import user_groupsReducer from './user_groups.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user:userReducer, // will have an id and username if someone is logged in
  groups:groupsReducer,
  badges:badgesReducer,
  allUsers:allUsers,
  posts:postsReducer,
  members:user_groupsReducer
});

export default rootReducer;
