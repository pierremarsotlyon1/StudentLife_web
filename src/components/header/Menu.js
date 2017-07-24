/**
 * Created by pierremarsot on 24/07/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Link from 'react-router/lib/Link';
import PowerSettingsNew from 'material-ui-icons/PowerSettingsNew';
import {logout} from '../../actions/auth';

class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  handleLogout = () => {
    this.props.dispatch(logout());
  };

  render() {
    const {token, classes} = this.props;

    let rightMenu;
    if (!token || token.length === 0) {
      rightMenu =
        <div>
          <Link to="/login">
            <Button color="contrast">
              Se connecter
            </Button>
          </Link>
          <Link to="/register">
            <Button color="contrast">
              S'inscrire
            </Button>
          </Link>
        </div>
    } else {
      rightMenu = <div>
        <Link to="/dashboard">
          <Button color="contrast">
            Mon compte
          </Button>
        </Link>
        <Link to="/annonces">
          <Button color="contrast">
            Mes annonces
          </Button>
        </Link>

        <IconButton
          className={classes.button}
          aria-label="Logout"
          color="contrast"
          onClick={() => this.handleLogout()}
        >
          <PowerSettingsNew/>
        </IconButton>
      </div>
    }

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.background}>
          <Toolbar className="menu-appbar">
            <Typography type="title" color="inherit" className={classes.flex}>
              <Link to="/">
                Student Life
              </Link>
            </Typography>
            {rightMenu}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

const styleSheet = createStyleSheet('Menu', {
  root: {
    width: '100%',
    marginBottom: 30,
  },
  background: {
    backgroundColor: "#00bcd4",
  },
  flex: {
    flex: 1,
  },

});

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    token: state.auth.token,
  };
}

export default connect(mapStateToProps)(withStyles(styleSheet)(Menu));