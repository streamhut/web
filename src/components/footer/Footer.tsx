import React, { Component } from 'react'
import Twitter from 'mdi-material-ui/Twitter'
import GithubCircle from 'mdi-material-ui/GithubCircle'
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
    background: ${({ theme }) => (theme as any).footerBackground};
  `,
  Container: styled.footer`
    display: flex;
    justify-content: space-between;
    opacity: 0.5;
    @media (max-width: 500px) {
      flex-direction: column;
    }
  `,
  LogoImage: styled.img`
    width: 100px;
    margin-left: 0.4rem;
    margin-bottom: 0.5rem;
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
                <UI.LogoImage
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
