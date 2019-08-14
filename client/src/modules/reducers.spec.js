import { createAction } from 'redux-actions';
import reducer from './reducers';

describe('reducer', () => {
  const state = {
    isLoading: false,
    typeSort: 'newest',
    viewValue: 1,
    cookList: [],
  };
  it('fetchCookListRequest', () => {
    const fetchCookListRequest = createAction('FETCH_COOK_LIST');
    expect(reducer(state, fetchCookListRequest)).toEqual({ isLoading: true, ...state });
  });

  it('fetchCookListSuccess', () => {
    const fetchCookListSuccess = createAction('FETCH_COOK_LIST_SUCCESS');
    const action = {
      type: fetchCookListSuccess,
      payload: ['1', '2', { test: 'test' }],
    };
    expect(reducer(state, action)).toEqual({ ...state, cookList: ['1', '2', { test: 'test' }] });
  });

  it('fetchCookListFailure', () => {
    const fetchCookListFailure = createAction('FETCH_COOK_LIST_FAILURE');
    const action = {
      type: fetchCookListFailure,
      payload: { err: 404, msg: 'not found' },
    };
    expect(reducer(state, action)).toEqual({ ...state, cookList: { err: 404, msg: 'not found' } });
  });

  it('fetchCookListRequest', () => {
    const fetchCookListRequest = createAction('FETCH_COOK_LIST');
    expect(reducer(state, fetchCookListRequest)).toEqual({ isLoading: true, ...state });
  });

  it('fetchCookListSuccess', () => {
    const fetchCookListSuccess = createAction('FETCH_COOK_LIST_SUCCESS');
    const action = {
      type: fetchCookListSuccess,
      payload: ['1', '2', { test: 'test' }],
    };
    expect(reducer(state, action)).toEqual({ ...state, cookList: ['1', '2', { test: 'test' }] });
  });

  it('fetchCookListFailure', () => {
    const fetchCookListFailure = createAction('FETCH_COOK_LIST_FAILURE');
    const action = {
      type: fetchCookListFailure,
      payload: { err: 404, msg: 'not found' },
    };
    expect(reducer(state, action)).toEqual({ ...state, cookList: { err: 404, msg: 'not found' } });
  });

  it('fetchCookListByInputValueRequest', () => {
    const fetchCookListByInputValueRequest = createAction('FETCH_COOK_LIST_BY_INPUT_VALUE');
    expect(reducer(state, fetchCookListByInputValueRequest)).toEqual({ isLoading: true, ...state });
  });

  it('fetchCookListByInputValueSuccess', () => {
    const fetchCookListByInputValueSuccess = createAction('FETCH_COOK_LIST_BY_INPUT_VALUE_SUCCESS');
    const action = {
      type: fetchCookListByInputValueSuccess,
      payload: [{ test: 'test' }],
    };
    expect(reducer(state, action)).toEqual({ ...state, cookList: [{ test: 'test' }] });
  });

  it('fetchCookListByInputValueFailure', () => {
    const fetchCookListByInputValueFailure = createAction('FETCH_COOK_LIST_BY_INPUT_VALUE_FAILURE');
    const action = {
      type: fetchCookListByInputValueFailure,
      payload: { err: 404, msg: 'not found' },
    };
    expect(reducer(state, action)).toEqual({ ...state, cookList: { err: 404, msg: 'not found' } });
  });

  it('changeSortType', () => {
    const changeSortType = createAction('CHANGE_SORT_TYPE');
    const action = {
      type: changeSortType,
      payload: 'oldest',
    };
    expect(reducer(state, action)).toEqual({ ...state, typeSort: 'oldest' });
  });

  it('changeViewValue', () => {
    const changeViewValue = createAction('CHANGE_VIEW_VALUE');
    const action = {
      type: changeViewValue,
      payload: 2,
    };
    expect(reducer(state, action)).toEqual({ ...state, viewValue: 2 });
  });
});
