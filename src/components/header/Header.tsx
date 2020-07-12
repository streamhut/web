import React, { Component } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import styled from 'styled-components'
import ClipboardJS from 'clipboard'
import LightModeIcon from 'mdi-material-ui/Brightness7'
import DarkModeIcon from 'mdi-material-ui/Brightness4'

import ThemeContext from 'src/themeContext'
import Clipboard from 'src/components/functional/Clipboard'
import HelpTooltip from 'src/components/functional/HelpTooltip'
import MaxWidthContainer from 'src/components/functional/MaxWidthContainer'
import { streamHostname, streamPort } from 'src/config'

const UI = {
  Header: styled.header`
    margin: 0;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    background: ${({ theme }) => (theme as any).headerBackground};
    box-shadow: 0 1px 10px rgba(151,164,175,.1);
    @media (max-width: 500px) {
      display: block;
    }
  `,
  HeaderGroup: styled.hgroup`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    @media (max-width: 500px) {
      display: block;
    }
  `,
  Title: styled.h1`
    font-size: 2rem;
    font-weight: normal;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media (max-width: 500px) {
      display: block;
      margin-bottom: 0.5rem;
      align-items: flex-start;
      .tooltip {
        display: none;
      }
    }
  `,
  LogoImage: styled.img`
    width: 150px;
    height: auto;
    filter: ${({ theme }) => (theme as any).headerLogoFilter};
  `,
  LightModeIcon: styled(LightModeIcon)`
    color: rgba(255, 255, 255, 0.8)
  `,
  DarkModeIcon: styled(DarkModeIcon)`
    color: rgba(0, 0, 0, 0.8)
  `,
  UL: styled.ul`
    list-style: none;
    padding-bottom: 0.8rem;
  `,
  LI: styled.li`
    margin-bottom: 0.3rem;
  `,
  Channel: styled.div`
    width: 100%;
    margin-left: 2rem;
    max-width: 17rem;
    a {
      font-size: 0.8rem;
    }
    label {
      font-size: 0.8rem;
      margin-right: 0.4rem;
      display: block;
      font-size: 0.7rem;
      color: ${({ theme }) => (theme as any).headerColor};
      display: flex;
      align-items: center;
    }
    .tooltip {
      margin-left: 0.2rem;
    }
    small {
      margin-left: 2rem;
      color: rgba(0,0,0,0.5);
    }
    @media (max-width: 720px) {
      max-width: 100%;
    }
    @media (max-width: 500px) {
      margin-left: 0;
      display: inline-block;
      width: auto;
      float: left;
      min-width: 220px;
    }
  `,
  ShareUrlInput: styled.input`
    &[type="text"] {
      width: 180px;
      margin-right: 0.5rem;
      font-size: 0.7rem;
      border-radius: 2px;
      padding: 0.5rem;
      border-width: 1px;
      border-style: solid;
      background: ${({ theme }) => (theme as any).inputBackground};
      color: ${({ theme }) => (theme as any).inputColor};
      border-color: ${({ theme }) => (theme as any).inputBorderColor};
    }
    &:hover {
      border-color: ${({ theme }) => (theme as any).inputBorderColorHover};
      cursor: pointer;
    }
    @media (max-width: 500px) {
      max-width: 300px;
      float: left;
    }
  `,
  Examples: styled.div`
    display: flex;
    width: 100%;
    padding: 0.5rem 0.5rem 0.5rem 2rem;
    font-size: 0.8rem;
    color: ${({ theme }) => (theme as any).headerColor};
    line-height: 1.4;
    label {
      display: inline-block;
      width: 60px;
      font-weight: 600;
      text-align: right;
      padding-right: 0.5rem;
      font-size: 0.8rem;
      color: ${({ theme }) => (theme as any).headerColor};
      @media (max-width: 780px) {
        width: auto;
      }
    }
    code {
      background: #405a6b;
      color: white;
      padding: 0.4rem;
      border-radius: 2px;
      display: inline-block;
      width: 280px;
      @media (max-width: 780px) {
        width: auto;
      }
    }
    details {
      display: block;
      button {
        font-size: 1rem;
      }
      &[open] {
        summary div {
          display: inline-block;
        }
        summary:hover span {
          text-decoration: none;
        }
      }
    }
    summary {
      font-size: 1.2rem;
      cursor: pointer;
      margin-bottom: 0.5rem;
      color: ${({ theme }) => (theme as any).headerColor};
      span {
        display: inline-block;
      }
      div {
        display: none;
        float: right;
        font-size: 1rem;
      }
      button {
        font-size: 0.8rem;
      }
      &:hover span {
        text-decoration: underline;
      }
    }
    @media (max-width: 720px) {
      display: none;
    }
  `,
  Settings: styled.div`
    @media (max-width: 500px) {
      float: right;
    }
  `,
  Notice: styled.div`
    font-size: 0.7rem;
    background: ${({ theme }) => (theme as any).noticeBackground};
    color: ${({ theme }) => (theme as any).noticeColor};
    padding: 0.1rem;
  `,
  HelperText: styled.div`
    font-size: 0.8rem;
    color: ${({ theme }) => (theme as any).headerColor};
  `,
  TooltipListContainer: styled.div`
    padding: 0.5rem;
  `,
  Clear: styled.div`
    clear: both;
  `
}

interface Props {
  shareUrl: string
}

interface State {
  hostname: string
  port: number
  showExampleWithChannel: boolean
  channel: string
}

class Header extends Component<Props, State> {
  shareUrl: any
  copyHelpText: any

  constructor (props: Props) {
    super(props)

    this.state = {
      hostname: streamHostname,
      port: streamPort,
      showExampleWithChannel: true,
      channel: window.location.pathname.substr(3)
    }

    this.shareUrl = React.createRef()
    this.copyHelpText = React.createRef()
  }

  componentDidMount () {
    new ClipboardJS(this.shareUrl.current, {
      text: (trigger: any) => {
        return this.shareUrl.current.value
      }
    })
      .on('success', () => {
        const target = this.copyHelpText.current
        const text = target.textContent
        target.textContent = 'copied!'

        setTimeout(() => {
          target.textContent = text
        }, 3e3)
      })
  }

  shareUrlHandler (event: any) {
    event.currentTarget.select()
  }

  selectCode (event: any) {
    (window as any).getSelection().selectAllChildren(event.currentTarget)
  }

  toggleExampleWithChannel (event: any) {
    event.preventDefault(event)
    this.setState({
      showExampleWithChannel: !this.state.showExampleWithChannel
    })
  }

  render () {
    return (
      <ThemeContext.Consumer>
        {theme =>
        <UI.Header id="header">
          <MaxWidthContainer>
            <UI.HeaderGroup>
              <UI.Title>
                <a
                  href="/"
                  title="Home">
                  <UI.LogoImage
                    src="https://s3.amazonaws.com/assets.streamhut.io/streamhut_color_300x65.png"
                    alt="Streamhut" />
                </a>

                <Tooltip
                  className="tooltip"
                  title={
                    <UI.TooltipListContainer>
                      <ul>
                        <li>Stream your terminal to anyone without installing anything.</li>
                        <li>Quickly share data and files between devices.</li>
                        <li>URL path names map to channels.</li>
                        <li>Anyone in the same channel can view what's streamed.</li>
                      </ul>
                    </UI.TooltipListContainer>
                  }
                >
                  <UI.HelperText>What is this?</UI.HelperText>
                </Tooltip>

              </UI.Title>
              <UI.Channel>
                <label>Channel URL
                  <HelpTooltip
                    text="Share this URL with others to join and see your stream and messages"
                    iconStyle={{
                      fontSize: '0.6rem',
                      marginLeft: '0.2rem'
                    }} />
                  <small
                    ref={this.copyHelpText}
                  >click to copy</small>
                </label>
                <UI.ShareUrlInput
                  type="text"
                  placeholder="share url"
                  readOnly={true}
                  ref={this.shareUrl}
                  value={this.props.shareUrl}
                  onClick={event => this.shareUrlHandler(event)} />
                <Clipboard
                  clipboardText={this.props.shareUrl} />
              </UI.Channel>

              <UI.Examples>
                <div>

                  <details className={this.state.showExampleWithChannel ? 'random' : ''}>
                    <summary>
                      <span>CLI examples</span>
                      <div>
                        <button
                          className="link"
                          onClick={event => this.toggleExampleWithChannel(event)}>
                          {this.state.showExampleWithChannel ? 'using random channel' : 'using specific channel'}
                        </button>
                      </div>
                    </summary>
                    <UI.UL>
                      <UI.LI>
                        <label>Tail:</label>
                        {this.state.showExampleWithChannel
                          ? <code
                            onClick={event => this.selectCode(event)}
                          >nc {this.state.hostname} {this.state.port} &lt; &lt;(echo \#{this.state.channel}; tail -F data.log)</code>
                          : <code
                            onClick={event => this.selectCode(event)}
                          >tail -F file.log | nc {this.state.hostname} {this.state.port}</code>}
                      </UI.LI>
                      <UI.LI>
                        <label>Tee</label>
                        {this.state.showExampleWithChannel
                          ? <code
                            onClick={event => this.selectCode(event)}
                          >(echo \#{this.state.channel}; htop) | tee {'>'}(nc {this.state.hostname} {this.state.port})</code>
                          : <code
                            onClick={event => this.selectCode(event)}
                          >(sleep 5; htop) | tee {'>'}(nc {this.state.hostname} {this.state.port})</code>}
                      </UI.LI>
                      <UI.LI>
                        <label>Pipe shell:</label>
                        {this.state.showExampleWithChannel
                          ? <code
                            onClick={event => this.selectCode(event)}
                          >exec {'>'} {'>'}(nc {this.state.hostname} {this.state.port}) 2{'>'}&1;echo \#{this.state.channel}</code>
                          : <code
                            onClick={event => this.selectCode(event)}
                          >exec {'>'} {'>'}(nc {this.state.hostname} {this.state.port}) 2{'>'}&1</code>}
                      </UI.LI>
                    </UI.UL>
                  </details>
                  <div>
                    <a href="https://github.com/miguelmota/streamhut"
                      target="_blank"
                      rel="noopener noreferrer">Developer documentation</a>
                    <span> | </span>
                    <a
                      href="https://github.com/miguelmota/streamhut/issues/1"
                      target="_blank"
                      rel="noopener noreferrer">Feedback</a>
                  </div>
                </div>
              </UI.Examples>
              <UI.Settings>
                <IconButton onClick={theme.toggle}>
                  {theme.dark ? <UI.LightModeIcon /> : <UI.DarkModeIcon />}
                </IconButton>
              </UI.Settings>
            <UI.Clear />
            </UI.HeaderGroup>
          </MaxWidthContainer>
          <UI.Notice>
            <MaxWidthContainer>
              <strong>⚠️ Notice:</strong> streamhut is alpha quality and storage might be reset on streamhut.io. Use at your risk. <a
                href="/#subscribe"
                target="_blank"
                rel="noopener noreferrer"
                title="subscribe"
              >Subscribe</a> to get news and updates.
            </MaxWidthContainer>
          </UI.Notice>
        </UI.Header>
      }
      </ThemeContext.Consumer>
    )
  }
}

export default Header
