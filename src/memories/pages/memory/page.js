import { h } from 'preact' /** @jsx h */
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

export default ({ id, memory, comments, assets, loading }) => (
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
            imageAlignment="right"
            baseFontSize="16px"
            distanceY="84px"
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
          <div className="gallery columns is-multiline is-desktop">
            {assets &&
              assets
                .filter(asset => asset.assetType === 'image')
                .map((asset, index) => (
                  <img
                    className="column column is-one-third"
                    src={`${process.env.SERVER_DOMAIN}${asset.assetUrl}`}
                    alt={`asset-${index}`}
                  />
                ),
              )
            }
          </div>
        </section>

        <SectionPrimary
          className="section--share"
          header={<SectionHeader title="Compartilhe" hideBorder />}
        >
          <ShareFacebookButton
            className="share-button"
            href={`https://vivosemnos.org/memory/${memory.id}`}
          />
          <ShareTwitterButton
            className="share-button"
            href={`https://vivosemnos.org/memory/${memory.id}`}
            text={`Uma homenagem para @ ${memory.victimName} `}
          />
          {!detect.mobile ? <i /> : (
            <ShareWhatsappButton
              className="share-button"
              text={
                `Uma homenagem para @ ${memory.victimName} ` +
                `https://vivosemnos.org/memory/${memory.id}`
              }
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
      </div>
    )}
  </LayoutDefault>
)
