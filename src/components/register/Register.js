/**
 * Created by pierremarsot on 24/07/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {browserHistory} from 'react-router'
import Link from 'react-router/lib/Link';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import {registerEntreprise} from '../../actions/auth';
import {isConnected} from '../../tools/auth';
import './register.css';

const styleSheet = createStyleSheet('Login', theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
  })
}));

class Register extends React.Component {
  constructor(props) {
    super(props);

    if (isConnected()) {
      browserHistory.push('/dashboard');
    }

    this.state = {
      nomEntreprise: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.token !== nextProps.token && nextProps.token.length > 0) {
      browserHistory.push('/dashboard');
    }
  }

  handleNomEntreprise = (e) => {
    this.setState({nomEntreprise: e.target.value});
  };

  handleEmail = (e) => {
    this.setState({email: e.target.value});
  };

  handlePassword = (e) => {
    this.setState({password: e.target.value})
  };

  handleConfirmPassword = (e) => {
    this.setState({confirmPassword: e.target.value});
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.dispatch(registerEntreprise(this.state.nomEntreprise, this.state.email, this.state.password, this.state.confirmPassword));
  };

  render() {
    return (
      <section className="mh-fullscreen bg-img center-vh p-20">
        <div className="card card-shadowed p-50 w-400 mb-0">
          <h5 className="text-uppercase text-center">Inscription</h5>
          <br/><br/>

          <form className="form-type-material">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nom de votre entreprise"
                value={this.state.nomEntreprise}
                onChange={event => this.handleNomEntreprise(event)}
              />
            </div>

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

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Confirmation du mot de passe"
                value={this.state.confirmPassword}
                onChange={event => this.handleConfirmPassword(event)}
              />
            </div>

            <br/>
            <button
              className="btn btn-bold btn-block btn-primary"
              onClick={event => this.handleSubmit(event)}
            >
              Inscription
            </button>
          </form>

          <hr className="w-30"/>

          <p className="text-center text-muted fs-13 mt-20">
            Vous avez déjà un compte?
            <Link to="/login">
              Connexion
            </Link>
          </p>
        </div>
      </section>
    )
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    token: state.auth.token,
  };
}

export default connect(mapStateToProps)(withStyles(styleSheet)(Register));