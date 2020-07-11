import React, { Component } from 'react'
import { arrayBufferWithMime, arrayBufferMimeDecouple } from 'arraybuffer-mime'
import styled from 'styled-components'
import Header from 'src/components/header'
import Footer from 'src/components/footer'
import Terminal from 'src/components/functional/Terminal'
import ChatForm from 'src/components/channel/ChatForm'
import { getShareUrl } from 'src/config'
import getUrlParams from 'src/utils/getUrlParams'
import { updateWindowTitle, resetWindowTitle } from 'src/utils/updateWindowTitle'
import { createWs } from 'src/ws'

const UI = {
  SiteContainer: styled.main`
    display: flex;
    flex-direction: column;
  `,
  Header: styled.header`
    display: flex;
    justify-content: space-between;
    background: #e2e2e2;
    padding: 5px;
    position: relative;
    padding-right: 35px;
  `,
  Connections: styled.div`
    display: inline-block;
    width: auto;
    max-height: 120px;
    overflow: auto;
    font-size: 0.8rem;
    white-space: pre-wrap;
    margin-bottom: 2rem;
    background: rgba(239, 239, 239, 0.35);
    padding: 1rem;
  `
}

interface Props {

}

interface State {
  messages: any[]
  shareUrl: string
  fullscreen: boolean
  fullscreenUrl: string
  channel: string
  terminalText: any
  writable: boolean
}

class Channel extends Component<Props, State> {
  lineNumber: number
  ws: any

  constructor (props: Props) {
    super(props)

    const channel = window.location.pathname.substr(3)

    const state = {
      messages: [],
      shareUrl: getShareUrl(channel),
      fullscreen: false,
      fullscreenUrl: '',
      channel,
      terminalText: null,
      writable: false
    }

    const urlParams = getUrlParams()
    if ('f' in urlParams) {
      this.setFullScreen()
    }

    let p = window.location.pathname
    let q = window.location.search

    this.lineNumber = 0

    state.fullscreenUrl = `${p}${q}${q.length ? '&' : '?'}f=1`
    this.state = state
  }

  componentDidMount () {
    this.ws = createWs(this.state.channel)

    /*
    const connectionsLog = document.querySelector(`#connections`)
    */

    // function logMessage(data) {
    // connectionsLog.innerHTML = JSON.stringify(data, null, 2)
    // }

    this.ws.addEventListener('message', (event: any) => {
      this.handleIncomingMessage(event)
    })

    this.ws.addEventListener(`open`, () => {
      console.log(`connected`)
      // this.readCachedMessages()
    })

    this.ws.addEventListener(`close`, () => {
      console.log(`connection closed`)
    })

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        resetWindowTitle()
      }
    }, false)
  }

  render () {
    const { writable } = this.state

    return (
      <>
      <UI.SiteContainer id="site-container">
        <Header
          shareUrl={this.state.shareUrl}
        />

        {/*
        <UI.Connections>
          <pre></pre>
        </UI.Connections>
        */}

        <Terminal
          onResize={() => this.resizeOutputContainer()}
          channel={this.state.channel}
          onData={this.handleFormSubmit}
          writable={writable}
          onWritable={this.handleWritableChange}
          text={this.state.terminalText} />
        <ChatForm
          messages={this.state.messages}
          onSubmit={this.handleFormSubmit} />
      </UI.SiteContainer>
      <Footer />
    </>
    )
  }

  handleWritableChange = (writable: boolean) => {
    this.setState({
      writable
    })
  }

  setFullScreen = () => {
    document.body.classList.add('fullscreen')
  }

  resizeOutputContainer = () => {
    /*
    const outputContainer = document.getElementById('output-container') as HTMLElement
    const output = document.getElementById('output') as HTMLElement
    const form = document.getElementById('form') as HTMLElement

    const terminalContainer = this.terminalContainerRef.current
    const maxHeightAllowed = window.outerHeight - terminalContainer.offsetHeight - terminalContainer.offsetTop - form.offsetHeight - 25
    const maxHeight = outputContainer.offsetHeight - form.offsetHeight

    output.style.maxHeight = `${Math.min(maxHeight, maxHeightAllowed)}px`
     */
  }

  sendArrayBuffer = (arrayBuffer: any, mime: string) => {
    const abWithMime = arrayBufferWithMime(arrayBuffer, mime)
    try {
      this.ws.send(abWithMime)
    } catch (err) {
      console.error(err)
    }
  }

  handleIncomingMessage = async (event: any) => {
    let data: any = null
    if (typeof event === 'string') {
      let value: any = Buffer.from(event, 'hex')
      value = value.buffer
      data = value
    } else {
      data = event.data
    }

    console.log('incoming...')

    try {
      const json = JSON.parse(data)
      if (json.__server_message__) {
        // this.logMessage(json.__server_message__.data)
        return false
      }
    } catch (error) {

    }

    updateWindowTitle()

    // console.log('data:', data)

    // function buf2hex(buffer) { // buffer is an ArrayBuffer
    // return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
    // }

    const { mime, arrayBuffer } = arrayBufferMimeDecouple(data)

    console.log('received', mime)

    // TODO: fix
    if (mime.length > 20) {
      return
    }

    if (mime === 'shell' || mime === 'shell-stdin') {
      let text = new window.TextDecoder('utf-8').decode(new Uint8Array(arrayBuffer))
      /*
      text = text.replace(/(\r\n|\n\r|\n|\r)/g, (match, p1, offset, string) => {
        return green(`${p1}${`${(this.lineNumber++)}`.padEnd(4)} `)
      })
      */

      if (mime !== 'shell-stdin') {
        this.setState({
          terminalText: text
        })
      }

      return
    }

    const blob = new Blob([arrayBuffer], { type: mime })

    let ext = mime.split(`/`).join(`_`).replace(/[^\w\d_]/gi, ``)
    let url = window.URL.createObjectURL(blob)

    const t = await new Promise(resolve => {
      const reader = new FileReader()
      reader.onload = (evt: any) => {
        resolve(reader.result)
      }

      reader.readAsText(blob)
    })

    const message = {
      blob: {
        size: blob.size,
        type: blob.type
      },
      url,
      ext,
      mime,
      t
    }

    if (blob.size !== 0) {
      const messages = this.state.messages
      messages.push(message)

      this.setState({
        messages
      })
    }
  }

  handleFormSubmit = (item: any) => {
    const [arrayBuffer, mime] = item
    this.sendArrayBuffer(arrayBuffer, mime)
  }
}

export default Channel
