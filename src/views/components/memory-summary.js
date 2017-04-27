import { h } from 'preact' /** @jsx h */

export default ({ name, birthYear, deathYear, description }) => (
  <div className='components--memory-summary'>
    <div className='memory-identity'>
      <div className='name'>{name}</div>
      <span className='lifetime'>{birthYear} / {deathYear}</span>
    </div>
    <div className='memory-description'>
      <span>{description}</span>
    </div>
  </div>
)
