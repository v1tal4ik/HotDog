import { createAction } from 'redux-actions';


export const fetchHotDogListRequest = createAction('FETCH_HOT_DOG_LIST');
export const fetchHotDogListSuccess = createAction('FETCH_HOT_DOG_LIST_SUCCESS');
export const fetchHotDogListFailure = createAction('FETCH_HOT_DOG_LIST_FAILURE');
export const changeSortType = createAction('CHANGE_SORT_TYPE');
