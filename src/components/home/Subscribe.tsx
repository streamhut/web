import React, { Component } from 'react'
import styled from 'styled-components'
import SubscribeForm from './SubscribeForm'

const UI = {
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
  `
}

class OpenSource extends Component {
  render () {
    return (
      <UI.Subscribe id="subscribe">
        <h3>Join the mailing list</h3>
        <p>Subscribe to get notified of latest updates on news and features</p>
        <SubscribeForm />
      </UI.Subscribe>
    )
  }
}

export default OpenSource
