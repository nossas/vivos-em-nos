import { h } from 'preact' /** @jsx h */

export default ({ list, currentIndex }) => (
  <div>
    <div className="memory-carousel-navigator">
      {list.map((item, index) => {
        const active = index === currentIndex ? 'active' : ''
        return (
          <div className={`carousel-item ${active}`} />
        )
      })}
    </div>
  </div>
)
