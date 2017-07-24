/**
 * Created by pierremarsot on 24/07/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import {registerEntreprise} from '../../actions/auth';
import {isConnected} from '../../tools/auth';

const styleSheet = createStyleSheet('Login', theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
  })
}));

class Register extends React.Component {
  constructor(props) {
    super(props);

    if(isConnected()){
      //Redirect dashboard
    }

    this.state = {
      nomEntreprise: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  componentWillReceiveProps(nextProps){
    if(this.props.token !== nextProps.token && nextProps.token.length > 0){
      //Redirect dashboard
    }
  }

  handleNomEntreprise = (e) => {
    this.setState({ nomEntreprise: e.target.value });
  };

  handleEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePassword = (e) => {
    this.setState({ password: event.target.value })
  };

  handleConfirmPassword = (e) => {
    this.setState({ confirmPassword: e.target.value });
  };

  handleSubmit = (e) => {
    this.props.dispatch(registerEntreprise(this.state.email, this.state.password));
  };

  render() {
    const classes = this.props.classes;
    return (
      <div>
        <Grid container justify="center">
          <Grid item xs={8}>
            <Paper className={classes.root} elevation={4}>
              <Typography type="headline" component="h3">
                Création de votre compte
              </Typography>
              <Grid item xs={12}>
                <TextField
                  id="nomEntreprise"
                  label="Nom de votre entreprise"
                  value={this.state.nomEntreprise}
                  onChange={event => this.handleNomEntreprise(event)}
                  margin="normal"
                  type="text"
                  fullWidth
                />
              </Grid>
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
                <TextField
                  id="confirmPassword"
                  label="Confirmer votre mot de passe"
                  value={this.state.confirmPassword}
                  onChange={event => this.handleConfirmPassword(event)}
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
                  S'inscrire
                </Button>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
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