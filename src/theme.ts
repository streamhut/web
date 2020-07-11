import { DefaultTheme } from 'styled-components'

export const lightTheme: DefaultTheme = {
  text: '#000',
  lightText: 'rgba(0, 0, 0, 0.5)',
  headerBackground: '#efefef',
  headerColor: '#000',
  headerLogoFilter: 'grayscale(0)',
  noticeBackground: '#dededa',
  noticeColor: '#000',
  footerBackground: 'linear-gradient(90deg, rgba(0,0,0,1) 36%, rgba(32,48,56,1) 100%)',
  inputBackground: '#fff',
  inputBorderColor: '#e0e0e0',
  inputBorderColorHover: '#ccc',
  inputColor: '#000',
  outputBackground: '#fff',
  chatFormBackground: '#efefef',
  chatMessageBackground: '#efefef',
  chatMessageHeaderBackground: '#e2e2e2',
  chatMessageFooterBackground: '#e2e2e2',
  resizerBackground: '#efefef',
  resizerBackgroundHover: '#e6e6e6',
  resizerBorderColor: '#cacaca',
  resizerBorderColorHover: '#adadad'
}

export const darkTheme: DefaultTheme = {
  text: 'rgba(255, 255, 255, 0.8)',
  lightText: 'rgba(255, 255, 255, 0.5)',
  headerBackground: 'linear-gradient(90deg, rgba(0,0,0,1) 36%, rgba(32,48,56,1) 100%)',
  headerColor: 'rgba(255, 255, 255, 0.8)',
  headerLogoFilter: 'grayscale(1) invert(1)',
  noticeBackground: '#141c20',
  noticeColor: 'rgba(255, 255, 255, 0.5)',
  footerBackground: '#000',
  inputBackground: '#292f46cf',
  inputBorderColor: '#000',
  inputBorderColorHover: '#333',
  inputColor: '#fff',
  outputBackground: '#2f3d44',
  chatFormBackground: '#16171e',
  chatMessageBackground: '#121317',
  chatMessageHeaderBackground: '#16171e',
  chatMessageFooterBackground: '#16171e',
  resizerBackground: '#16171e',
  resizerBackgroundHover: '#191a22',
  resizerBorderColor: '#272933',
  resizerBorderColorHover: '#313340'
}
