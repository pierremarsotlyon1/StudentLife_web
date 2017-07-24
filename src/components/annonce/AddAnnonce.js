/**
 * Created by pierremarsot on 24/07/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import Annonce from './Annonce';
import Link from 'react-router/lib/Link';
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import {addAnnonce} from '../../actions/annonce';

class AddAnnonce extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      titre: '',
      description: '',
      dateDebut: '',
      dateFin: '',
      reduction: 0,
    };
  }

  handleTitre = (e) => {
    this.setState({
      titre: e.target.value,
    });
  };

  handleDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  handleDateDebut = (e) => {
    this.setState({
      dateDebut: e.target.value,
    });
  };

  handleDateFin = (e) => {
    this.setState({
      dateFin: e.target.value,
    });
  };

  handleReduction = (e) => {
    let reduction = e.target.value;
    reduction = Number.parseInt(reduction);

    if(reduction < 0){
      reduction = 0;
    }

    this.setState({
      reduction: reduction,
    });
  };

  handleSubmit = () => {
    this.props.dispatch(addAnnonce(
      this.state.titre,
      this.state.description,
      this.state.dateDebut,
      this.state.dateFin,
      this.state.reduction,
    ));
  };

  render() {
    const classes = this.props.classes;

    return (
      <Grid container justify="center">
        <Grid container justify="center">
          <Grid item xs={12} justify="center" className={classes.center}>
            <Typography type="headline" component="h2">
              Ajouter une annonce
            </Typography>
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Grid item xs={6}>
            <Paper className={classes.marginPaper} elevation={4}>
              <Grid container justify="center">
                <Grid item xs={12}>
                  <TextField
                    id="titreBonPlan"
                    label="Titre du bon plan"
                    value={this.state.titre}
                    onChange={event => this.handleTitre(event)}
                    margin="normal"
                    type="text"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="descriptionBonPlan"
                    label="Description du bon plan"
                    value={this.state.description}
                    rowsMax="5"
                    onChange={event => this.handleDescription(event)}
                    margin="normal"
                    type="text"
                    fullWidth
                    multiline
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="dateDebutBonPlan"
                    label="Date de début"
                    type="date"
                    margin="normal"
                    onChange={event => this.handleDateDebut(event)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="dateFinBonPlan"
                    label="Date de début"
                    type="date"
                    onChange={event => this.handleDateFin(event)}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="reductionBonPlan"
                    label="Réduction (en %)"
                    value={this.state.reduction}
                    onChange={event => this.handleReduction(event)}
                    margin="normal"
                    type="number"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} className={classes.center}>
                  <Button
                    raised
                    color="primary"
                    onClick={event => this.handleSubmit()}
                  >
                    Ajouter l'annonce
                  </Button>
                </Grid>
              </Grid>
            </Paper>
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
  center: {
    margin: 16,
    marginBottom: 30,
    textAlign: 'center',
  },
}));

AddAnnonce.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(withStyles(styleSheet)(AddAnnonce));