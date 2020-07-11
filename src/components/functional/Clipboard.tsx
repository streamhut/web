import React, { Component } from 'react'
import styled from 'styled-components'
import ClipboardJS from 'react-clipboard.js'
import ContentCopyIcon from 'mdi-material-ui/ContentCopy'

const UI = {
  CopyIcon: styled(ContentCopyIcon)`
    font-size: 0.9rem;
  `
}

interface Props {
  className?: string
  style?: any
  clipboardText: string
}

interface State {
  copied: boolean
}

class Clipboard extends Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      copied: false
    }
  }

  onClipboardCopy (event: any) {
    this.setState({
      copied: true
    })

    setTimeout(() => {
      this.setState({
        copied: false
      })
    }, 3e3)
  }

  render () {
    return (
      <ClipboardJS
        className={`${this.props.className || ''} copy`}
        style={this.props.style}
        button-title="Copy to clipboard"
        data-clipboard-text={this.props.clipboardText}
        onSuccess={event => this.onClipboardCopy(event)}>
        {this.state.copied ?
          'copied!'
        :
          <UI.CopyIcon />
        }
      </ClipboardJS>
    )
  }
}

export default Clipboard
