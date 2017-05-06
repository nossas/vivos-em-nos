import { h } from 'preact' /** @jsx h */
import { ParagraphLineRounded } from '../../views/components'

export default ({
  name,
  owner,
  birthYear,
  deathYear,
  description,
  image,
  imageWidth,
  imageHeight,
  imageAlignment,
  baseFontSize,
  distanceY,
  distanceX,
  width,
}) => (
  <div className="components--memory-summary">
    <div
      className="image"
      style={{
        backgroundImage: `url(${image})`,
        width: imageWidth,
        height: imageHeight,
        right: imageAlignment === 'right' ? 0 : undefined,
        left: imageAlignment === 'left' ? 0 : undefined,
      }}
    />
    <div
      className="summary"
      style={{
        fontSize: baseFontSize,
        paddingTop: distanceY,
        marginLeft: distanceX,
        width,
      }}
    >
      <div className="memory-identity">
        <div className="name">{name}</div>
        <span className="lifetime">{birthYear} / {deathYear}</span>
        <div className="owner">
          Homenagem criada por: {owner}
        </div>
      </div>
      <div className="memory-description">
        <ParagraphLineRounded>
          {description}
        </ParagraphLineRounded>
      </div>
    </div>
  </div>
)
