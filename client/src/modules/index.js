import { combineReducers } from 'redux';
import { fork } from 'redux-saga/effects';
import sagas from './sagas';
import { hotDogList , isLoading } from './reducers';

export default combineReducers({
  hotDogList,
  isLoading,
});

export function* rootSaga() {
  yield fork(sagas);
}
