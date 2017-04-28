import { h } from 'preact' /** @jsx h */

export default ({ variation, width, height, style }) => (
  <img
    className='components--silhouette'
    src={`/img/silhouette-${variation}.svg`}
    {...{ width, height, style }}
  />
)
