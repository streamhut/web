import React, { Component } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import prettysize from 'prettysize'
import Tag from 'src/components/functional/Tag'
import Clipboard from 'src/components/functional/Clipboard'
import DragAndDrop from 'src/components/functional/DragAndDrop'

const UI = {
  OutputContainer: styled.div`
    display: flex;
    flex-direction: column;
    flex: 2;
  `,
  Output: styled.output`
    width: 100%;
    max-height: 300px;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 1rem;
    width: 100%;
    position: relative;
    display: flex;
    flex: 2;
    flex-direction: column;
    box-shadow: 0 1px 10px rgba(151,164,175,0.1);

    @media (max-width: 500px) {
      padding: 0;
    }

    textarea {
      font-size: 12px;
    }

    .item footer .copy {
      margin-left: 0.5rem;
    }

    video {
      width: 100%;
      height: auto;
      max-width: 500px;
    }
  `,
  Form: styled.form`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 0;
    background: #efefef;
    padding: 10px;
    position: relative;
    @media (max-width: 500px) {
      flex-direction: column;
    }
  `,
  FormGroup: styled.div`
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
    margin: 0;
    padding: 0.5rem;

    &.file-form-group {
      min-width: 250px;
    }
    &.input-form-group {
      width: 100%;
    }
    &.submit-form-group {
    }
  `,
  Header: styled.header`
    display: flex;
    justify-content: space-between;
    background: #e2e2e2;
    padding: 5px;
    position: relative;
    padding-right: 35px;
  `,
  NoMessages: styled.div`
    display: flex;
    align-items: flex-end;
    flex: 1;
    span {
      display: inline-block;
      font-style: italic;
      color: #7b7b7b;
      font-size: 1rem;
    }

    @media (max-width: 500px) {
      padding: 2em;
    }
  `,
  Message: styled.div`
    background: #efefef;
    width: 100%;
    font-size: 12px;
    margin: 0 0 0.2rem 0;

    article {
      display: flex;
      margin: 10px 0 15px 0;
      padding: 5px;
    }

    pre,
    code {
      width: 100%;
      overflow: auto;
      white-space: pre-wrap;
      word-wrap: break-word;
    }

    img {
      object-fit: contain;
      width: 100%;
    }

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #e2e2e2;
      font-size: 0.8rem;
      position: relative;
      padding: 0.4rem 2rem 0.4rem 0.4rem;
      overflow: hidden;
    }

    header:after {
      content: "";
      display: block;
      position: absolute;
      width: 2rem;
      height: 4rem;
      background: #fff;
      right: 0;
      top: 0;
      transform: rotate(-45deg) translate(1.7rem,-1em);
    }

    footer {
      display: flex;
      font-size: 0.8rem;
      justify-content: space-between;
      align-items: center;
      background: #e2e2e2;
      padding: 0.4rem;
    }

    footer .download {
      margin-right: 10px;
    }

    footer .left {
      display: inline-flex;
      align-items: flex-start;
    }

    time {
      display: inline-flex;
      align-items: flex-end;
      font-size: 12px;
      text-align: right;
      color: #999;
    }
  `
}

interface Props {
  messages: any[]
  onSubmit: (item: any) => void
}

interface State {
  text: string
  file: any
  queuedFiles: any[]
}

class ChatForm extends Component<Props, State> {
  output: any
  fileInput: any

  constructor (props: Props) {
    super(props)

    this.state = {
      text: '',
      file: null,
      queuedFiles: []
    }

    this.output = React.createRef()
    this.fileInput = React.createRef()
  }

  componentWillReceiveProps (props: Props) {
    setTimeout(() => {
      this.scrollToLatestMessages()
    }, 0)
  }

  render () {
    let messages: any = <UI.NoMessages>
      <span>no messages</span>
    </UI.NoMessages>
    if (this.props.messages.length) {
      messages = this.props.messages.map(x => this.renderMessage(x))
    }

    return (
      <>
      <UI.OutputContainer id="output-container">
        <UI.Output
          id="output"
          ref={this.output}>
          {messages}
        </UI.Output>
        <UI.Form
          id="form"
          onSubmit={this.handleSubmit}>
          <UI.FormGroup
            className="file-form-group">
            <label>Files <small>Drag files into screen</small></label>
            <div style={{
              marginBottom: '0.5em'
            }}>
              <input
                type="file"
                multiple={true}
                id="file"
                onChange={this.handleFileInputChange}
                ref={this.fileInput} />
            </div>
            <div className="queued-files">
              {this.state.queuedFiles.map(file =>
                <Tag
                  className="file-tag"
                  key={file.name}
                  text={file.name}
                  onDelete={event => this.handleFileRemove(event, file.name)} />
              )}
            </div>
          </UI.FormGroup>
          <UI.FormGroup
            className="input-form-group"
            style={{
              width: '100%'
            }}>
            <label>Text <small>enter to submit and shift-enter for newline</small></label>
            <textarea
              id="text"
              rows={2}
              placeholder="text"
              value={this.state.text}
              onKeyPress={event => this.handleKeyPress(event)}
              onChange={event => this.setState({ text: event.target.value })} />
          </UI.FormGroup>
          <UI.FormGroup className="submit-form-group">
            <div>
              <button
                className="button"
                type="submit">
                Send</button></div>
          </UI.FormGroup>
        </UI.Form>
      </UI.OutputContainer>
      <DragAndDrop
        handleDrop={this.handleDrop} />
      </>
    )
  }

  renderMessage = (data) => {
    if (!data) {
      return null
    }
    let { mime, blob, url, ext, t } = data
    let element: any = null
    let clipboardText = url

    if (/image/gi.test(mime)) {
      element = <a
        style={{
          maxWidth: '500px'
        }}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        title="view image">
        <img src={url} alt="" />
      </a>
    } else if (/video/gi.test(mime)) {
      element = <div>
        <video src={url} controls={true} />
      </div>
    } else if (/audio/gi.test(mime)) {
      element = <audio controls={true} src={url} />
    } else if (/zip/gi.test(mime)) {
      element = <span>.zip</span>
    } else if (/pdf/gi.test(mime)) {
      element = <span>.pdf</span>
      // } else if (/(json|javascript|text)/gi.test(mime)) {
    } else {
      // if the text is just an image url
      if (/^https?:\/\/[^\s\r\n]+(png|jpe?g|svg)$/i.test(t)) {
        url = t
        clipboardText = url
        element = <div>
          <img src={url} alt="" />
        </div>
      } else {
        clipboardText = t

        element = <code>{t}</code>
      }
    }

    const filename = `${Date.now()}_${ext}`

    const timestamp = moment().format('LLLL')

    return <UI.Message key={url}>
      <UI.Header>
        <span>{blob.type} size: {prettysize(blob.size)}</span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          title="view asset">{url}↗</a>
      </UI.Header>
      <article>
        {element}
      </article>
      <footer>
        <div>
          <a
            href={url}
            download={filename}
            title="download asset"
          >download</a>
          <Clipboard
            style={{
              fontSize: '1em',
              marginLeft: '1em'
            }}
            clipboardText={clipboardText}
          />
        </div>
        <time>{timestamp}</time>
      </footer>
    </UI.Message>
  }

  handleFileUpdate = () => {
    const files = this.state.queuedFiles
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      console.log(`file:`, file, file.type)
      if (!file) return

      const reader = new FileReader()

      const readFile = (event) => {
        const arrayBuffer = reader.result
        const mime = file.type
        this.props.onSubmit([arrayBuffer, mime])
      }

      reader.addEventListener('load', readFile)
      reader.readAsArrayBuffer(file)
    }

    this.clearFilesQueue()
  }

  handleTextUpdate = () => {
    const { text } = this.state

    if (text) {
      const mime = 'text/plain'
      const blob = new Blob([text], { type: mime })
      const reader = new FileReader()

      reader.addEventListener('load', (event) => {
        const arrayBuffer = reader.result
        this.props.onSubmit([arrayBuffer, mime])
      })

      reader.readAsArrayBuffer(blob)
      this.setState({ text: '' })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()

    this.handleTextUpdate()
    this.handleFileUpdate()

    this.setState({
      text: ''
    })
  }

  handleFileInputChange = (event) => {
    event.preventDefault()

    this.addFilesToQueue(event.target.files)
  }

  handleDrop = (files) => {
    this.addFilesToQueue(files)
  }

  handleFileRemove = (event: any, filename: string) => {
    this.removeFileFromQueue(filename)
  }

  addFilesToQueue = (files) => {
    const list = this.state.queuedFiles

    for (let file of files) {
      list.push(file)
    }

    this.setState({
      queuedFiles: list
    })
  }

  clearFilesQueue = () => {
    this.setState({
      queuedFiles: []
    })

    this.fileInput.current.value = ''
  }

  removeFileFromQueue = (filename: string) => {
    const list = this.state.queuedFiles
    // eslint-disable-next-line
    for (let [i, file] of list.entries()) {
      if (file.name === filename) {
        list.splice(i, 1)
      }
    }
    this.setState({
      queuedFiles: list
    })
  }

  handleKeyPress = (event: any) => {
    if (event.key === 'Enter' && (event.shiftKey || event.ctrlKey || event.altKey)) {
      if (!event.shiftKey) {
        this.setState({
          text: this.state.text + '\n'
        })
      }
    } else if (event.key === 'Enter') {
      this.handleSubmit(event)
    }
  }

  scrollToLatestMessages = () => {
    const container = this.output.current
    if ((container.scrollTop + 200) >= (container.scrollHeight - container.clientHeight)) {
      container.scrollTo(0, container.scrollHeight)
    }
  }
}

export default ChatForm
