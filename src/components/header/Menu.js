/**
 * Created by pierremarsot on 24/07/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router'
import Link from 'react-router/lib/Link';
import {logout} from '../../actions/auth';

class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  handleLogout = () => {
    this.props.dispatch(logout());
    browserHistory.push('/');
  };

  render() {
    const {token} = this.props;

    let rightMenu;
    if (!token || token.length === 0) {
      rightMenu =
        <div>
          <Link to="/login" className="btn btn-sm btn-danger mr-4">
            Connexion
          </Link>
          <Link to="/register" className="btn btn-sm btn-outline btn-danger hidden-sm-down">
            Inscription
          </Link>
        </div>
    } else {
      rightMenu =
        <div>
          <ul className="topbar-nav nav">
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link">
              Mon compte
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/annonces" className="nav-link">
              Mes annonces
            </Link>
          </li>
            <li className="nav-item">
              <Link to="/jobs" className="nav-link">
                Mes offres d'emploi
              </Link>
            </li>
          <li className="nav-item">
            <Link to="#" className="nav-link" onClick={() => this.handleLogout()}>

            </Link>
          </li>
        </ul>
          <div className="d-inline-flex ml-30">
            <span
              className="btn btn-sm btn-danger mr-4"
              onClick={() => this.handleLogout()}
            >
              Déconnexion
            </span>
          </div>
        </div>;
    }

    return (
      <nav className="topbar topbar-expand-sm topbar-sticky">
        <div className="container">
          <div className="topbar-left">
            <button className="topbar-toggler">&#9776;</button>
            <Link to="/" className="topbar-brand">
              <h3><strong>Estudy</strong></h3>
            </Link>
          </div>
          <div className="topbar-right">
            {rightMenu}
          </div>
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return {
    token: state.auth.token,
  };
}

export default connect(mapStateToProps)(Menu);