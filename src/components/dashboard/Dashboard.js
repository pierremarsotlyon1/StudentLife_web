/**
 * Created by pierremarsot on 24/07/2017.
 */
import React from 'react';
import {connect} from 'react-redux';

class Dashboard extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div></div>
    )
  }
}

function mapStateToProps(state){
  return {
    token: state.auth.token,
  };
}

export default connect(mapStateToProps)(Dashboard);