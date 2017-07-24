/**
 * Created by pierremarsot on 14/05/2017.
 */
import React from 'react'
import Grid from 'material-ui/Grid';

class Home extends React.Component {
  render() {
    return (
      <div className="App">
        <Grid container align="center">
          <Grid item xs >
            <div className="App-header">
              <h2>Welcome to React</h2>
            </div>
          </Grid>
          <Grid item xs>
            <p className="App-intro">
              To get started, edit <code>src/App.js</code> and save to reload.
            </p>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default Home;