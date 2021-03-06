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

const memoryShareURL = (intl, memory) => `${intl.formatMessage({
  id: 'global--home.vivos-em-nos.link.site',
  defaultMessage: 'https://vivosemnos.org',
})}/${string.slugify(memory.victimName)}`

const memoryShareText = (intl, memory) => intl.formatMessage({
  id: 'global--share.default.text',
  defaultMessage:
    'Veja aqui a homenagem para {victimName} e tantos outros ' +
    'que seguem #VivosEmNós: ',
}, {
  victimName: memory.victimName,
})

export default ({ memory, comments, assets, loading, intl }) => (
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
            <div className="header--victim-remember-text">
              <FormattedMessage
                id="components--memory-form.section--about-victim.victim-remember-text"
                defaultValue="Quando eu penso em {victimName}, eu me lembro de"
                values={{ victimName: memory.victimName }}
              />
              ...
            </div>
            {memory.victimRememberText}
          </Quote>
        </section>

        {!assets || !assets.length ? null : (
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
              {assets
                .filter(asset => asset.assetType === 'image')
                .map((asset, index) => (
                  <div className="column column is-one-third">
                    <img
                      src={`${process.env.SERVER_DOMAIN}${asset.assetUrl}`}
                      alt={`asset-${index}`}
                    />
                  </div>
                ))
              }
            </div>
          </SectionPrimary>
        )}

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
            href={memoryShareURL(intl, memory)}
          />
          <ShareTwitterButton
            className="share-button"
            href={memoryShareURL(intl, memory)}
            text={memoryShareText(intl, memory)}
          />
          {!detect.mobile ? <i /> : (
            <ShareWhatsappButton
              className="share-button"
              text={`${memoryShareText(intl, memory)} ${memoryShareURL(intl, memory)}`}
            />
          )}
        </SectionPrimary>

        {!comments || !comments.length ? null : (
          <SectionPrimary
            className="section--memory-comments"
            header={
              <SectionHeader
                hideBorder
                title={
                  <FormattedMessage
                    id="pages--memory-victim.section--comments.header"
                    defaultValue="Comentários"
                  />
                }
              />
            }
          >
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
        )}

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
      </div>
    )}
  </LayoutDefault>
)
