import { createAction } from 'redux-actions';

const fetchHotDogListRequest = createAction('FETCH_HOT_DOG_LIST');
const fetchHotDogListSuccess = createAction('FETCH_HOT_DOG_LIST_SUCCESS');
const fetchHotDogListFailure = createAction('FETCH_HOT_DOG_LIST_FAILURE');
const changeSortType = createAction('CHANGE_SORT_TYPE');
const changeInputValue = createAction('CHANGE_INPUT_VALUE');


export {
  fetchHotDogListRequest,
  fetchHotDogListSuccess,
  fetchHotDogListFailure,
  changeSortType,
  changeInputValue,
};
