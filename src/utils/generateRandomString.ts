import randomstring from 'randomstring'

const generateRandomString = () => {
  return randomstring.generate({
    length: 3,
    charset: 'alphabetic',
    capitalization: 'lowercase',
    readable: true
  })
}

export default generateRandomString
