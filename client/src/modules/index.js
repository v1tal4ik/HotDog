import { combineReducers } from 'redux';
import { fork } from 'redux-saga/effects';
import sagas from './sagas';
import { hotDogList, isLoading, typeSort } from './reducers';

export default combineReducers({
  hotDogList,
  isLoading,
  typeSort,
});

export function* rootSaga() {
  yield fork(sagas);
}
