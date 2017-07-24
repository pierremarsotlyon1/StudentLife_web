/**
 * Created by pierremarsot on 24/07/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

class Annonce extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){

  }

  render(){
    const classes = this.props.classes;
    const bull = <span className={classes.bullet}>•</span>;

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography type="body1" className={classes.title}>
            Word of the Day
          </Typography>
          <Typography  component="h2">
            be{bull}nev{bull}o{bull}lent
          </Typography>
          <Typography type="body1" className={classes.pos}>
            adjective
          </Typography>
          <Typography component="p">
            well meaning and kindly.<br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button dense>Learn More</Button>
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

function mapStateToProps(state){
  return {

  };
}

Annonce.propTypes = {
  classes: PropTypes.object.isRequired,
  annonce: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styleSheet)(Annonce));