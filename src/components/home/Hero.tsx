import React, { Component } from 'react'
import styled from 'styled-components'

const UI = {
  Hero: styled.div`
    background: #fff;
    text-align: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 6rem 3rem;
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
        max-width: 320px;
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
  `
}

class Hero extends Component {
  render () {
    return (
      <UI.Hero id="home">
        <UI.HeroImage>
          <h1>
            <a href="/"><img src="https://s3.amazonaws.com/assets.streamhut.io/streamhut_color_700x150.png" alt="Streamhut" /></a>
          </h1>
        </UI.HeroImage>
        <UI.Tagline>
          <span role="img" aria-label="">💻</span> stream your terminal
        </UI.Tagline>
        <UI.SubTagline>
          Share your terminal in real-time with anyone — without installing anything <span role="img" aria-label="">🚀</span>
        </UI.SubTagline>
      </UI.Hero>
    )
  }
}

export default Hero
