export default function user_groupsReducer(state = [], action) {
    switch (action.type) {
      case 'SET_USER_GROUPS':
        return action.payload;
      case 'ADD_MEMBERS':
        return [...state, action.payload];
      default:
        return state;
    }
  }