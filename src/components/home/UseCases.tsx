import React, { Component } from 'react'
import styled from 'styled-components'

const UI = {
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
  `
}

class UseCases extends Component {
  render () {
    return (
      <UI.UseCases id="use-cases">
        <div>
          <h3>Use cases for streamhut:</h3>
          <ul>
            <li><span role="img" aria-label="">🐛</span> Debug logs withs colleagues</li>
            <li><span role="img" aria-label="">👥</span> Help a friend with programming</li>
            <li><span role="img" aria-label="">🤝</span> Live terminal sessions for interviews</li>
          </ul>
        </div>

        <small>
          <p>As well as:</p>
          <ul>
            <li><span role="img" aria-label="">💬</span> Pseudo-anonymous communication</li>
            <li><span role="img" aria-label="">📱</span> Transfer content and files between devices</li>
          </ul>
        </small>
      </UI.UseCases>
    )
  }
}

export default UseCases
