/**
 * Created by pierremarsot on 24/07/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
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
    const annonce = this.props.annonce;

    const href = "#collapse-annonce-" + annonce._id;
    const id = "collapse-annonce-" + annonce._id;

    let description;
    if (annonce._source.description && annonce._source.description.length > 0) {
      description =
        <p>
          {annonce._source.description}
        </p>;
    }
    else {
      description =
        <p>
          Aucune description
        </p>;
    }

    return (
      <div className="card">
        <h5 className="card-title">
          <a className="d-flex collapsed" data-toggle="collapse" data-parent="#accordion-job"
             href={href}
             aria-expanded="false">
            <span className="mr-auto">{annonce._source.title}</span>
            <span className="text-lighter hidden-sm-down">
            <i className="fa fa-map-marker mr-8"></i>
              {annonce._source.date_debut} / {annonce._source.date_fin}
            </span>
          </a>
        </h5>

        <div id={id} className="in collapse" aria-expanded="false">
          <div className="card-block">
            {description}
            <p>
              Réduction : {annonce._source.reduction} %
            </p>
            <hr className="w-100"/>
            <p className="text-center">
              <IconButton onClick={() => this.handleRemove(annonce._id)} color="accent" aria-label="Delete">
                <DeleteIcon />
              </IconButton>
              <IconButton color="primary" aria-label="Update">
                <UpdateIcon />
              </IconButton>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {};
}

Annonce.propTypes = {
  annonce: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(Annonce);