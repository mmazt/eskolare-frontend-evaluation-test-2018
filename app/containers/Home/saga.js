import { takeLatest, call, put, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import faker from 'faker';
import moment from 'moment';
import { LOAD_DATA, SEARCH_DATA, INSERT_DATA, FILTER, SORT } from './constants';
import {
  makeSelectData,
  makeSelectResults,
  makeSelectTerm,
  makeSelectCache,
  makeSelectFilter,
  makeSelectSort,
} from './selectors';
import {
  loadDataSuccess,
  loadDataError,
  searchDataSuccess,
  searchDataError,
  insertDataSuccess,
  insertDataError,
  clearCache,
  filterSuccess,
  filterError,
  sortSuccess,
  sortError,
} from './actions';
faker.locale = 'pt_BR';

// Individual exports for testing
export default function* loadDataSaga() {
  yield takeLatest(LOAD_DATA, getData);
  yield takeLatest(SEARCH_DATA, searchData);
  yield takeLatest(INSERT_DATA, insertData);
  yield takeLatest(FILTER, filterData);
  yield takeLatest(SORT, sortData);
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

export function* filterData() {
  const filter = yield select(makeSelectFilter());
  const data = yield select(makeSelectData());
  let results = [];
  if (filter.type === 'date') {
    results = data
      .filter((item) => {
        if (item.birthDate.substr(6, 3) === filter.data.substr(0, 3)) {
          return item;
        }
        return '';
      })
      .sort((x, y) => {
        if (
          moment(x.birthDate, 'DD-MM-YYYY') > moment(y.birthDate, 'DD-MM-YYYY')
        ) {
          return 1;
        }
        if (
          moment(x.birthDate, 'DD-MM-YYYY') < moment(y.birthDate, 'DD-MM-YYYY')
        ) {
          return -1;
        }
        return 0;
      });
  } else {
    results = data
      .filter((item) => {
        if (
          alphabetArray(filter.data[0]).indexOf(item.name[0].toUpperCase()) >= 0
        ) {
          return item;
        }
        return '';
      })
      .sort((x, y) => {
        if (x.name > y.name) {
          return 1;
        }
        if (x.name < y.name) {
          return -1;
        }
        return 0;
      });
  }
  try {
    yield put(filterSuccess(fromJS(results)));
  } catch (error) {
    yield put(filterError(error));
  }
}

export function* sortData() {
  const sort = yield select(makeSelectSort());
  const data = yield select(makeSelectResults());
  if (sort.direction === 'ASC') {
    data.sort((x, y) => {
      if (x[sort.column] > y[sort.column]) {
        return 1;
      }
      if (x[sort.column] < y[sort.column]) {
        return -1;
      }
      return 0;
    });
  } else if (sort.direction === 'DESC') {
    data.sort((x, y) => {
      if (x[sort.column] > y[sort.column]) {
        return -1;
      }
      if (x[sort.column] < y[sort.column]) {
        return 1;
      }
      return 0;
    });
  }
  try {
    yield put(sortSuccess(fromJS(data)));
  } catch (error) {
    yield put(sortError(error));
  }
}

function alphabetArray(letter) {
  switch (letter.toUpperCase()) {
    case 'A':
      return ['A', 'B', 'C', 'D', 'E'];
    case 'F':
      return ['F', 'G', 'H', 'I', 'J'];
    case 'K':
      return ['K', 'L', 'M', 'N', 'O'];
    case 'P':
      return ['P', 'Q', 'R', 'S', 'T'];
    case 'U':
      return ['U', 'V', 'W', 'X', 'Y'];
    case 'Z':
      return ['Z'];
    default:
      return ['A', 'B', 'C', 'D', 'E'];
  }
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
