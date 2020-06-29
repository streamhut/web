import changeFavicon from 'src/utils/changeFavicon'

export const resetWindowTitle = () => {
  changeFavicon('https://s3.amazonaws.com/assets.streamhut.io/favicon.ico')
  document.title = 'Streamhut'
}

export const newMessageWindowTitle = () => {
  changeFavicon('https://s3.amazonaws.com/assets.streamhut.io/favicon_alert.ico')
  document.title = '(new message) Streamhut'
}

export const updateWindowTitle = () => {
  if (document.hidden) {
    newMessageWindowTitle()
  } else {
    resetWindowTitle()
  }
}

export default updateWindowTitle
