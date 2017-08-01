/**
 * Created by pierremarsot on 24/07/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router'
import Annonce from './Annonce';
import Link from 'react-router/lib/Link';
import {loadAnnonce} from '../../actions/annonce';

class AnnonceList extends React.Component {
  constructor(props) {
    super(props);

    if (!this.props.token || this.props.token === 0) {
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
    let annoncesLocales = [];
    let i = 0;
    let blockAnnonce;

    for (const annonce of this.props.annonces) {
      annoncesLocales.push(
        <Annonce key={"annonce_" + i} annonce={annonce}/>
      );
      i++;
    }

    if (annoncesLocales.length === 0) {
      blockAnnonce =
        <p className="lead text-center">
          Vous n'avez pas encore ajouté d'annonce
        </p>
    }
    else {
      blockAnnonce =
        <div className="accordion" id="accordion-job">
          {annoncesLocales}
        </div>
    }

    return (
      <section className="annonce_list">
        <div className="container mt-100">
          <div className="row gap-y align-items-center">
            <div className="col-md-12 text-center">
              <h3>Mes annonces</h3>
              <hr/>
            </div>
          </div>
          <div className="row gap-y align-items-center">
            <div className="col-md-12">
              {blockAnnonce}
            </div>
          </div>
        </div>
        <Link
          className="scroll-top"
          to="/annonces/add"
        >
          <i className="fa fa-plus" aria-hidden="true"></i>
        </Link>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    annonces: state.annonce.annonces,
    token: state.auth.token,
  };
}

export default connect(mapStateToProps)(AnnonceList);