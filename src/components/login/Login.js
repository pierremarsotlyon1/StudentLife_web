/**
 * Created by pierremarsot on 24/07/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router'
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import Link from 'react-router/lib/Link';
import {loginEntreprise} from '../../actions/auth';
import {isConnected} from '../../tools/auth';

const styleSheet = createStyleSheet('Login', theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
  })
}));

class Login extends React.Component {
  constructor(props) {
    super(props);

    if(isConnected()){
      browserHistory.push('/');
    }

    this.state = {
      email: '',
      password: '',
    };
  }

  componentWillReceiveProps(nextProps){
    if(this.props.token !== nextProps.token && nextProps.token.length > 0){
      browserHistory.push('/');
    }
  }

  handleEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePassword = (e) => {
    this.setState({ password: e.target.value })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.dispatch(loginEntreprise(this.state.email, this.state.password));
  };

  render() {
    const classes = this.props.classes;
    return (
      <section className="mh-fullscreen bg-img center-vh p-20">
        <div className="card card-shadowed p-50 w-400 mb-0">
          <h5 className="text-uppercase text-center">Connexion</h5>
          <br/><br/>
          <form className="form-type-material">

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                value={this.state.email}
                onChange={event => this.handleEmail(event)}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Mot de passe"
                value={this.state.password}
                onChange={event => this.handlePassword(event)}
              />
            </div>

            <br/>
            <button
              className="btn btn-bold btn-block btn-primary"
              onClick={event => this.handleSubmit(event)}
            >
              Connexion
            </button>
          </form>

          <hr className="w-30"/>

          <p className="text-center text-muted fs-13 mt-20">
            Vous n'avez pas de compte?
            <Link to="/register">
              Inscrivez-vous
            </Link>
          </p>
        </div>
      </section>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    token: state.auth.token,
  };
}

export default connect(mapStateToProps)(withStyles(styleSheet)(Login));