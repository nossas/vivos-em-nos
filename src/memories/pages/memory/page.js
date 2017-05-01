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
  ShareWhatsappButton,
  Silhouette,
  TopBar,
} from '../../../views/components'
import { MemoryCommentsForm } from '../../components'
import * as mocks from '../../../__tmp/mocks'
import * as detect from '../../../utils/detect'

const memoryMock = mocks.memories[1]

export default ({ id, memory, comments, loading }) => (
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
            {memoryMock.gallery && memoryMock.gallery.map((image, index) => (
              <img src={image} alt={`gallery-${index}`} />
            ))}
          </div>
        </section>

        <SectionPrimary
          className="section--share"
          header={<SectionHeader title="Compartilhe" hideBorder />}
        >
          <ShareFacebookButton
            className="share-button"
            href="https://vivosemnos.org/"
          />
          <ShareTwitterButton
            className="share-button"
            href="https://vivosemnos.org/"
            text={
              '#VivosEmNós quer usar a memória como ferramenta para mudança. Se você conhece ' +
              'alguém que teve a sua história interrompida pela violência, crie aqui uma página ' +
              'de homenagem para se juntar à luta por mais respeito à vida.'
            }
          />
          {!detect.mobile ? <i /> : (
            <ShareWhatsappButton
              className="share-button"
              text="https://vivosemnos.org/"
            />
          )}
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
          <MemoryCommentsForm memoryId={id} />
        </SectionPrimary>

        <SectionPrimary className="section--memory-comments">
          {comments.map(comment => (
            <div className="block--memory-comment">
              <div className="commenter--name">
                {comment.name}
              </div>
              <div className="commenter-comment">
                {comment.comment}
              </div>
            </div>
          ))}
        </SectionPrimary>

        <OrnamentPageFooter />
      </div>
    )}
  </LayoutDefault>
)
