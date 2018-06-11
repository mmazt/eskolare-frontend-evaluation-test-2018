/**
 *
 * Badge
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from 'reactstrap';
// import styled from 'styled-components';

// eslint-disable-next-line react/prefer-stateless-function
class Badge extends React.Component {
  render() {
    return (
      <Dropdown size="sm" isOpen={this.props.open} toggle={this.props.toggle}>
        <DropdownToggle caret>
          <img src={this.props.img} alt="User badge" />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem header>{this.props.name}</DropdownItem>
          <DropdownItem onClick={this.props.logout}>Logout</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

Badge.propTypes = {
  name: PropTypes.string,
  img: PropTypes.string,
  open: PropTypes.any,
  toggle: PropTypes.func,
  logout: PropTypes.func,
};

export default Badge;
