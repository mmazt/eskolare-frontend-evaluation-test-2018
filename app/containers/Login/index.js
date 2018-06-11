/**
 *
 * Login
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Container, Row } from 'reactstrap';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

import { loadLogin } from '../App/actions';

// eslint-disable-next-line react/prefer-stateless-function
export class Login extends React.Component {
  responseFacebook = (response) => {
    this.props.onLogin(
      { token: response.accessToken, expiresIn: response.expiresIn },
      { name: response.name, picture: response.picture.data.url },
      'facebook'
    );
    this.props.history.push('/');
  };
  responseGoogle = (response) => {
    this.props.onLogin(
      { token: response.accessToken, expiresIn: response.tokenObj.expires_in },
      {
        name: response.profileObj.name,
        picture: response.profileObj.imageUrl,
      },
      'google'
    );
    this.props.history.push('/');
  };
  render() {
    return (
      <Container>
        <Row>
          <h2>Login:</h2>
        </Row>
        <Row>
          <GoogleLogin
            clientId="889749549778-nogcfgucujtj8den09e5pc8clrfvlc8t.apps.googleusercontent.com"
            buttonText="Login com Google"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
          />
        </Row>
        <Row>
          <FacebookLogin
            appId="230295837562992"
            autoLoad={false}
            fields="name,email,picture"
            callback={this.responseFacebook}
          />
        </Row>
      </Container>
    );
  }
}

Login.propTypes = {
  onLogin: PropTypes.func,
  history: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    onLogin: (loginData, userData, loginType) =>
      dispatch(loadLogin(loginData, userData, loginType)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(Login);
