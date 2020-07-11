import React, { Component } from 'react'
import styled from 'styled-components'

const UI = {
  SelfHost: styled.div`
    display: flex;
    background: #293238;
    justify-content: center;
    flex-direction: column;
    padding: 5rem 2rem;
    text-align: center;
    color: #fff;
    font-size: 1.5rem;
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
  `
}

class SelfHost extends Component {
  render () {
    return (
      <UI.SelfHost id="self-host">
        <h3>Self-hosted option? Absolutely <span role="img" aria-label="">✅</span></h3>
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
    )
  }
}

export default SelfHost
