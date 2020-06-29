import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from 'src/components/home'
import Channel from 'src/components/channel'
import Embed from 'src/components/embed'
import NotFound from 'src/components/notFound'

class App extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/s/:channel" component={Channel} />
          <Route path="/embed/s/:channel" component={Embed} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    )
  }
}

export default App
