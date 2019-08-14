import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import {
  fetchHotDogListRequest,
  fetchHotDogListSuccess,
  fetchHotDogListFailure,
} from './actions';


export const hotDogList = handleActions({
  [fetchHotDogListRequest]: () => [],
  [fetchHotDogListSuccess]: (_state, action) => action.payload,
  [fetchHotDogListFailure]: () => [],
}, []);

export const isLoading = handleActions({
  [fetchHotDogListRequest]: () => true,
  [fetchHotDogListSuccess]: () => false,
  [fetchHotDogListFailure]: () => false,
}, false);


export default combineReducers({
  hotDogList,
  isLoading,
});


export const getHotDogList = state => state.hotDogList;
export const getLoading = state => state.isLoading;
