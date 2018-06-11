/**
 *
 * DecadeDropdown
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
class DecadeDropdown extends React.Component {
  render() {
    return (
      <Dropdown size="sm" isOpen={this.props.open} toggle={this.props.toggle}>
        <DropdownToggle outline color="secondary" caret>
          Década Nasc.
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem onClick={this.props.change}>1910</DropdownItem>
          <DropdownItem onClick={this.props.change}>1920</DropdownItem>
          <DropdownItem onClick={this.props.change}>1930</DropdownItem>
          <DropdownItem onClick={this.props.change}>1940</DropdownItem>
          <DropdownItem onClick={this.props.change}>1950</DropdownItem>
          <DropdownItem onClick={this.props.change}>1960</DropdownItem>
          <DropdownItem onClick={this.props.change}>1970</DropdownItem>
          <DropdownItem onClick={this.props.change}>1980</DropdownItem>
          <DropdownItem onClick={this.props.change}>1990</DropdownItem>
          <DropdownItem onClick={this.props.change}>2000</DropdownItem>
          <DropdownItem onClick={this.props.change}>2010</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

DecadeDropdown.propTypes = {
  open: PropTypes.any,
  toggle: PropTypes.func,
  change: PropTypes.func,
};

export default DecadeDropdown;
