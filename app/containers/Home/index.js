import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ReactDataGrid from 'react-data-grid';
import {
  Button,
  Container,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  Row,
} from 'reactstrap';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectHome, {
  makeSelectColumns,
  makeSelectResults,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  loadDataAction,
  searchTermAction,
  searchDataAction,
  cacheData,
  insertData,
  clearCache,
  filter,
  sort,
} from './actions';
import { makeSelectStatus, makeSelectUser } from '../App/selectors';
import { logout } from '../App/actions';
import Badge from '../../components/Badge';
import DecadeDropdown from '../../components/DecadeDropdown';
import LetterDropdown from '../../components/LetterDropdown';
import InsertModal from '../../components/InsertModal';

// eslint-disable-next-line react/prefer-stateless-function
export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      badgeOpen: false,
      modal: false,
      dropdownDecadeOpen: false,
      dropdownInitialOpen: false,
      dropdownInitialActive: '',
      newItem: {
        name: '',
        lastName: '',
        phone: '',
        birthDate: '',
      },
    };
  }

  componentWillMount() {
    if (this.props.status && this.props.status === 'disconnected') {
      this.props.history.push('/login');
    }
  }

  componentDidMount() {
    this.props.onCreateData();
  }

  toggleBadge = () => {
    this.setState({ badgeOpen: !this.state.badgeOpen });
  };

  toggle = () => {
    this.setState({
      newItem: { name: '', lastName: '', phone: '', birthDate: '' },
      modal: !this.state.modal,
    });
    this.props.onClearData();
  };

  toggleDecadeDropdown = () => {
    this.setState({ dropdownDecadeOpen: !this.state.dropdownDecadeOpen });
  };

  toggleInitialDropdown = () => {
    this.setState({ dropdownInitialOpen: !this.state.dropdownInitialOpen });
  };
  changeData = (evt) => {
    const { newItem } = this.state;
    newItem[evt.target.name] = evt.target.value;
    this.setState({ newItem });
    this.props.onCacheData(newItem);
  };

  clearData = () => {
    this.setState({
      newItem: { name: '', lastName: '', phone: '', birthDate: '' },
    });
    this.props.onClearData();
  };

  logout = () => {
    this.props.onLogout();
    this.props.history.push('/login');
  };

  insertData = () => {
    this.props.onInsertData();
    this.toggle();
  };

  letterChange = (evt) => {
    this.props.onFilter(evt.target.innerText, 'letter');
  };

  decadeChange = (evt) => {
    this.props.onFilter(evt.target.innerText, 'date');
  };

  checkForm = () => {
    if (
      this.state.newItem.name.length > 0 &&
      this.state.newItem.lastName.length > 0 &&
      this.state.newItem.phone.length > 0 &&
      this.state.newItem.birthDate.length > 0
    ) {
      return false;
    }
    return true;
  };

  rowGetter = (i) => this.props.data[i];

  render() {
    const tableHeight = window.innerHeight - 50;
    const checkForm = this.checkForm();
    return (
      <Container>
        <Row>
          <Col sm={{ size: 'auto', offset: 10 }}>
            <Badge
              open={this.state.badgeOpen}
              name={this.props.userData.name}
              img={this.props.userData.picture}
              toggle={this.toggleBadge}
              logout={this.logout}
            />
          </Col>
        </Row>
        <Row>
          <InputGroup size="sm">
            <Input
              onChange={this.props.onChangeSearchTerm}
              onKeyPress={this.props.onEnterSearch}
            />
            <InputGroupAddon addonType="prepend">
              <Button color="primary" onClick={this.props.onSubmitSearch}>
                {' '}
                <FormattedMessage {...messages.searchButton} />
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </Row>
        <Row>
          <Col>
            <p className="text-info">Filtrar por:</p>
          </Col>
          <Col>
            <DecadeDropdown
              open={this.state.dropdownDecadeOpen}
              change={this.decadeChange}
              toggle={this.toggleDecadeDropdown}
            />
          </Col>
          <Col>
            <LetterDropdown
              open={this.state.dropdownInitialOpen}
              change={this.letterChange}
              toggle={this.toggleInitialDropdown}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button size="sm" color="primary" onClick={this.toggle}>
              Adicionar Novo
            </Button>
          </Col>
        </Row>
        <Row>
          {this.props.data && this.props.columns ? (
            <ReactDataGrid
              columns={this.props.columns}
              rowsCount={this.props.data.length}
              rowGetter={this.rowGetter}
              minHeight={tableHeight}
              onGridSort={this.props.onSort}
            />
          ) : (
            ''
          )}
        </Row>
        <InsertModal
          open={this.state.modal}
          toggle={this.toggle}
          data={this.state.newItem}
          changeData={this.changeData}
          clearData={this.clearData}
          insertData={this.insertData}
          check={checkForm}
        />
      </Container>
    );
  }
}

Home.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  status: PropTypes.string,
  userData: PropTypes.any,
  onCreateData: PropTypes.func.isRequired,
  onChangeSearchTerm: PropTypes.func,
  onSubmitSearch: PropTypes.func,
  onEnterSearch: PropTypes.func,
  onCacheData: PropTypes.func,
  onClearData: PropTypes.func,
  onInsertData: PropTypes.func,
  onFilter: PropTypes.func,
  onSort: PropTypes.func,
  onLogout: PropTypes.func,
  history: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  home: makeSelectHome(),
  data: makeSelectResults(),
  columns: makeSelectColumns(),
  status: makeSelectStatus(),
  userData: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    onCreateData: () => dispatch(loadDataAction()),
    onChangeSearchTerm: (evt) => dispatch(searchTermAction(evt.target.value)),
    onSubmitSearch: () => dispatch(searchDataAction()),
    onEnterSearch: (evt) =>
      evt.key === 'Enter' ? dispatch(searchDataAction()) : '',
    onCacheData: (data) => dispatch(cacheData(data)),
    onClearData: () => dispatch(clearCache()),
    onInsertData: () => dispatch(insertData()),
    onFilter: (data, type) => dispatch(filter(data, type)),
    onSort: (column, direction) => dispatch(sort(column, direction)),
    onLogout: () => dispatch(logout()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(Home);
