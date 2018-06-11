/**
 *
 * LetterDropdown
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';
// import styled from 'styled-components';

// eslint-disable-next-line react/prefer-stateless-function
class LetterDropdown extends React.Component {
  render() {
    return (
      <Dropdown size="sm" isOpen={this.props.open} toggle={this.props.toggle}>
        <DropdownToggle color="info" caret>
          Inicial do Nome
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem onClick={this.props.change}>A - E</DropdownItem>
          <DropdownItem onClick={this.props.change}>F - J</DropdownItem>
          <DropdownItem onClick={this.props.change}>K - O</DropdownItem>
          <DropdownItem onClick={this.props.change}>P - T</DropdownItem>
          <DropdownItem onClick={this.props.change}>U - Y</DropdownItem>
          <DropdownItem onClick={this.props.change}>Z</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

LetterDropdown.propTypes = {
  open: PropTypes.any,
  toggle: PropTypes.func,
  change: PropTypes.func,
};

export default LetterDropdown;
