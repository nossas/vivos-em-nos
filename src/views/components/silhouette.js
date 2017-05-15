import { h } from 'preact' /** @jsx h */

export default ({ className, variation, width, height, style, forceHeight }) => (
  <img
    className={`components--silhouette ${className}`}
    alt={`Silhouette ${variation}`}
    src={`/img/silhouette-${variation}.svg`}
    style={{ ...style, height: forceHeight }}
    {...{ width, height }}
  />
)
