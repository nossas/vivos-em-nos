import { h } from 'preact' /** @jsx h */

export default ({ source, width, height }) => (
  <div
    className='components--memory-image'
    style={{ backgroundImage: `url(${source})`, width, height }}
  />
)
