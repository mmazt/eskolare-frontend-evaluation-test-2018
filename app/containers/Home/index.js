import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ReactDataGrid from 'react-data-grid';
import {
  Button,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
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
} from './actions';

// eslint-disable-next-line react/prefer-stateless-function
export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      newItem: {
        name: '',
        lastName: '',
        phone: '',
        birthDate: '',
      },
    };
  }

  componentDidMount() {
    this.props.onCreateData();
  }

  toggle = () => {
    this.setState({
      newItem: { name: '', lastName: '', phone: '', birthDate: '' },
      modal: !this.state.modal,
    });
    this.props.onClearData();
  };

  changeData = (evt) => {
    const { newItem } = this.state;
    newItem[evt.target.name] = evt.target.value;
    this.setState({ newItem });
    this.props.onCacheData(newItem);
  };

  clerData = () => {
    this.setState({
      newItem: { name: '', lastName: '', phone: '', birthDate: '' },
    });
    this.props.onClearData();
  };

  insertData = () => {
    this.props.onInsertData();
    this.toggle();
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
      <div>
        <FormattedMessage {...messages.header} />
        <InputGroup>
          <Input
            onChange={this.props.onChangeSearchTerm}
            onKeyPress={this.props.onEnterSearch}
          />
          <InputGroupAddon addonType="prepend">
            <Button onClick={this.props.onSubmitSearch}>Procurar</Button>
          </InputGroupAddon>
        </InputGroup>
        <Button onClick={this.toggle}>Adicionar Novo</Button>
        {this.props.data && this.props.columns ? (
          <ReactDataGrid
            columns={this.props.columns}
            rowsCount={this.props.data.length}
            rowGetter={this.rowGetter}
            minHeight={tableHeight}
          />
        ) : (
          ''
        )}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Inserir novo item</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="nameInput">Nome</Label>
                <Input
                  required
                  type="text"
                  name="name"
                  value={this.state.newItem.name}
                  onChange={this.changeData}
                />
              </FormGroup>
              <FormGroup>
                <Label for="lastNameInput">Sobrenome</Label>
                <Input
                  required
                  type="text"
                  name="lastName"
                  value={this.state.newItem.lastName}
                  onChange={this.changeData}
                />
              </FormGroup>
              <FormGroup>
                <Label for="phoneInput">Telefone</Label>
                <Input
                  required
                  type="text"
                  name="phone"
                  value={this.state.newItem.phone}
                  onChange={this.changeData}
                />
              </FormGroup>
              <FormGroup>
                <Label for="birthDateInput">Data de Nasc.</Label>
                <Input
                  required
                  type="date"
                  value={this.state.newItem.birthDate}
                  name="birthDate"
                  onChange={this.changeData}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.clerData}>Cancelar</Button>
            <Button disabled={checkForm} onClick={this.insertData}>
              Inserir
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

Home.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  onCreateData: PropTypes.func.isRequired,
  onChangeSearchTerm: PropTypes.func,
  onSubmitSearch: PropTypes.func,
  onEnterSearch: PropTypes.func,
  onCacheData: PropTypes.func,
  onClearData: PropTypes.func,
  onInsertData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  home: makeSelectHome(),
  data: makeSelectResults(),
  columns: makeSelectColumns(),
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
