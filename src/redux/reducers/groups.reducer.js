export default function groupsReducer(state = [], action) {

    switch (action.type) {
        case 'SET_GROUPS':
         return action.payload
        default: return state;
    }
}