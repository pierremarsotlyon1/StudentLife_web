/**
 * Created by pierremarsot on 14/05/2017.
 */
import React from 'react'
import {connect} from 'react-redux';
import Link from 'react-router/lib/Link';
import Ionicon from 'react-ionicons'

class Home extends React.Component {
  render() {
    const token = this.props.token;

    let btnHeader;
    if (token && token.length > 0) {
      btnHeader =
        <span>
          <Link
            className="btn btn-lg btn-round w-300 btn-primary mr-16"
            to="/annonces/add"
          >
            Publier une annonce
          </Link>
        </span>;
    }
    else {
      btnHeader =
        <span>
          <Link
            className="btn btn-lg btn-round w-200 btn-primary mr-16"
            to="/login"
          >
            Connexion
          </Link>
          <Link
            className="btn btn-lg btn-round btn-outline w-200 btn-white hidden-sm-down"
            to="/register"
          >
            Inscription
          </Link>
        </span>;
    }

    return (
      <div className="home_page">
        <header className="header header-inverse h-fullscreen pb-30 bg-fixed" data-overlay="1">
          <div className="container">

            <div className="row h-full">
              <div className="col-12 col-lg-6 align-self-center">

                <h1 className="display-4">Attirez les étudiants lyonnais !</h1>
                <br/>
                <h4 className="fw-200">
                  Publiez des offres gratuitement que
                  <span className="mark-border"> tous </span>
                  les étudiants pourront consulter.
                </h4>

                <br/><br/>

                {btnHeader}

              </div>

              <div className="col-12 align-self-end text-center">
                <a className="scroll-down-1 scroll-down-inverse"><span></span></a>
              </div>

            </div>

          </div>
        </header>
        <main className="main-content">

          <section className="section-description">
            <div className="container">
              <header className="section-header">
                <small>Nos services</small>
                <h2>Les étudiants sont LA ressource</h2>
                <hr/>
                <p className="lead">
                  Les problématiques chez les étudiants sont nombreuses et ne demandent qu'a être résoluent.
                  Faites profiter aux étudiants de réductions sur vos produits / services et augmenter votre CA /
                  notoriété.
                </p>
              </header>


              <div className="row gap-y">

                <div className="col-6 col-md-4 col-xl-3">
                  <div className="card card-bordered card-hover-shadow text-center">
                    <span className="card-block" href="#">
                      <p>
                        <Ionicon icon="ion-arrow-graph-up-right" fontSize="50px" color="#0facf3"/>
                      </p>
                      <h5 className="card-title">
                        CA
                      </h5>
                    </span>
                  </div>
                </div>


                <div className="col-6 col-md-4 col-xl-3">
                  <div className="card card-bordered card-hover-shadow text-center">
                    <a className="card-block" href="#">
                      <p><i className="icon-book-open fs-50"></i></p>
                      <h5 className="card-title">
                        Annonces
                      </h5>
                    </a>
                  </div>
                </div>


                <div className="col-6 col-md-4 col-xl-3">
                  <div className="card card-bordered card-hover-shadow text-center">
                    <a className="card-block" href="#">
                      <p><i className="fs-50">1</i> mois</p>
                      <h5 className="card-title">
                        Mise en ligne
                      </h5>
                    </a>
                  </div>
                </div>


                <div className="col-6 col-md-4 col-xl-3">
                  <div className="card card-bordered card-hover-shadow text-center">
                    <a className="card-block" href="#">
                      <p><i className="icon-happy fs-50"></i></p>
                      <h5 className="card-title">Etudiants</h5>
                    </a>
                  </div>
                </div>

              </div>

            </div>
          </section>
        </main>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    token: state.auth.token,
  };
}

export default connect(mapStateToProps)(Home);