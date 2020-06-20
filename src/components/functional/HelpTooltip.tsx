import React, { Component } from 'react'
import Tooltip from '@material-ui/core/Tooltip'

interface Props {
  text: string
  iconStyle: any
}

interface State {
}

class HelpTooltip extends Component<Props, State> {
  render () {
    return (
      <Tooltip
        className="help-tooltip"
        title={this.props.text}
        aria-label={this.props.text}>
        <span style={this.props.iconStyle}>?</span>
      </Tooltip>
    )
  }
}

export default HelpTooltip
