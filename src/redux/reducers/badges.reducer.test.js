import badgesReducer from './badges.reducer';

describe('badgesReducer', () => {
  test('should return the initial state', () => {
    const initialState = [];
    const action = { type: 'FETCH BADGES' };

    const newState = badgesReducer(initialState, action);

    expect(newState).toEqual(initialState);
  });

  test('should set badges', () => {
    const initialState = [];
    const action = { type: 'SET_BADGES', payload: [{ id: 1, name: 'Platos Republic' }] };
    const expectedState = [{ id: 1, name: 'Platos Republic' }];

    const newState = badgesReducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });

//   test('should add a badge', () => {
//     const initialState = [{ id: 1, name: 'Badge 1' }];
//     const action = { type: 'ADD_BADGE', payload: { id: 2, name: 'Badge 2' } };
//     const expectedState = [
//       { id: 1, name: 'Badge 1' },
//       { id: 2, name: 'Badge 2' },
//     ];

//     const newState = badgesReducer(initialState, action);

//     expect(newState).toEqual(expectedState);
//   });
});
