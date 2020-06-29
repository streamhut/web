import React, { Component } from 'react'
import styled from 'styled-components'
import throttle from 'lodash/throttle'
import ArrowExpandAll from 'mdi-material-ui/ArrowExpandAll'
import ArrowExpand from 'mdi-material-ui/ArrowExpand'
import ArrowCollapse from 'mdi-material-ui/ArrowCollapse'
import FullscreenExit from 'mdi-material-ui/FullscreenExit'
import { Terminal } from 'xterm'
import * as fit from 'xterm/lib/addons/fit/fit'
import * as termFullscreen from 'xterm/lib/addons/fullscreen/fullscreen'
import ansi from 'ansi-styles'
import { streamHostname, streamPort } from 'src/config'

Terminal.applyAddon(fit)
Terminal.applyAddon(termFullscreen)

const green = t => `${ansi.greenBright.open}${t}${ansi.greenBright.close}`

const ESC_KEY = 27

const UI = {
  /* background: #293238; */
  TerminalContainer: styled.div`
    background-color: #000;
    padding-bottom: 2rem; /* same as resizer height */
    position: relative;
    width: 100%;
    height: auto;
    overflow: hidden;
  `,
  Terminal: styled.div`
    &.blur {
      pointer-events: none;
      opacity: 0.8;
    }
  `,
  TerminalFooter: styled.footer`
    position: absolute;
    bottom: 2rem;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 1rem;
    color: #fff;
    z-index: 1000;
    &.fixed {
      position: fixed;
    }
  `,
  TerminalResizer: styled.div`
    width: 100%;
    height: 1.2rem;
    position: absolute;
    bottom: 0;
    cursor: row-resize;
    background-color: #efefef;
    border: 1px solid #cacaca;
    text-align: center;
    font-size: 1rem;
    line-height: 1;
    color: #797979;
    &:hover {
      background-color: #e6e6e6;
      border-color: #adadad;
    }
  `,
  FullscreenButton: styled.button`
    font-size: 1rem;
    margin-left: 0.4em;
    color: #fff;
    opacity: 0.5;
    &:active,
    &:focus,
    &:hover {
      text-decoration: none;
      color: #fff;
      opacity: 1;
    }
  `
}

interface Props {
  channel?: string
  text?: any
  onResize?: () => void
  hideFooter?: boolean
  resizable?: boolean
}

interface State {
  hostname: string
  port: number
  expandedView: boolean
  fullscreen: boolean
  terminalPressedKey: any
  terminalBlurred: boolean
  terminalScrollable: boolean
  lastKeyPress: any
  lastKeyTimeout: any
  borderSize: any
  pos: any
  lastHeight: any
}

class TerminalComponent extends Component<Props, State> {
  terminalRef: any
  terminalContainerRef: any
  terminalResizerRef: any
  term: any

  constructor (props: Props) {
    super(props)

    this.state = {
      expandedView: false,
      fullscreen: false,
      terminalPressedKey: null,
      terminalBlurred: true,
      terminalScrollable: false,
      hostname: streamHostname,
      port: streamPort,
      lastKeyPress: null,
      lastKeyTimeout: null,
      borderSize: null,
      pos: null,
      lastHeight: null
    }

    this.terminalRef = React.createRef()
    this.terminalContainerRef = React.createRef()
    this.terminalResizerRef = React.createRef()
  }

  componentWillReceiveProps (props: Props) {
    const { text } = props
    if (text) {
      this.term.write(text)
    }
  }

  componentDidMount () {
    const { channel } = this.props
    const { hostname } = this.state

    this.term = new Terminal({
      allowTransparency: false,
      bellStyle: 'none',
      bellSound: '',
      convertEol: true,
      scrollback: 10000,
      disableStdin: true,
      cursorStyle: 'underline',
      // cursorStyle: 'block',
      cursorBlink: false,
      // cursorBlink: true,
      drawBoldTextInBrightColors: true
    })

    this.term.setOption('theme', {
      fontFamily: '"Source Code Pro, Menlo, Monaco, Consolas, "Courier New", monospace'
    })

    let termNode = this.terminalRef.current
    termNode.style.display = 'block'
    this.term.open(termNode, false)
    this.blurTerminal()
    this.term.fit()
    const termScrollArea = document.querySelector('.xterm-viewport') as HTMLElement

    let echoChannel = channel ? `echo \\#${channel}` : ''
    let cmd = green(`exec > >(nc ${hostname} 1337) 2>&1;${echoChannel}`)
    this.term.writeln(`To get started, run in your terminal:\n\n${cmd}\n`)

    this.setupTerminalResizer()

    this.term.on('blur', () => {
      this.blurTerminal()
    })

    this.term.on('key', (_, event) => {
      if (event.keyCode === ESC_KEY) {
        this.blurTerminal()

        if (this.state.expandedView) {
          this.exitExpandedView()
        }

        if (this.state.fullscreen) {
          this.exitFullscreen()
        }
      }
    })

    termScrollArea.addEventListener('scroll', throttle((event: any) => {
      if (this.state.terminalScrollable) {
        return
      }
      if (event.target.scrollHeight > event.target.clientHeight) {
        this.setState({
          terminalScrollable: true
        })
      }
    }, 100))

    window.addEventListener('resize', this.onWindowResize, false)

    window.addEventListener('keydown', throttle((event: any) => {
      if (event.keyCode === ESC_KEY) {
        this.blurTerminal()
      }

      this.handleNavigationKeys(event)
      this.handleKeyPressLog(event)

      const lastKeyPress = event.key
      clearTimeout(this.state.lastKeyTimeout)
      const lastKeyTimeout = setTimeout(() => {
        this.setState({
          lastKeyPress,
          terminalPressedKey: null
        })
      }, 1800)
      this.setState({
        lastKeyPress,
        lastKeyTimeout
      })
    }, 10), true)
  }

  componentWillUnmount () {
    if (this.terminalResizerRef.current) {
      let resizer = this.terminalResizerRef.current
      resizer.removeEventListener('mousedown', this.onTerminalResizer, false)
      // resizer.removeEventListener('touchstart', this.onTerminalResizer, false)
    }

    window.removeEventListener('resize', this.onWindowResize, false)
  }

  render () {
    const { resizable } = this.props

    return (
      <UI.TerminalContainer
        ref={this.terminalContainerRef}
        onClick={(event: any) => this.focusTerminal()}>
        <UI.Terminal
          id="terminal"
          style={{
            height: resizable ? '350px' : '100%'
          }}
          ref={this.terminalRef} />
          {this.renderFooter()}
          {this.renderResizer()}
      </UI.TerminalContainer>
    )
  }

  renderFooter () {
    if (this.props.hideFooter) return null

    const {
      terminalBlurred,
      terminalScrollable,
      expandedView,
      fullscreen
    } = this.state

    return (
      <UI.TerminalFooter className={(expandedView || fullscreen) ? 'fixed' : ''}>
        <div
          style={{
            display: 'inline-block',
            marginRight: 'auto'
          }}>
          <div
            style={{
              display: 'inline-block',
              fontSize: '0.8rem',
              opacity: '0.5',
              marginRight: '1rem',
              fontWeight: 700
            }}>
          READ-ONLY
          </div>
          <div style={{
            display: 'inline-block',
            fontSize: '0.8rem',
            opacity: '0.5'
          }}>{this.state.terminalPressedKey}</div>
        </div>
        {(terminalBlurred && terminalScrollable) && <div
          style={{
            display: 'inline-block',
            marginRight: '1rem',
            fontSize: '0.8rem',
            opacity: '0.5'
          }}>
          click to scroll terminal
        </div>}
        {!terminalBlurred && <div
          style={{
            display: 'inline-block',
            marginRight: '1rem',
            fontSize: '0.8rem',
            opacity: '0.5'
          }}>vim-shortcut keys enabled</div>}
        {!terminalBlurred && <div
          style={{
            display: 'inline-block',
            marginRight: '1rem',
            fontSize: '0.8rem',
            opacity: '0.5',
            fontWeight: 700
          }}>
          ESC to focus out
        </div>
        }
        {this.renderExpandViewButton()}
        {this.renderFullscreenButton()}
      </UI.TerminalFooter>
    )
  }

  renderExpandViewButton () {
    const { expandedView } = this.state

    if (expandedView) {
      return (
        <UI.FullscreenButton
          title="Exit expanded view"
          onClick={(event: any) => {
            event.preventDefault()
            this.exitExpandedView()
          }}
          className="link">
          <ArrowCollapse />
        </UI.FullscreenButton>
      )
    }

    return (
      <UI.FullscreenButton
        title="Expand view"
        onClick={(event: any) => {
          event.preventDefault()
          this.showExpandedView()
        }}
        className="link">
        <ArrowExpand />
      </UI.FullscreenButton>
    )
  }

  renderFullscreenButton () {
    const { fullscreen } = this.state

    if (fullscreen) {
      return (
        <UI.FullscreenButton
          title="Exit fullscreen"
          onClick={(event: any) => {
            event.preventDefault()
            this.exitFullscreen()
          }}
          className="link">
          <FullscreenExit />
        </UI.FullscreenButton>
      )
    }

    return (
      <UI.FullscreenButton
        title="Fullscreen"
        onClick={(event: any) => {
          event.preventDefault()
          this.showFullscreen()
        }}
        className="link">
        <ArrowExpandAll />
      </UI.FullscreenButton>
    )
  }

  renderResizer () {
    // explicit check is required
    if (this.props.resizable === false) return null

    return (
      <UI.TerminalResizer
        ref={this.terminalResizerRef}
      >☰</UI.TerminalResizer>
    )
  }

  focusTerminal () {
    this.terminalRef.current.classList.remove('blur')
    this.term.focus()
    this.setState({
      terminalBlurred: false
    })
  }

  blurTerminal () {
    this.terminalRef.current.classList.add('blur')
    this.setState({
      terminalBlurred: true,
      terminalPressedKey: null
    })
  }

  isTerminalBlurred () {
    return this.terminalRef.current.classList.contains('blur')
  }

  showFullscreen = async () => {
    try {
      let container = this.terminalContainerRef.current
      const lastHeight = container.clientHeight

      let terminal = this.terminalRef.current
      await terminal.requestFullscreen()

      this.setState({
        fullscreen: true,
        lastHeight
      })

      const cb = (event) => {
        if (!document.fullscreenElement) {
          this.exitExpandedView()
          this.setState({
            fullscreen: false
          })

          terminal.removeEventListener('fullscreenchange', cb)
        }
      }

      terminal.addEventListener('fullscreenchange', cb)
    } catch (err) {
      // noop
    }
  }

  exitFullscreen () {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }

  showExpandedView () {
    const { borderSize } = this.state
    // window.location.href = window.location.href + '?f=1'

    let container = this.terminalContainerRef.current
    let terminal = this.terminalRef.current
    const lastHeight = container.clientHeight
    const offset = 125
    container.style.height = window.outerHeight - offset + 'px'
    terminal.style.height = window.outerHeight - borderSize - offset + 'px'
    this.term.toggleFullScreen(true)
    this.term.fit()
    this.setState({
      expandedView: true,
      lastHeight
    })
  }

  exitExpandedView () {
    const { lastHeight, borderSize } = this.state
    this.term.toggleFullScreen(false)
    let container = this.terminalContainerRef.current
    let terminal = this.terminalRef.current
    container.style.height = lastHeight + borderSize + 'px'
    terminal.style.height = lastHeight - borderSize + 'px'
    this.term.fit()
    this.setState({
      expandedView: false
    })
  }

  handleNavigationKeys (event) {
    if (!this.isTerminalBlurred()) {
      if (event.key === 'j' || event.key === 'ArrowDown') {
        this.terminalScrollDown()
      }
      if (event.key === 'k' || event.key === 'ArrowUp') {
        this.terminalScrollUp()
      }
      if (event.key === 'u' && event.ctrlKey) {
        this.terminalScrollPageUp()
      }
      if (event.key === 'd' && event.ctrlKey) {
        this.terminalScrollPageDown()
      }
      if (event.key === 'g' && this.state.lastKeyPress === 'g') {
        this.terminalScrollHome()
      }
      if (event.key === 'G' || (event.key === 'g' && event.shiftKey)) {
        this.terminalScrollEnd()
      }
      if (event.key === 'H') {
        this.terminalScrollPageHome()
      }
      if (event.key === 'L') {
        this.terminalScrollPageEnd()
      }
      if (event.key === 'M') {
        this.terminalScrollPageMiddle()
      }
    }
  }

  handleKeyPressLog (event) {
    if (event.keyCode !== 73) {
      if (!this.isTerminalBlurred()) {
        this.setState({
          terminalPressedKey: `${event.ctrlKey ? 'ctrl-' : ''}${event.key}`
        })
      }
    }
  }

  terminalScrollUp () {
    this.term.scrollLines(-1)
  }

  terminalScrollDown () {
    this.term.scrollLines(1)
  }

  terminalScrollPageUp () {
    this.term.scrollPages(-1)
  }

  terminalScrollPageDown () {
    this.term.scrollPages(1)
  }

  terminalScrollPageHome () {
    this.term.scrollToLine(0)
  }

  terminalScrollPageEnd () {
    this.term.scrollToLine(this.term.rows)
  }

  terminalScrollHome () {
    this.term.scrollToTop()
  }

  terminalScrollEnd () {
    this.term.scrollToBottom()
  }

  terminalScrollPageMiddle () {
    this.term.scrollToLine(parseInt(this.term.rows, 10) / 2)
  }

  onWindowResize = throttle(() => {
    this.term.fit()
  }, 20)

  onTerminalResizer = (event) => {
    if (event.offsetY < this.state.borderSize) {
      const pos = event.y
      document.addEventListener('mousemove', this.resizeTerminal, false)
      // document.addEventListener('touchmove', this.resizeTerminal, false)

      this.setState({
        pos
      })
    }
  }

  resizeTerminal = throttle((event: any) => {
    let { borderSize, pos } = this.state
    let container = this.terminalContainerRef.current
    let terminal = this.terminalRef.current
    const dy = pos - event.y
    pos = event.y
    const newHeight = (parseInt(getComputedStyle(container, '').height, 10) - dy)
    container.style.height = newHeight + 'px'
    terminal.style.height = (newHeight - borderSize) + 'px'
    this.term.fit()

    this.setState({ pos })

    if (typeof this.props.onResize === 'function') {
      this.props.onResize()
    }
  }, 20)

  setupTerminalResizer () {
    if (!this.terminalResizerRef.current) {
      return
    }

    let resizer = this.terminalResizerRef.current
    const borderSize = parseInt(getComputedStyle(resizer, '').height, 10)
    const pos = 0

    this.setState({
      borderSize,
      pos
    })

    resizer.addEventListener('mousedown', this.onTerminalResizer, false)
    // resizer.addEventListener('touchend', this.onTerminalResizer, false)

    document.addEventListener('mouseup', event => {
      document.removeEventListener('mousemove', this.resizeTerminal, false)
    }, false)

    // TODO: fix resizing on mobile
    // document.addEventListener('touchstart', event => {
    // document.removeEventListener('touchmove', this.resizeTerminal, false)
    // }, false)
  }
}

export default TerminalComponent
