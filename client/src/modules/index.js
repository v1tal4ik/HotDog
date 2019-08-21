import { combineReducers } from 'redux';
import { fork } from 'redux-saga/effects';
import sagas from './sagas';
import {
  hotDogList, isLoading, typeSort, inputValue,
} from './reducers';

export default combineReducers({
  hotDogList,
  isLoading,
  typeSort,
  inputValue,
});

export function* rootSaga() {
  yield fork(sagas);
}
