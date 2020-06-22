import React, { Component } from 'react'
import styled from 'styled-components'

const UI = {
  Container: styled.div`
    display; flex;
    justify-content: center;
    align-items: center;
    padding: 3rem;
    font-size: 1.4rem;
    h3 {
      font-size: 2rem;
      margin-bottom: 1rem;
      @media (max-width: 500px) {
        font-size: 1.6rem;
      }
    }
    a {
      font-weight: 500;
    }
  `
}

class NotFound extends Component {
  render () {
    return (
      <UI.Container>
        <h3>Not found</h3>
        <div>
          <a className="link" href="/">Go Home ›</a>
        </div>
      </UI.Container>
    )
  }
}

export default NotFound
