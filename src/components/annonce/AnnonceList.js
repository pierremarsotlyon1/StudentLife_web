/**
 * Created by pierremarsot on 24/07/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router'
import Annonce from './Annonce';
import Link from 'react-router/lib/Link';
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Paper from 'material-ui/Paper';
import {loadAnnonce} from '../../actions/annonce';

class AnnonceList extends React.Component {
  constructor(props) {
    super(props);

    if(!this.props.token || this.props.token === 0){
      browserHistory.push('/');
    }

    this.state = {
      offset: 0,
    };
  }

  componentDidMount() {
    this.props.dispatch(loadAnnonce(this.state.offset));
  }

  render() {
    const classes = this.props.classes;

    let annoncesLocales = [];
    let i = 0;
    for (const annonce of this.props.annonces) {
      annoncesLocales.push(
        <Annonce key={"annonce_" + i} annonce={annonce}/>
      );
      i++;
    }

    if(annoncesLocales.length === 0){
      annoncesLocales.push(
        <Paper className={classes.marginPaper} key="empty_annonces" elevation={4}>
          <Typography type="headline" component="h3">
            Vous n'avez pas encore ajouté d'annonce
          </Typography>
        </Paper>
      );
    }

    return (
      <Grid container justify="center">
        <Grid container justify="center">
          <Grid item xs={5}>
            <Typography type="headline" component="h2" className={classes.marginTitle}>
              Mes annonces
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Button fab color="primary" className={classes.button}>
              <Link to="/annonces/add" className="link">
                <AddIcon />
              </Link>
            </Button>
          </Grid>
        </Grid>

        <Grid container justify="center">
          <Grid item xs={6}>
            {annoncesLocales}
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

const styleSheet = createStyleSheet('FloatingActionButtons', theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  marginTitle: {
    marginTop: 20,
  },
  marginPaper: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
  }),
}));

AnnonceList.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    annonces: state.annonce.annonces,
    token: state.auth.token,
  };
}

export default connect(mapStateToProps)(withStyles(styleSheet)(AnnonceList));