import React, { useState, useLayoutEffect } from 'react'

const ThemeContext = React.createContext({
  dark: false,
  toggle: () => {}
})

export default ThemeContext

export function ThemeContextProvider (props: any) {
  const [dark, setDark] = useState(false)

  // paints the app before it renders elements
  useLayoutEffect(() => {
    const lastTheme = localStorage.getItem('darkTheme')

    if (lastTheme === 'true') {
      setDark(true)
    } else {
      setDark(false)
    }
  // if state changes, repaints the app
  }, [dark])

  const toggle = () => {
    setDark(!dark)
    localStorage.setItem('darkTheme', `${!dark}`)
  }

  return (
    <ThemeContext.Provider value={{
      dark,
      toggle
    }}>
    {props.children}
    </ThemeContext.Provider>
  )
}
