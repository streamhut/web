import React, { Component } from 'react'
import { GithubCircle, Twitter } from 'mdi-material-ui'
import moment from 'moment'
import styled from 'styled-components'

import MaxWidthContainer from 'src/components/functional/MaxWidthContainer'

const UI = {
  Footer: styled.footer`
    align-items: start;
    padding: 4em 2rem;
    width: 100%;
    font-size: 1rem;
    text-align: right;
    background: rgb(0,0,0);
    background: linear-gradient(90deg, rgba(0,0,0,1) 36%, rgba(32,48,56,1) 100%);
  `,
  Container: styled.footer`
    display: flex;
    justify-content: space-between;
    opacity: 0.5;
    @media (max-width: 500px) {
      flex-direction: column;
    }
  `,
  Copyright: styled.div`
    font-weight: bold;
    display: flex;
    align-items: center;
    color: #fff;
    @media (max-width: 500px) {
      margin-bottom: 1rem;
    }
  `,
  Social: styled.div`
    display: flex;
    align-items: center;
    vertical-align: middle;
    a {
      display: inline-flex;
      align-items: center;
      margin: 0 0 0 1rem;
      font-weight: 700;
      color: #fff;
    }
    @media (max-width: 500px) {
      flex-direction: column;
      align-items: flex-start;
      a {
        margin: 0 0 0.5rem 0;
      }
    }
  `
}

class Footer extends Component {
  render () {
    const year = moment().year()

    return (
      <UI.Footer id="footer">
        <MaxWidthContainer>
          <UI.Container>
            <UI.Copyright>
              © {year} <a href="/">
                <img
                  style={{
                    width: '100px',
                    marginLeft: '0.4rem',
                    marginBottom: '0.5rem'
                  }}
                  src="https://s3.amazonaws.com/assets.streamhut.io/streamhut_white_300x65.png"
                  alt="Streamhut" />
              </a>
            </UI.Copyright>
            <UI.Social>
              <a
                href="https://github.com/miguelmota/streamhut"
                target="_blank"
                rel="noopener noreferrer"
                title="Github @streamhut">
                <GithubCircle />
                  Github
              </a>
              <a
                href="https://twitter.com/streamhut"
                target="_blank"
                rel="noopener noreferrer"
                title="Twitter @streamhut">
                <Twitter />
                  Twitter
              </a>
            </UI.Social>
          </UI.Container>
        </MaxWidthContainer>
      </UI.Footer>
    )
  }
}

export default Footer
