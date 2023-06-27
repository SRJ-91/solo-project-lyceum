export default function postsReducer(state = [], action) {
    switch (action.type) {
      case 'SET_POSTS':
        return action.payload;
      // case 'SET_SELECTED POST':
      //   return action.payload;
      case 'CREATE_POST':
        return [...state, action.payload];
      default:
        return state;
    }
  }