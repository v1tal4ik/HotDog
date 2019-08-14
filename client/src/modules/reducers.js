import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import {
  fetchHotDogListRequest,
  fetchHotDogListSuccess,
  fetchHotDogListFailure,
  changeSortType,
} from './actions';


const hotDogList = handleActions({
  [fetchHotDogListRequest]: () => [],
  [fetchHotDogListSuccess]: (_state, action) => action.payload,
  [fetchHotDogListFailure]: () => [],
}, []);

const isLoading = handleActions({
  [fetchHotDogListRequest]: () => true,
  [fetchHotDogListSuccess]: () => false,
  [fetchHotDogListFailure]: () => false,
}, false);


const typeSort = handleActions({
  [changeSortType]: (_state, action) => action.payload,
}, 'expensive');


// Selectors
const getHotDogList = state => state.hotDogList;
const getLoading = state => state.isLoading;
const getTypeSort = state => state.typeSort;


export default combineReducers({
  hotDogList,
  isLoading,
  typeSort,
});

export {
  hotDogList,
  isLoading,
  typeSort,
  getHotDogList,
  getLoading,
  getTypeSort,
};
