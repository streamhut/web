import React, { Component } from 'react'
import styled from 'styled-components'
import GithubIcon from 'mdi-material-ui/GithubCircle'
import MaxWidthContainer from 'src/components/functional/MaxWidthContainer'
import SubscribeForm from './SubscribeForm'

const UI = {
  Main: styled.div`
    background: #efefef;
  `,
  Hero: styled.div`
    background: #fff;
    text-align: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 6rem 3rem;
    @media (max-width: 500px) {
      padding: 3rem 1rem;
    }
  `,
  HeroImage: styled.div`
    display: block;
    margin-bottom: 2rem;
    h1 {
      display: inline-block;
    }
    a {
      display: inline-block;
    }
    img {
      width: 100%;
      max-width: 500px;
      height: auto;
      @media (max-width: 500px) {
        max-width: 200px;
      }
    }
  `,
  Tagline: styled.h2`
    font-size: 1.8rem;
    margin-bottom: 1rem;
    font-weight: 700;
    @media (max-width: 500px) {
      font-size: 1.6rem;
    }
  `,
  SubTagline: styled.div`
    font-size: 1.2rem;
    @media (max-width: 500px) {
      font-size: 1rem;
    }
  `,
  Container: styled.div`
    display: flex;
  `,
  Example: styled.div`
    display: flex;
    background: #293238;
    justify-content: center;
    flex-direction: column;
    padding: 5rem 2rem;
    text-align: center;
    small {
      display: block;
      color: rgba(255,255,255,0.5);
      font-size: 1rem;
      margin: 0 auto;
      max-width: 345px;
    }
    @media (max-width: 500px) {
      padding: 3rem 1rem;
      small {
        max-width: 100%;
      }
    }
    h3 {
      color: #fff;
      font-size: 1.4rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }
    div {
      text-align: center;
      background: #151d21;
      padding: 2rem;
      border-radius: 4px;
      border: 1px solid #34434a;
      margin: 0 auto 1rem auto;
      @media (max-width: 500px) {
        padding: 1rem;
        border-radius: 0.4rem;
      }
    }
    pre {
      color: #fff;
      font-size: 1.3rem;
      white-space: pre-wrap;
      text-align: left;
      @media (max-width: 500px) {
        font-size: 0.8rem;
      }
    }
  `,
  Example2: styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 2rem;
    text-align: center;
    @media (max-width: 500px) {
      padding: 3rem 1rem;
    }
    p {
      font-size: 1rem;
      margin-bottom: 0.2rem;
    }
    small {
      display: block;
      margin-bottom: 1rem;
      color: rgba(0,0,0,0.5);
      font-size: 0.9rem;
    }
    div {
      text-align: center;
      background: #e1e1e1;
      padding: 1rem;
      border-radius: 4px;
      border: 1px solid #d7d7d7;
      margin: 0 auto;
      color: #151c20;
      @media (max-width: 500px) {
        padding: 1rem;
        border-radius: 0.4rem;
      }
    }
    pre {
      color: #151c20;
      font-size: 0.8rem;
      white-space: pre-wrap;
      text-align: left;
      @media (max-width: 500px) {
        font-size: 0.7rem;
      }
    }
  `,
  UseCases: styled.div`
    display: flex;
    background: #fff;
    justify-content: center;
    flex-direction: column;
    padding: 8rem 2rem 5rem 2rem;
    font-size: 1.2rem;
    background: #fff;
    @media (max-width: 900px) {
      padding-top: 5rem;
    }
    h3 {
      font-size: 1.8rem;
      font-weight: 700;
      width: 500px;
      margin-bottom: 1rem;
    }
    p {
      font-size: 1.2rem;
      font-weight: 500;
      width: 300px;
      margin-bottom: 1rem;
    }
    ul {
      min-width: 380px;
      display: inline-block;
      list-style-position: inside;
      margin-bottom: 1rem;
    }
    li {
      margin-bottom: 0.8rem;
    }
    div {
      max-width: 380px;
      margin: 0 auto;
    }
    small {
      max-width: 380px;
      margin: 0 auto;
      font-size: 0.9rem;
      p {
        margin-bottom: 1rem;
        font-weight: normal;
      }
      ul {
        margin-bottom: 1rem;
      }
    }
    @media (max-width: 500px) {
      font-size: 1rem;
      h3 {
        width: auto;
      }
      p {
        width: auto;
      }
      ul {
        min-width: 0;
      }
    }
  `,
  SelfHost: styled.div`
    display: flex;
    background: #293238;
    justify-content: center;
    flex-direction: column;
    padding: 5rem 2rem;
    text-align: center;
    color: #fff;
    font-size: 1.5rem;
    @media (max-width: 500px) {
      padding: 3rem 1rem;
    }
    h3 {
      font-size: 1.8rem;
      font-weight: 700;
      margin-bottom: 0.4rem;
    }
    small {
      display: block;
      margin-bottom: 1.4rem;
      color: rgba(255,255,255,0.5);
    }
    div {
      text-align: center;
      background: #151d21;
      padding: 1rem;
      border-radius: 4px;
      border: 1px solid #34434a;
      margin: 0 auto 1rem auto;
      color: #151c20;
      @media (max-width: 500px) {
        padding: 1rem;
        border-radius: 0.4rem;
      }
    }
    pre {
      color: #fff;
      font-size: 0.9rem;
      white-space: pre-wrap;
      text-align: left;
      @media (max-width: 500px) {
        font-size: 0.7rem;
      }
    }
    p {
      font-size: 1rem;
      color: rgba(255,255,255,0.5);
    }
  `,
  OpenSource: styled.div`
    display: flex;
    background: #fff;
    justify-content: center;
    flex-direction: column;
    padding: 5rem 2rem;
    text-align: center;
    font-size: 1.2rem;
    @media (max-width: 500px) {
      font-size: 1rem;
    }
    h3 {
      font-size: 1.8rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }
    p {
      display: block;
      margin-bottom: 2rem;
      font-size: 1.2rem;
      color: rgba(0,0,0,0.8);
    }
    a {
      font-size: 1.6em;
      font-weight: 700;
    }
  `,
  Subscribe: styled.div`
    display: flex;
    background: #fff;
    justify-content: center;
    flex-direction: column;
    padding: 5rem 2rem;
    text-align: center;
    font-size: 1.2rem;
    background: #fff url('https://s3.amazonaws.com/assets.streamhut.io/background-pattern-round.png') repeat 0 0;
    border-top: 1px solid #f4f4f5;
    @media (max-width: 500px) {
      font-size: 1rem;
    }
    h3 {
      font-size: 1.8rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }
    p {
      display: block;
      margin-bottom: 2.5rem;
      color: rgba(0,0,0,0.8);
    }
  `,
  Cast: styled.div`
    background: #0e172a;
    justify-content: center;
    flex-direction: column;
    div div {
      max-width: 900px;
      margin: 0 auto;
    }
    p {
      max-width: 900px;
      font-size: 1.4rem;
      color: #fff;
      margin: 0 auto;
      padding: 0.5rem;
      background: rgb(29,82,107);
      background: linear-gradient(90deg, rgba(29,82,107,1) 0%, rgba(14,23,42,1) 65%);
    }
    img {
      width: 100%;
      transform: scale(1.1) translate(2.4rem, 1.3rem);
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
      @media (max-width: 900px) {
        transform: scale(1) translate(0, 0);
      }
    }
  `
}

interface Props {
}

interface State {
  hostname: string
  port: number
}

class Home extends Component<Props, State> {
  constructor (props) {
    super(props)
    this.state = {
      hostname: window.location.hostname,
      port: 1337
    }
  }

  render () {
    return (
      <UI.Main id="site-container">
        <UI.Hero id="home">
          <UI.HeroImage>
            <h1>
              <a href="/"><img src="https://s3.amazonaws.com/assets.streamhut.io/streamhut_color_700x150.png" alt="Streamhut" /></a>
            </h1>
          </UI.HeroImage>
          <UI.Tagline>
              💻 stream your terminal
          </UI.Tagline>
          <UI.SubTagline>
            Share your terminal in real-time with anyone — without installing anything 🚀
          </UI.SubTagline>
        </UI.Hero>
        <UI.Example id="example">
          <h3>
              To get started, run in your terminal:
          </h3>
          <div>
            <pre>
                exec {'>'} {'>'}(nc {this.state.hostname} {this.state.port}) 2{'>'}&amp;1
            </pre>
          </div>
          <small>
            The command pipes the output of the shell to streamhut and provides a url to share
          </small>
        </UI.Example>
        <UI.Example2 id="example2">
          <p>
              Don't have netcat installed? No problem
          </p>
          <small>
              Pipe to a file descriptor with an open TCP connection
          </small>
          <div>
            <pre>
                exec 3{'<'}{'>'}/dev/tcp/{this.state.hostname}/{this.state.port} &amp;&amp; head -1 &lt;&amp;3 &amp;&amp; exec &amp;&gt; &gt;(tee {'>'}(cat &gt;&amp;3))
            </pre>
          </div>
          <pre />
        </UI.Example2>
        <UI.Cast>
          <div>
            <p>streamhut in action 🎬</p>
          </div>
          <div>
            <div>
              <img
                src="https://s3.amazonaws.com/assets.streamhut.io/streamhut_demo_1.gif"
                alt="screencast" />
            </div>
          </div>
        </UI.Cast>
        <UI.UseCases id="use-cases">
          <div>
            <h3>Use cases for streamhut:</h3>
            <ul>
              <li>🐛 Debug logs withs colleagues</li>
              <li>👥 Help a friend with programming</li>
              <li>🤝 Live terminal sessions for interviews</li>
            </ul>
          </div>

          <small>
            <p>As well as:</p>
            <ul>
              <li>💬 Pseudo-anonymous communication</li>
              <li>📱 Transfer content and files between devices</li>
            </ul>
          </small>
        </UI.UseCases>
        <UI.SelfHost id="self-host">
          <h3>Self-hosted option? Absolutely ✅</h3>
          <small>
              Run streamhut as a Docker container
          </small>
          <div>
            <pre>
                docker run -p 8080:8080 -p 1337:1337 streamhut/streamhut
            </pre>
          </div>
          <p>Check out the <a
          target="_blank"
          rel="noopener noreferrer"
          title="Github @streamhut"
          href="https://github.com/miguelmota/streamhut">
            documentation
          </a> for more examples</p>
        </UI.SelfHost>
        <UI.OpenSource id="github">
          <h3>💖 Open Source</h3>
          <p>streamhut source code is available on github</p>
          <div>
            <a
              className="link"
              href="https://github.com/streamhut/streamhut"
              target="_blank"
              rel="noopener noreferrer"
              title="Github @streamhut">
              <GithubIcon fontSize="large"/> Github</a>
          </div>
        </UI.OpenSource>
        <UI.Subscribe id="subscribe">
          <h3>Join the mailing list</h3>
          <p>Subscribe to get notified of latest updates on news and features</p>
          <SubscribeForm />
        </UI.Subscribe>
        <MaxWidthContainer>
          <UI.Container/>
        </MaxWidthContainer>
      </UI.Main>
    )
  }
}

export default Home
