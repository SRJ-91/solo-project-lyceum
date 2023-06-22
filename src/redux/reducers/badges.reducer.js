export default function badgesReducer(state = [], action) {
    switch (action.type) {
      case 'SET_BADGES':
        return action.payload;
      case 'ADD_BADGE':
        return [...state, action.payload];
      default:
        return state;
    }
  }
  