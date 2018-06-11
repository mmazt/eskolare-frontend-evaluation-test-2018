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
import { Container, Row, Col } from 'reactstrap';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import './style.css';
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
          <Col sm={{ offset: 3, size: 6 }} className="title">
            <h2>Frontend Test</h2>
          </Col>
        </Row>
        <Row>
          <Col sm={{ offset: 4, size: 4 }} className="title">
            <h3>Login:</h3>
          </Col>
        </Row>
        <Row>
          <Col sm={{ offset: 4, size: 4 }}>
            <GoogleLogin
              className="googleButton"
              clientId="889749549778-nogcfgucujtj8den09e5pc8clrfvlc8t.apps.googleusercontent.com"
              buttonText="Login with Google"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
            >
              <span> Login with Google</span>
            </GoogleLogin>
          </Col>
        </Row>
        <Row>
          <Col sm={{ offset: 4, size: 4 }}>
            <FacebookLogin
              appId="230295837562992"
              autoLoad={false}
              fields="name,email,picture"
              callback={this.responseFacebook}
              cssClass="facebookButton"
            />
          </Col>
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
