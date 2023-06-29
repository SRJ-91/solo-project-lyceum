export default function groupsReducer(state = [], action) {
    switch (action.type) {
      case 'SET_ACTIVE':
        return action.payload;
      case 'SET_DONE':
        return action.payload;
      case 'SET_SELECTED_GROUP':
        return action.payload;
      default:
        return state;
    }
  }
  