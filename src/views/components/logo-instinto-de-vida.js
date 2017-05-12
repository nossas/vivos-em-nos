import { h } from 'preact' /** @jsx h */

export default ({ width, height }) => (
  <img
    src="/img/logo-instinto-de-vida.png"
    alt="Logo Instinto de Vida"
    {...{ width, height }}
  />
)
