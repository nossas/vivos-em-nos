import { h } from 'preact' /** @jsx h */
import { Header, LayoutDefault } from '../tags/layout'
import { TopBar, MemoryImage, MemorySummary, Silhouette, Quote } from '../components'
import * as mocks from '../../__tmp/mocks'

const memory = mocks.memories[1]

export default () => (
  <LayoutDefault>
    <Header>
      <TopBar />
    </Header>

    <div className="page pages--memory-victim">
      <section className="section--victim-data">
        <MemoryImage
          source={memory.image}
          width="223px"
          height="179px"
        />
        <MemorySummary
          name={memory.name}
          birthYear={memory.birthYear}
          deathYear={memory.deathYear}
          description={memory.description}
        />
      </section>

      <section className="section--quote">
        <Silhouette variation="big-blue" height="594" />
        <div className="title">GARRA</div>
        <Quote>
          {memory.quote}
        </Quote>
        <div className='gallery'>
          {memory.gallery && memory.gallery.map(image => (
            <img src={image} />
          ))}
        </div>
      </section>
    </div>
  </LayoutDefault>
)
