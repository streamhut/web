export const createWs = (channel: string) => {
  const { host, protocol } = window.location
  let wsurl = `${protocol === 'https:' ? `wss` : `ws`}://${host}/ws/s/${channel}`
  // let wsurl = `ws://localhost:3001/ws/s/${channel}`
  const ws = new WebSocket(wsurl)
  ws.binaryType = 'arraybuffer'

  return ws
}
