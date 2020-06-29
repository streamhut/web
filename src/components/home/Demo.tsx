import React, { Component } from 'react'
import styled from 'styled-components'

const UI = {
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

class Demo extends Component {
  render () {
    return (
      <UI.Cast>
        <div>
          <p>streamhut in action 🎬</p>
        </div>
        <div>
          <div>
            <a
            target="_blank"
            rel="noopener noreferrer"
            title="Open gif"
            href="https://s3.amazonaws.com/assets.streamhut.io/streamhut_demo_1.gif"
            ><img
              src="https://s3.amazonaws.com/assets.streamhut.io/streamhut_demo_1.gif"
              alt="screencast" /></a>
          </div>
        </div>
      </UI.Cast>
    )
  }
}

export default Demo
