import { h } from 'preact' /** @jsx h */

export default ({ variation, width, height, style, forceHeight }) => (
  <img
    className="components--silhouette"
    src={`/img/silhouette-${variation}.svg`}
    style={{ ...style, height: forceHeight }}
    {...{ width, height }}
  />
)
