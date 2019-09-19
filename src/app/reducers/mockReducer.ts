import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { MockActions } from 'app/actions/mockActions';
import { MockModel } from 'app/models';

const initialState: RootState.MockState = [
  {
    id: 1,
    text: 'Mock',
  },
];

export const mockReducer = handleActions<RootState.MockState, MockModel>(
  {
    [MockActions.Type.ADD_MOCK]: (state, action) => {
      if (action.payload && action.payload.text) {
        return [
          {
            id: state.reduce((max, mock) => Math.max(mock.id || 1, max), 0) + 1,
            text: action.payload.text,
          },
          ...state,
        ];
      }
      return state;
    },
  },
  initialState,
);
