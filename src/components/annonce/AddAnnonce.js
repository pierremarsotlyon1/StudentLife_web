import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router'
import {addAnnonce} from '../../actions/annonce';
import {loadCategorieAnnonce} from '../../actions/categorieAnnonce';

class AddAnnonce extends React.Component {
  constructor(props) {
    super(props);

    if (!this.props.token || this.props.token.length === 0) {
      browserHistory.push('/');
    }

    this.state = {
      titre: '',
      description: '',
      reduction: 0,
      idCategorieAnnonce: '',
      url: '',
    };
  }

  componentDidMount() {
    if (!this.props.categoriesAnnonce || this.props.categoriesAnnonce.length === 0) {
      this.props.dispatch(loadCategorieAnnonce());
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.annonces.length < nextProps.annonces.length) {
      browserHistory.push('/annonces');
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

  handleUrl = (e) => {
    this.setState({
      url: e.target.value,
    });
  };

  handleReduction = (e) => {
    let reduction = e.target.value;
    reduction = Number.parseInt(reduction);

    if (reduction < 0) {
      reduction = 0;
    }

    this.setState({
      reduction: reduction,
    });
  };

  handleCategorieAnnonce = (e) => {
    this.setState({
      idCategorieAnnonce: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.dispatch(addAnnonce(
      this.state.titre,
      this.state.description,
      this.state.reduction,
      this.state.idCategorieAnnonce,
      this.state.url,
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
              <h3>Ajouter une annonce</h3>
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
                    Mettre en ligne mon annonce
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
    annonces: state.annonce.annonces,
    token: state.auth.token,
  };
}

export default connect(mapStateToProps)(AddAnnonce);