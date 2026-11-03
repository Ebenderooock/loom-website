import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import { getPage, pages, renderPageHead, siteOrigin } from './site'

export const paths = pages.map(page => page.path)
export { siteOrigin }

export function render(pathname: string) {
  const page = getPage(pathname)
  return {
    html: renderToString(<StrictMode><App pathname={pathname} /></StrictMode>),
    head: renderPageHead(page),
  }
}
