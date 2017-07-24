/**
 * Created by pierremarsot on 24/07/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import Card, {CardActions, CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import UpdateIcon from 'material-ui-icons/Update';

import {removeAnnonce} from '../../actions/annonce';

class Annonce extends React.Component {
  constructor(props) {
    super(props);
  }

  handleRemove = (id) => {
    this.props.dispatch(removeAnnonce(id));
  };

  render() {
    const classes = this.props.classes;
    const annonce = this.props.annonce;

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography type="body1" className={classes.title}>
            Du {annonce._source.date_debut} au {annonce._source.date_fin}
          </Typography>
          <Typography component="h2">
            {annonce._source.title}
          </Typography>
          <Typography type="body1" className={classes.pos}>
            {annonce._source.description}
          </Typography>
          <Typography component="p">
            Réduction : {annonce._source.reduction} %
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton onClick={() => this.handleRemove(annonce._id)} color="accent" aria-label="Delete">
            <DeleteIcon />
          </IconButton>
          <IconButton color="primary" aria-label="Update">
            <UpdateIcon />
          </IconButton>
        </CardActions>
      </Card>
    )
  }
}

const styleSheet = createStyleSheet('SimpleCard', theme => ({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
}));

function mapStateToProps(state) {
  return {};
}

Annonce.propTypes = {
  classes: PropTypes.object.isRequired,
  annonce: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styleSheet)(Annonce));