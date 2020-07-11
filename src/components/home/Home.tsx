import React, { Component } from 'react'
import styled from 'styled-components'
import Hero from './Hero'
import GettingStarted from './GettingStarted'
import Demo from './Demo'
import UseCases from './UseCases'
import SelfHost from './SelfHost'
import OpenSource from './OpenSource'
import Subscribe from './Subscribe'
import Footer from 'src/components/footer'
import { streamHostname, streamPort } from 'src/config'

const UI = {
  Container: styled.div`
    background: #efefef;
  `
}

interface Props {
}

interface State {
  hostname: string
  port: number
}

class Home extends Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      hostname: streamHostname,
      port: streamPort
    }
  }

  render () {
    const { hostname, port } = this.state

    return (
      <>
        <UI.Container id="site-container">
          <Hero />
          <GettingStarted
            hostname={hostname}
            port={port}
          />
          <Demo />
          <UseCases />
          <SelfHost />
          <OpenSource />
          <Subscribe />
        </UI.Container>
        <Footer />
    </>
    )
  }
}

export default Home
