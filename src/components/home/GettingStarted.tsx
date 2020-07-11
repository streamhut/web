import React, { Component } from 'react'
import styled from 'styled-components'

const UI = {
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
  `
}

interface Props {
  hostname: string
  port: number
}

class GettingStarted extends Component<Props> {
  render () {
    const { hostname, port } = this.props

    return (
      <>
        <UI.Example id="example">
          <h3>
              To get started, run in your terminal:
          </h3>
          <div>
            <pre>
              {`exec &> >(nc ${hostname} ${port})`}
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
              {`exec 3<>/dev/tcp/${hostname}/${port} && head -1 <&3 && exec &> >(tee >(cat >&3))`}
            </pre>
          </div>
          <pre />
        </UI.Example2>
      </>
    )
  }
}

export default GettingStarted
