import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router'
import {addAnnonce} from '../../actions/annonce';
import {loadCategorieAnnonce} from '../../actions/categorieAnnonce';

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
      debut_contrat: '',
      remuneration: 0,
      email_contact: '',
      telephone_contact: '',
      id_type_contrat: '',
    };
  }

  componentDidMount() {
    if (!this.props.categoriesAnnonce || this.props.categoriesAnnonce.length === 0) {
      this.props.dispatch(loadCategorieAnnonce());
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.jobs.length < nextProps.jobs.length) {
      browserHistory.push('/jobs');
    }
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

    this.props.dispatch(addAnnonce(
      this.state.titre,
      this.state.description,
      this.state.competences,
      this.state.debut_contrat,
      this.state.remuneration,
      this.state.email_contact,
      this.state.telephone_contact,
      this.state.id_type_contrat,
    ));
  };

  render() {
    const categoriesAnnonce = this.props.categoriesAnnonce;

    let categoriesAnnonceLocale = [
      <option key="default_option" value="0" defaultValue={true}>Selectionner une catégorie d'annonce</option>
    ];

    for (const categorieAnnonce of categoriesAnnonce) {
      categoriesAnnonceLocale.push(
        <option key={categorieAnnonce._id}
                value={categorieAnnonce._id}>{categorieAnnonce._source.nom_categorie_annonce}</option>
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
                    className="form-control"
                    onChange={this.handleCategorieAnnonce}
                  >
                    {categoriesAnnonceLocale}
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
                    placeholder="Description du bon plan"
                    value={this.state.description}
                    onChange={event => this.handleDescription(event)}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Réduction (en %)"
                    value={this.state.reduction}
                    onChange={event => this.handleReduction(event)}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Url de votre page web qui décrit le service"
                    value={this.state.url}
                    onChange={event => this.handleUrl(event)}
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
    categoriesAnnonce: state.categorieAnnonce.categoriesAnnonce,
    jobs: state.jobs.jobs,
    token: state.auth.token,
  };
}

export default connect(mapStateToProps)(AddJob);