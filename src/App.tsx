import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from 'src/components/home'
import Channel from 'src/components/channel'
import NotFound from 'src/components/notFound'
import Layout from './Layout'

class App extends Component {
  render () {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/s/:channel" component={Channel} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Router>
    )
  }
}

export default App
