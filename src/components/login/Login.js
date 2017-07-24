/**
 * Created by pierremarsot on 24/07/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router'
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
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
    this.props.dispatch(loginEntreprise(this.state.email, this.state.password));
  };

  render() {
    const classes = this.props.classes;
    return (
      <div>
        <Grid container justify="center">
          <Grid item xs={8}>
            <Paper className={classes.root} elevation={4}>
              <Typography type="headline" component="h3">
                Connectez-vous à votre compte
              </Typography>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  label="Email"
                  value={this.state.email}
                  onChange={event => this.handleEmail(event)}
                  margin="normal"
                  type="email"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="password"
                  label="Mot de passe"
                  value={this.state.password}
                  onChange={event => this.handlePassword(event)}
                  margin="normal"
                  type="password"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  raised
                  color="primary"
                  className={classes.button}
                  onClick={event => this.handleSubmit()}
                >
                  Se connecter
                </Button>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
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