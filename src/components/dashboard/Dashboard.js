/**
 * Created by pierremarsot on 24/07/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router'
import {withStyles, createStyleSheet} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import {loadProfilEntreprise, updateProfilEntreprise} from '../../actions/entreprise';

class Dashboard extends React.Component {
  constructor(props){
    super(props);

    if(!this.props.token || this.props.token === 0){
      browserHistory.push('/');
    }

    this.state = {
      nomEntreprise: '',
    };
  }

  componentDidMount(){
    this.props.dispatch(loadProfilEntreprise());
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.entreprise){
      this.setState({
        ...this.state,
        nomEntreprise: nextProps.entreprise._source.nom_entreprise,
      });
    }
  }

  handleNomEntreprise = (e) => {
    this.setState({
      nomEntreprise: e.target.value,
    });
  };

  handleSubmit = () => {
    this.props.dispatch(updateProfilEntreprise(this.state.nomEntreprise));
  };

  render(){
    const classes = this.props.classes;
    return (
      <div>
        <Grid container justify="center">
          <Grid item xs={8}>
            <Paper className={classes.root} elevation={4}>
              <Typography type="headline" component="h3">
                Mes informations
              </Typography>
              <Grid item xs={12}>
                <TextField
                  id="nomEntreprise"
                  label="Nom de mon entreprise"
                  value={this.state.nomEntreprise}
                  onChange={event => this.handleNomEntreprise(event)}
                  margin="normal"
                  type="text"
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
                  Modifier mes informations
                </Button>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

const styleSheet = createStyleSheet('Dashboard', theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
  })
}));

function mapStateToProps(state){
  return {
    token: state.auth.token,
    entreprise: state.entreprise.entreprise,
  };
}

export default connect(mapStateToProps)(withStyles(styleSheet)(Dashboard));