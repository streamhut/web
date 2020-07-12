import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", Verdana,Geneva,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #000;
    font-size: 10px;
    line-height: 1.4;
  }

  body::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  body::-webkit-scrollbar-track {
    background: #ddd;
  }

  body::-webkit-scrollbar-thumb {
    background-color: #bbb;
    border: 1px solid #aaa;
  }

  body::-webkit-scrollbar-thumb:hover {
    background-color: #999;
    border: 1px solid #777;
  }

  #root {
    min-width: 280px;
  }

  code {
    font-family: "Source Code Pro", Menlo, Monaco, Consolas, "Courier New", monospace;
  }

  #site-container {
    margin: 0 auto;
  }

  input[type="text"],
  input[type="password"],
  input[type="file"],
  textarea {
    border-radius: 5px;
    padding: 1rem;
    font-family: Verdana,Geneva,sans-serif;
    border-width: 1px;
    border-style: solid;
    background: ${({ theme }) => (theme as any).inputBackground};
    color: ${({ theme }) => (theme as any).inputColor};
    border-color: ${({ theme }) => (theme as any).inputBorderColor};
  }

  @media (max-width: 500px) {
    input[type="color"],
    input[type="date"],
    input[type="datetime"],
    input[type="datetime-local"],
    input[type="email"],
    input[type="month"],
    input[type="number"],
    input[type="password"],
    input[type="search"],
    input[type="tel"],
    input[type="text"],
    input[type="time"],
    input[type="url"],
    input[type="week"],
    select:focus,
    textarea {
      font-size: 16px; /* minimum font-size so iOS doesn't zoom in */
    }
  }

  details:focus,
  summary:focus {
    outline: 0;
  }

  button {
    font-family: Verdana,Geneva,sans-serif;
  }

  input[type="file"] {
    width: 100%;
    padding: 1rem;
    cursor: pointer;
  }

  input[type="file"]:focus {
    outline: none;
  }

  a,
  a:hover,
  a:active,
  a:focus,
  .link,
  .link:hover,
  .link:active,
  .link:focus {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: #067df7;
    text-decoration: none;
    -webkit-appearance: none;
    background: none;
    border: none;
    outline: 0;
    cursor: pointer;
  }

  a:hover,
  .link:hover {
    text-decoration: underline;
  }

  a:focus,
  .link:focus {
    outline: 0;
  }

  a svg {
    margin-right: 0.2rem;
  }

  #form textarea,
  #form input[type="text"] {
    width: 100%;
    margin: 0 0 10px 0;
  }

  textarea:focus,
  input[type="text"]:focus {
    outline: none;
  }

  #form input[type="text"] {
    margin: 0;
  }

  #form label {
    display: block;
    margin: 0 0 10px 0;
    font-size: 16px;
  }

  #form label small {
    font-size: 0.8rem;
    color: ${({ theme }) => (theme as any).lightText};
  }

  .button,
  .button:hover
  .button:focus {
    font-family: Verdana,Geneva,sans-serif;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    -webkit-appearance: none;
    padding: 1.2rem 2rem;
    border-radius: 4px;
    outline: none;
    font-weight: 600;
    white-space: normal;
    color: #fff;
    background-color: #007aff;
    border-width: 1px;
    border-style: solid;
    border-color: #0062cc;
    line-height: 1;
    letter-spacing: 0.1rem;
    text-transform: uppercase;
    text-decoration: none;
  }

  :root .button:hover {
    background-color: #007fff;
    border-width: 1px;
    border-style: solid;
    border-color: #0062cc;
    color: #fff;
    text-decoration: none;
  }

  .button svg {
    margin-right: 0.2rem;
  }

  @media (max-width: 500px) {
    .button {
      font-size: 0.8rem;
    }
  }

  .copy {
    text-decoration: none;
    -webkit-appearance: none;
    border: none;
    background: none;
    outline: 0;
    color: #067df7;
    cursor: pointer;
  }

  .copy:hover {
    text-decoration: underline;
  }

  .copied {
    cursor: default;
  }

  .copied:hover {
    text-decoration: none;
  }

  /* sticky footer */

  #site-container {
      min-height: 100%;
      margin-bottom: -15rem;
  }

  #site-container:after {
      content:"";
      display: block;
  }

  #footer, #site-container:after {
      height: 15rem;
  }

  /* end sticky footer */

  #terminal {
    resize: vertical;
    background: #000;
  }

  .terminal {
    font-family: "Menlo", "DejaVu Sans Mono", "Lucida Console", monospace;
  }

  .terminal .xterm-viewport {
    overflow-y: auto;
  }

  .xterm-viewport::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  .xterm-viewport::-webkit-scrollbar-track {
    background: #293238;
  }

  .xterm-viewport::-webkit-scrollbar-thumb {
    background-color: #496171;
    border: 1px solid #496171;
  }

  .xterm-viewport::-webkit-scrollbar-thumb:hover {
    background-color: #54748a;
    border: 1px solid #6995b3;
  }

  .xterm.fullscreen {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: auto;
      height: auto;
      z-index: 255;
  }

  body.fullscreen {
    overflow: hidden;
  }

  body.fullscreen #terminal {
    display: block;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    min-height: 100%;
    max-height: 100%;
    z-index: 1;
    margin: 0;
  }

  .help-tooltip {
    border-radius: 10rem;
    width: 0.9rem;
    height: 0.9rem;
    border: 1px solid #6e6e6e;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.9rem;
  }

  @media (max-width: 760px) {
    #header {
      flex-direction: column;
    }

    #output .item header,
    #output .item footer {
      flex-direction: column;
    }
  }

  button:focus,
  a:focus {
    outline: 0;
  }
`
