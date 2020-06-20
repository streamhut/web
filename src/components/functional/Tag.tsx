import React, { Component } from 'react'
import Chip from '@material-ui/core/Chip'

interface Props {
  className: string
  text: string
  onDelete: any
}

interface State {
}

class Tag extends Component<Props, State> {
  render () {
    return (
      <Chip
        className={this.props.className}
        label={this.props.text}
        onDelete={this.props.onDelete}
      />
    )
  }
}

export default Tag
