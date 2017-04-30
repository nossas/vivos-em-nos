import { h } from 'preact' /** @jsx h */
import { Header, LayoutDefault } from '../../../views/layout/layout'
import {
  MemoryImage,
  MemorySummary,
  OrnamentPageFooter,
  Quote,
  SectionHeader,
  SectionPrimary,
  ShareFacebookButton,
  ShareTwitterButton,
  Silhouette,
  TopBar,
} from '../../../views/components'
import * as mocks from '../../../__tmp/mocks'

const _memory = mocks.memories[1]

export default ({ memory, loading }) => (
  <LayoutDefault>
    <Header>
      <TopBar />
    </Header>

    {loading ? <div /> : (
      <div className="page pages--memory-victim">
        <section className="section--victim-data">
          <MemoryImage
            source={memory.victimPhoto}
            width="223px"
            height="179px"
          />
          <MemorySummary
            name={memory.victimName}
            birthYear={memory.victimBornAt}
            deathYear={memory.victimDeadAt}
            description={memory.victimHistory}
          />
        </section>

        <section className="section--quote">
          <Silhouette variation={memory.victimSilhouette} height="594" />
          <div className="title">
            {memory.victimGoodWords}
          </div>
          <Quote>
            {memory.victimRememberText}
          </Quote>
          <div className="gallery">
            {_memory.gallery && _memory.gallery.map(image => (
              <img src={image} />
            ))}
          </div>
        </section>

        <SectionPrimary
          className="section--share"
          header={<SectionHeader title="Compartilhe" hideBorder />}
        >
          <ShareFacebookButton
            className="share-button"
            href="http://vivosemnos.org/"
          />
          <ShareTwitterButton
            className="share-button"
            href="http://vivosemnos.org/"
            text={
              '#VivosEmNós quer usar a memória como ferramenta para mudança. Se você conhece ' +
              'alguém que teve a sua história interrompida pela violência, crie aqui uma página ' +
              'de homenagem para se juntar à luta por mais respeito à vida.'
            }
          />
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

        <OrnamentPageFooter />
      </div>
    )}
  </LayoutDefault>
)
