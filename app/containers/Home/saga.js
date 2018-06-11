import { takeLatest, call, put, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import faker from 'faker';
import moment from 'moment';
import { LOAD_DATA, SEARCH_DATA, INSERT_DATA } from './constants';
import {
  makeSelectData,
  makeSelectResults,
  makeSelectTerm,
  makeSelectCache,
} from './selectors';
import {
  loadDataSuccess,
  loadDataError,
  searchDataSuccess,
  searchDataError,
  insertDataSuccess,
  insertDataError,
  clearCache,
} from './actions';
faker.locale = 'pt_BR';

// Individual exports for testing
export default function* loadDataSaga() {
  yield takeLatest(LOAD_DATA, getData);
  yield takeLatest(SEARCH_DATA, searchData);
  yield takeLatest(INSERT_DATA, insertData);
}

export function* insertData() {
  const selectData = yield select(makeSelectData());
  const newItem = yield select(makeSelectCache());
  newItem.id = selectData.length + 1;

  newItem.birthDate = formatDate(newItem.birthDate);

  selectData.push(newItem);
  clearCache();
  try {
    yield put(insertDataSuccess(fromJS(selectData)));
  } catch (error) {
    yield put(insertDataError(error));
  }
}

function formatDate(date) {
  return `${date.substr(8, 2)}/${date.substr(5, 2)}/${date.substr(0, 4)}`;
}

export function* getData() {
  const selectData = yield select(makeSelectData());
  const data = yield call(createData);
  try {
    yield put(loadDataSuccess(data, selectData));
  } catch (error) {
    yield put(loadDataError(error));
  }
}

export function createData() {
  return Promise.resolve(
    fromJS(
      [...Array(1000)].map((item, i) => ({
        id: i + 1,
        name: faker.name.firstName(),
        lastName: faker.name.lastName(),
        phone: faker.phone.phoneNumber(),
        birthDate: moment
          .parseZone(faker.date.between('1910', '2010'))
          .format('DD/MM/YYYY'),
      }))
    )
  );
}

export function* searchData() {
  const term = yield select(makeSelectTerm());
  const data = yield select(makeSelectData());
  const results = search(term.toUpperCase(), data);
  const selectResults = yield select(makeSelectResults());
  try {
    yield put(searchDataSuccess(results, selectResults));
  } catch (error) {
    yield put(searchDataError(error));
  }
}

export function search(term, data) {
  const results = data.filter((item) => {
    if (
      stripAccents(item.name)
        .toUpperCase()
        .includes(term) ||
      stripAccents(item.lastName)
        .toUpperCase()
        .includes(term) ||
      item.phone.toUpperCase().includes(term) ||
      item.birthDate.toUpperCase().includes(term) ||
      item.id === parseInt(term, 10)
    ) {
      return item;
    }
    return '';
  });
  return fromJS(results);
}

function stripAccents(term) {
  const inputChars = 'àáâãäçèéêëìíîïñòóôõöùúûüýÿÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝ'.split(
    ''
  );
  const outputChars = 'aaaaaceeeeiiiinooooouuuuyyAAAAACEEEEIIIINOOOOOUUUUY'.split(
    ''
  );
  const newTerm = term.split('').map((item) => {
    if (inputChars.indexOf(item) >= 0) {
      return outputChars[inputChars.indexOf(item)];
    }
    return item;
  });
  return newTerm.join('');
}
