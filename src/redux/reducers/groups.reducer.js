 import { combineReducers } from "redux";
 
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
  
//   function groupsDoneReducer(state = [], action) {
//         switch (action.type) {
//         case 'SET_DONE':
//         return action.payload;
//       default:
//         return state;
//     }
//   }

//  function groupsCurrentReducer(state = [], action) {
//     switch (action.type) {
//     case 'SET_SELECTED GROUP':
//     return action.payload;
//   default:
//     return state;
// }
// }

// const groups = combineReducers({ active: groupsReducer, done: groupsDoneReducer, selected: groupsCurrentReducer});

// export default groups;