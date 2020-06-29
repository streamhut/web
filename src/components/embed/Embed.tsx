import React, { Component } from 'react'
import styled from 'styled-components'
import Terminal from 'src/components/functional/Terminal'

const UI = {
  Container: styled.div`

  `
}

interface Props {
}

interface State {
  channel: string
  terminalText: string
}

class Embed extends Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      channel: 'test',
      terminalText: 'testing'
    }
  }

  render () {
    const { channel, terminalText } = this.state
    return (
      <UI.Container>
        <Terminal
          resizable={false}
          hideFooter={true}
          channel={channel}
          text={terminalText} />
      </UI.Container>
    )
  }
}

export default Embed
