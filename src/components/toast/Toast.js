/**
 * Created by pierremarsot on 24/07/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import Snackbar from 'material-ui/Snackbar';

class Toast extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      open: false,
    };
  }

  componentWillReceiveProps(){
    this.setState({
      open: true,
    });
  }

  handleRequestClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  render(){
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={this.state.open}
        autoHideDuration={6e3}
        onRequestClose={this.handleRequestClose}
        SnackbarContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{this.props.message}</span>}
      />
    )
  }
}

function mapStateToProps(state){
  return {
    type: state.toast.type,
    message: state.toast.message,
  };
}

export default connect(mapStateToProps)(Toast);