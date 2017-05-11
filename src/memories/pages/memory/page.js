import { h } from 'preact' /** @jsx h */
import { FormattedMessage } from 'react-intl'
import { Header, LayoutDefault } from '~src/views/layout/layout'
import {
  MemorySummary,
  Quote,
  SectionHeader,
  SectionPrimary,
  ShareFacebookButton,
  ShareTwitterButton,
  ShareWhatsappButton,
  Silhouette,
  TopBar,
} from '~src/views/components'
import { MemoryCommentsForm } from '~src/memories/components'
import * as detect from '~src/utils/detect'
import * as string from '~src/utils/string'

export default ({ memory, comments, assets, loading }) => (
  <LayoutDefault>
    <Header>
      <TopBar />
    </Header>

    {loading ? <div /> : (
      <div className="page pages--memory-victim">
        <section className="section--victim-data">
          <MemorySummary
            name={memory.victimName}
            owner={memory.ownerFirstName}
            birthYear={memory.victimBornAt}
            deathYear={memory.victimDeadAt}
            description={memory.victimHistory}
            image={`${process.env.SERVER_DOMAIN}${memory.victimPhoto}`}
            imageWidth="223px"
            imageHeight="179px"
            imageAlignmentRight={detect.mobile ? 0 : undefined}
            imageAlignmentLeft={!detect.mobile ? 190 : undefined}
            baseFontSize="16px"
            distanceY="140px"
            width="80%"
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
        </section>
        <SectionPrimary
          className="section--gallery"
          header={
            <SectionHeader
              hideBorder
              title={
                <FormattedMessage
                  id="pages--memory-victim.section--gallery.header"
                  defaultValue="Galeria de imagens"
                />
              }
            />
          }
        >
          <div className="gallery columns is-multiline is-desktop">
            {assets &&
              assets
                .filter(asset => asset.assetType === 'image')
                .map((asset, index) => (
                  <div className="column column is-one-third">
                    <img
                      src={`${process.env.SERVER_DOMAIN}${asset.assetUrl}`}
                      alt={`asset-${index}`}
                    />
                  </div>
                ),
              )
            }
          </div>
        </SectionPrimary>

        <SectionPrimary
          className="section--share"
          header={
            <SectionHeader
              hideBorder
              title={
                <FormattedMessage
                  id="pages--memory-victim.section--share.header"
                  defaultValue="Compartilhe"
                />
              }
            />
          }
        >
          <ShareFacebookButton
            className="share-button"
            href={`https://vivosemnos.org/${string.slugify(memory.victimName)}`}
          />
          <ShareTwitterButton
            className="share-button"
            href={`https://vivosemnos.org/${string.slugify(memory.victimName)}`}
            text={`Acabei de criar uma homenagem para ${memory.victimName}. Confira em `}
          />
          {!detect.mobile ? <i /> : (
            <ShareWhatsappButton
              className="share-button"
              text={
                `Acabei de criar uma homenagem para ${memory.victimName}. Confira em` +
                `https://vivosemnos.org/memory/${string.slugify(memory.victimName)}`
              }
            />
          )}
        </SectionPrimary>

        <SectionPrimary
          id="comments"
          className="section--known-victim"
          header={
            <SectionHeader
              title={
                <FormattedMessage
                  id="pages--memory-victim.section--known-victim.header"
                  defaultValue="Quer contribuir para essa homenagem?"
                />
              }
              subtitle={
                <FormattedMessage
                  id="pages--memory-victim.section--known-victim.header.subtitle"
                  defaultValue="Conte aqui também a sua memória"
                />
              }
            />
          }
        >
          <MemoryCommentsForm memoryId={memory.id} victimName={memory.victimName} />
        </SectionPrimary>

        <SectionPrimary className="section--memory-comments">
          {comments.map(comment => (
            <div className="block--memory-comment">
              <div className="commenter--name">
                {comment.name}
              </div>
              <div className="commenter--comment">
                {comment.comment}
              </div>
            </div>
          ))}
        </SectionPrimary>
      </div>
    )}
  </LayoutDefault>
)
