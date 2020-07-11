const windowHostname = window.location.hostname

export const streamHostname = /^streamhut.(io|net|org|co|me|sh)$/gi.test(windowHostname) ? 'stream.ht'
: windowHostname
export const streamPort = 1337

export const getShareUrl = (channel: string) => {
  let protocol = window.location.protocol
  let host = window.location.host
  let pathname = `s/${channel}`
  if (host === 'streamhut.io') {
    host = 'stream.ht'
    pathname = channel
  }

  return `${protocol}//${host}/${pathname}`
}
