import { h } from 'preact' /** @jsx h */
import { FormattedMessage } from 'react-intl'
import { ParagraphLineRounded } from '~src/views/components'

export default ({
  name,
  owner,
  birthYear,
  deathYear,
  description,
  image,
  imageWidth,
  imageHeight,
  imageAlignmentRight,
  imageAlignmentLeft,
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
        right: imageAlignmentRight,
        left: imageAlignmentLeft,
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
          <FormattedMessage
            id="components--memory-summary.memory-created-by"
            defaultMessage="Homenagem criada por: {owner}"
            values={{ owner }}
          />
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
