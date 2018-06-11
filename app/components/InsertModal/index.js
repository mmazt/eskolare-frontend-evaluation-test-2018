/**
 *
 * InsertModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
// import styled from 'styled-components';

// eslint-disable-next-line react/prefer-stateless-function
class InsertModal extends React.Component {
  render() {
    return (
      <Modal isOpen={this.props.open} toggle={this.props.toggle} centered>
        <ModalHeader toggle={this.props.toggle}>Inserir novo item</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="nameInput">Nome</Label>
              <Input
                required
                type="text"
                name="name"
                value={this.props.data.name}
                onChange={this.props.changeData}
              />
            </FormGroup>
            <FormGroup>
              <Label for="lastNameInput">Sobrenome</Label>
              <Input
                required
                type="text"
                name="lastName"
                value={this.props.data.lastName}
                onChange={this.props.changeData}
              />
            </FormGroup>
            <FormGroup>
              <Label for="phoneInput">Telefone</Label>
              <Input
                required
                type="text"
                name="phone"
                value={this.props.data.phone}
                onChange={this.props.changeData}
              />
            </FormGroup>
            <FormGroup>
              <Label for="birthDateInput">Data de Nasc.</Label>
              <Input
                required
                type="date"
                value={this.props.data.birthDate}
                name="birthDate"
                onChange={this.props.changeData}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={this.props.clearData}>Limpar</Button>
          <Button
            color="success"
            disabled={this.props.check}
            onClick={this.props.insertData}
          >
            Inserir
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

InsertModal.propTypes = {
  check: PropTypes.any,
  open: PropTypes.any,
  toggle: PropTypes.func,
  data: PropTypes.any,
  changeData: PropTypes.func,
  clearData: PropTypes.func,
  insertData: PropTypes.func,
};

export default InsertModal;
