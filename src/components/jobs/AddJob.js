import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router'
import {addJob} from '../../actions/job';
import {loadContratTravail} from '../../actions/contratTravail';

class AddJob extends React.Component {
  constructor(props) {
    super(props);

    if (!this.props.token || this.props.token.length === 0) {
      browserHistory.push('/');
    }

    this.state = {
      titre: '',
      description: '',
      competences: '',
      profil: '',
      debut_contrat: '',
      remuneration: 0,
      email_contact: '',
      telephone_contact: '',
      id_type_contrat: '',
    };
  }

  componentDidMount() {
    if (!this.props.contratsTravail || this.props.contratsTravail.length === 0) {
      this.props.dispatch(loadContratTravail());
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.jobs.length < nextProps.jobs.length) {
      browserHistory.push('/jobs');
    }
  }

  handleProfil = (e) => {
    this.setState({
      profil: e.target.value,
    });
  };

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

  handleCompetences = (e) => {
    this.setState({
      competences: e.target.value,
    });
  };

  handleRemuneration = (e) => {
    let reduction = e.target.value;
    reduction = Number.parseInt(reduction);

    if (reduction < 0) {
      reduction = 0;
    }

    this.setState({
      remuneration: reduction,
    });
  };

  handleDebutContrat = (e) => {
    this.setState({
      debut_contrat: e.target.value,
    });
  };

  handleEmailContact = (e) => {
    this.setState({
      email_contact: e.target.value,
    });
  };

  handleTelephoneContact = (e) => {
    this.setState({
      telephone_contact: e.target.value,
    });
  };

  handleIdTypeContact= (e) => {
    this.setState({
      id_type_contrat: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.dispatch(addJob(
      this.state.titre,
      this.state.description,
      this.state.competences,
      this.state.profil,
      this.state.debut_contrat,
      this.state.remuneration,
      this.state.email_contact,
      this.state.telephone_contact,
      this.state.id_type_contrat,
    ));
  };

  render() {
    const contratsTravail = this.props.contratsTravail;

    let contratsTravailLocale = [
      <option key="default_option" value="0" defaultValue={true}>Selectionner un type de contrat de travail</option>
    ];

    for (const contratTravail of contratsTravail) {
      contratsTravailLocale.push(
        <option key={contratTravail._id}
                value={contratTravail._id}>{contratTravail._source.nom_contrat_travail}</option>
      );
    }

    return (
      <section className="annonce_list">
        <div className="container mt-100">
          <div className="row gap-y align-items-center">
            <div className="col-md-12 text-center">
              <h3>Ajouter une offre d'emploi</h3>
              <hr/>
            </div>
          </div>
          <div className="row gap-y align-items-center">
            <div className="col-md-12">
              <div className="card card-shadowed p-50 mb-0">
                <div className="form-group">
                  <select
                    onChange={this.handleIdTypeContact}
                  >
                    {contratsTravailLocale}
                  </select>
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Titre de l'annonce"
                    value={this.state.titre}
                    onChange={event => this.handleTitre(event)}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    type="text"
                    placeholder="Description"
                    value={this.state.description}
                    onChange={event => this.handleDescription(event)}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    type="text"
                    placeholder="Profil recherché"
                    value={this.state.profil}
                    onChange={event => this.handleProfil(event)}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    type="text"
                    placeholder="Compétences necessaires"
                    value={this.state.competences}
                    onChange={event => this.handleCompetences(event)}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="date"
                    placeholder="Date de début de contrat"
                    value={this.state.debut_contrat}
                    onChange={event => this.handleDebutContrat(event)}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Rémunération"
                    value={this.state.remuneration}
                    onChange={event => this.handleRemuneration(event)}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Email de contact"
                    value={this.state.email_contact}
                    onChange={event => this.handleEmailContact(event)}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Telephone de contact"
                    value={this.state.telephone_contact}
                    onChange={event => this.handleTelephoneContact(event)}
                  />
                </div>
                <div className="form-group">
                  <button
                    className="btn btn-bold btn-block btn-primary"
                    onClick={event => this.handleSubmit(event)}
                  >
                    Mettre en ligne mon offre d'emploi
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    contratsTravail: state.contratTravail.contratsTravail,
    jobs: state.jobs.jobs,
    token: state.auth.token,
  };
}

export default connect(mapStateToProps)(AddJob);