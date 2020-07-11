import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from 'src/components/home'
import Channel from 'src/components/channel'
import Embed from 'src/components/embed'
import NotFound from 'src/components/notFound'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from './theme'
import { GlobalStyles } from './global'
import ThemeContext, { ThemeContextProvider } from './themeContext'

function App () {
  return (
    <ThemeContextProvider>
      <ThemeContext.Consumer>
      {theme =>
      <ThemeProvider theme={theme.dark ? darkTheme : lightTheme}>
      <>
        <GlobalStyles />
        <Router>
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/s/:channel" component={Channel} />
            <Route path="/embed/s/:channel" component={Embed} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </>
    </ThemeProvider>
    }
  </ThemeContext.Consumer>
  </ThemeContextProvider>
  )
}

export default App
