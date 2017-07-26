/**
 * Created by pierremarsot on 24/07/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router'
import {loadProfilEntreprise, updateProfilEntreprise, uploadLogo} from '../../actions/entreprise';
import Dropzone from 'react-dropzone'

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    if (!this.props.token || this.props.token === 0) {
      browserHistory.push('/');
    }

    this.state = {
      nomEntreprise: '',
      logoEntreprise: '',
    };
  }

  componentDidMount() {
    this.props.dispatch(loadProfilEntreprise());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.entreprise) {
      this.setState({
        ...this.state,
        nomEntreprise: nextProps.entreprise._source.nom_entreprise,
        logoEntreprise: nextProps.entreprise._source.logo_entreprise,
      });
    }
  }

  handleNomEntreprise = (e) => {
    this.setState({
      nomEntreprise: e.target.value,
    });
  };

  onImageDrop = (files) => {
    this.props.dispatch(uploadLogo(files[0]));
  };


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.dispatch(updateProfilEntreprise(this.state.nomEntreprise));
  };

  render() {
    return (
      <div className="container mt-100">
        <div className="row gap-y align-items-center">
          <div className="col-md-12 text-center">
            <div className="card card-shadowed p-50 mb-0">
              <h5 className="text-uppercase text-center">Mes informations</h5>
              <br/><br/>
              <form className="form-type-material">

                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nom de votre entreprise"
                    value={this.state.nomEntreprise}
                    onChange={event => this.handleNomEntreprise(event)}
                  />
                </div>

                <br/>
                <button
                  className="btn btn-bold btn-block btn-primary"
                  onClick={event => this.handleSubmit(event)}
                >
                  Modifier mes informations
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="row gap-y align-items-center">
          <div className="col-md-12 text-center">
            <div className="card card-shadowed p-50 mb-0">
              <h5 className="text-uppercase text-center">
                Mon logo <img className="" src={this.state.logoEntreprise} alt="logo entreprise" />
              </h5>
              <br/><br/>
              <form className="form-type-material text-center">
                <Dropzone
                  multiple={false}
                  accept="image/*"
                  onDrop={this.onImageDrop}
                  className="col-md-12"
                >
                  <p>Déplacer votre logo ici ou cliquez pour en choisir un (taille préférée de 80 x 80).</p>
                </Dropzone>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    token: state.auth.token,
    entreprise: state.entreprise.entreprise,
  };
}

export default connect(mapStateToProps)(Dashboard);