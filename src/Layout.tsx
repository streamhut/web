import React, { Component } from 'react'
import Footer from 'src/components/global/Footer'

class Layout extends Component {
  render () {
    return (
      [
        this.props.children,
        <Footer key="footer" />
      ]
    )
  }
}

export default Layout
