import { h } from 'preact' /** @jsx h */
import { Header, LayoutDefault } from '../tags/layout'
import {
  TopBar,
  MemoryImage,
  MemorySummary,
  Silhouette,
  Quote,
  SectionPrimary,
  SectionHeader,
} from '../components'
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
        <div className="gallery">
          {memory.gallery && memory.gallery.map(image => (
            <img src={image} />
          ))}
        </div>
      </section>

      <SectionPrimary
        className="section--share"
        header={<SectionHeader title="Compartilhe" hideBorder />}
      >
        <img src="/img/share-facebook.svg" width="51" />
        <img src="/img/share-twitter.svg" width="51" />
        <img src="/img/share-whatsapp.svg" width="51" />
      </SectionPrimary>

      <SectionPrimary
        className="section--known-victim"
        header={
          <SectionHeader
            title="Se você conheceu essa pessoa"
            subtitle="use este espaço para contar o que está vivo em você sobre ela."
          />
        }
      >
        === comment form ===
      </SectionPrimary>
    </div>
  </LayoutDefault>
)
