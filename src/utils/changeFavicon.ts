const changeFavicon = (uri: string) => {
  const link = document.createElement('link')
  const oldLink = document.getElementById('favicon')

  link.id = 'favicon'
  link.rel = 'shortcut icon'
  link.href = uri

  if (oldLink) {
    document.head.removeChild(oldLink)
  }

  document.head.appendChild(link)
}

export default changeFavicon
