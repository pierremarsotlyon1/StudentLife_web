/**
 * Created by pierremarsot on 24/07/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router'
import Job from './Job';
import Link from 'react-router/lib/Link';
import {loadJobs} from '../../actions/job';

class JobList extends React.Component {
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
    this.props.dispatch(loadJobs(this.state.offset));
  }

  render() {
    let jobsLocal = [];
    let i = 0;
    let blockJob;

    for (const job of this.props.jobs) {
      jobsLocal.push(
        <Job key={"job_" + i} job={job}/>
      );
      i++;
    }

    if (jobsLocal.length === 0) {
      blockJob =
        <p className="lead text-center">
          Vous n'avez pas encore ajouté d'offre d'emploi
        </p>
    }
    else {
      blockJob =
        <div className="accordion" id="accordion-job">
          {jobsLocal}
        </div>
    }

    return (
      <section className="annonce_list">
        <div className="container mt-100">
          <div className="row gap-y align-items-center">
            <div className="col-md-12 text-center">
              <h3>Mes offres d'emploi</h3>
              <hr/>
            </div>
          </div>
          <div className="row gap-y align-items-center">
            <div className="col-md-12">
              {blockJob}
            </div>
          </div>
        </div>
        <Link
          className="scroll-top"
          to="/jobs/add"
        >
          <i className="fa fa-plus" aria-hidden="true"></i>
        </Link>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    jobs: state.jobs.jobs,
    token: state.auth.token,
  };
}

export default connect(mapStateToProps)(JobList);