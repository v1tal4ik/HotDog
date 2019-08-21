import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import {
  fetchHotDogListRequest,
  fetchHotDogListSuccess,
  fetchHotDogListFailure,
  changeSortType,
  changeInputValue,
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

const inputValue = handleActions({
  [changeInputValue]: (_state, action) => action.payload,
}, '');


// Selectors
const getHotDogList = state => state.hotDogList;
const getLoading = state => state.isLoading;
const getTypeSort = state => state.typeSort;
const getInputValue = state => state.inputValue;


export default combineReducers({
  hotDogList,
  isLoading,
  typeSort,
  inputValue,
});

export {
  hotDogList,
  isLoading,
  typeSort,
  inputValue,
  getHotDogList,
  getLoading,
  getTypeSort,
  getInputValue,
};
