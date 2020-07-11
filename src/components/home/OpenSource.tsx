import React, { Component } from 'react'
import styled from 'styled-components'
import GithubIcon from 'mdi-material-ui/GithubCircle'

const UI = {
  OpenSource: styled.div`
    display: flex;
    background: #fff;
    justify-content: center;
    flex-direction: column;
    padding: 5rem 2rem;
    text-align: center;
    font-size: 1.2rem;
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
  `
}

class OpenSource extends Component {
  render () {
    return (
      <UI.OpenSource id="github">
        <h3><span role="img" aria-label="">💖</span> Open Source</h3>
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
    )
  }
}

export default OpenSource
