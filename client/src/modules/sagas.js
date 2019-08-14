// eslint-disable-next-line object-curly-newline
import { takeEvery, put, call, fork } from 'redux-saga/effects';
import { getHotDogList } from '../api';
import {
  fetchHotDogListRequest,
  fetchHotDogListSuccess,
  fetchHotDogListFailure,
} from './actions';

function* fetchReducersWatcher() {
  yield takeEvery(fetchHotDogListRequest, fetchHotDogListFlow);
}


export function* fetchHotDogListFlow({ payload }) {
  try {
    const result = yield call(getHotDogList, payload);
    yield put(fetchHotDogListSuccess(result));
  } catch (error) {
    yield put(fetchHotDogListFailure(error));
  }
}


export default function* () {
  yield fork(fetchReducersWatcher);
}
