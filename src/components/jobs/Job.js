/**
 * Created by pierremarsot on 24/07/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import UpdateIcon from 'material-ui-icons/Update';

import {removeJob} from '../../actions/job';

class Job extends React.Component {
  constructor(props) {
    super(props);
  }

  handleRemove = (id) => {
    this.props.dispatch(removeJob(id));
  };

  render() {
    const job = this.props.job;

    const href = "#collapse-annonce-" + job._id;
    const id = "collapse-annonce-" + job._id;

    let description, competences, profil, contactBlock, remuneration;
    let contact = [];
    if (job._source.description && job._source.description.length > 0) {
      description =
        <span>
          <h2>Descriptif du poste</h2>
          <p>
            {job._source.description}
          </p>
        </span>;
    }
    else {
      description =
        <span>
          <h2>Descriptif du poste</h2>
          <p>
            Non spécifié
          </p>
        </span>;
    }

    if (job._source.profil && job._source.profil.length > 0) {
      profil =
        <span>
          <h2>Le profil demandé</h2>
          <p>
            {job._source.profil}
          </p>
        </span>;
    }
    else {
      profil =
        <span>
          <h2>Le profil demandé</h2>
          <p>
            Non spécifié
          </p>
        </span>;
    }

    if (job._source.competences && job._source.competences.length > 0) {
      competences =
        <span>
          <h2>Compétences demandées</h2>
          <p>
            {job._source.competences}
          </p>
        </span>;
    } else {
      profil =
        <span>
          <h2>Compétences demandées</h2>
          <p>
            Non spécifié
          </p>
        </span>;
    }

    if (job._source.email_contact && job._source.email_contact.length > 0) {
      contact.push(
        <span key="email_contact">{job._source.email_contact}</span>
      );
    }

    if (job._source.telephone_contact && job._source.telephone_contact.length > 0) {
      contact.push(
        <span key="telephone_contact"> - {job._source.telephone_contact}</span>
      );
    }

    if (contact.length > 0) {
      contactBlock = <p>
        {contact}
      </p>;
    }

    if (job._source.remuneration) {
      remuneration =
        <p>
          Rémunération de : {job._source.remuneration} euros.
        </p>
    }

    return (
      <div className="card">
        <h5 className="card-title">
          <a className="d-flex collapsed" data-toggle="collapse" data-parent="#accordion-job"
             href={href}
             aria-expanded="false">
            <span className="mr-auto">{job._source.titre}</span>
            <span className="text-lighter hidden-sm-down">
              {job._source.type_contrat}
            </span>
          </a>
        </h5>

        <div id={id} className="in collapse" aria-expanded="false">
          <div className="card-block">
            {description}
            {profil}
            {competences}
            {contactBlock}
            {remuneration}
            <hr className="w-100"/>
            <p className="text-center">
              <IconButton onClick={() => this.handleRemove(job._id)} color="accent" aria-label="Delete">
                <DeleteIcon/>
              </IconButton>
              <IconButton color="primary" aria-label="Update">
                <UpdateIcon/>
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

Job.propTypes = {
  job: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(Job);