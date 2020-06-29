const getUrlParams = () => {
  return window.location.search.substr(1).split('&')
    .map(x => x.split('='))
    .reduce((obj, x) => {
      obj[x[0]] = x[1]
      return obj
    }, {})
}

export default getUrlParams
