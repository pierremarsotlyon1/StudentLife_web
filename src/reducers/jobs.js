import {
  LOAD_JOBS_ERROR,
  LOAD_JOBS_SUCCESS,
  ADD_JOB_ERROR,
  ADD_JOB_SUCCESS,
  REMOVE_JOB_ERROR,
  REMOVE_JOB_SUCCESS,
  UPDATE_JOB_ERROR,
  UPDATE_JOB_SUCCESS,
} from '../actions/job';

const initialState = {
  jobs: [],
};

export default function jobs(state = initialState, action = {}) {
  let jobs;
  switch (action.type) {
    case LOAD_JOBS_SUCCESS:
      if(!action.jobs){
        return {
          ...state,
          jobs: [],
        };
      }

      return {
        ...state,
        jobs: action.jobs,
      };

    case ADD_JOB_SUCCESS:
      if(!action.job){
        return state;
      }

      return {
        ...state,
        jobs: state.jobs.concat(action.job),
      };

    case REMOVE_JOB_SUCCESS:
      if(!action.id){
        return state;
      }

      return {
        ...state,
        jobs: state.jobs.filter((j) => {
          return j._id !== action.id;
        }),
      };

    default:
      return state;
  }
}