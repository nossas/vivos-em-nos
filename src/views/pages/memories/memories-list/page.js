import { h } from 'preact' /** @jsx h */
import { Link } from 'preact-router'
import { FormattedMessage } from 'react-intl'
import { Header, LayoutDefault } from '~src/views/layout/layout'
import {
  ButtonPrimary,
  ButtonOutline,
  MemorySummary,
  Quote,
  Silhouette,
  TopBar,
} from '~src/views/components'
import * as string from '~src/utils/string'
import * as paths from '~src/paths'

export default ({ loading, allMemories, nextPage, totalCount }) => (
  <LayoutDefault>
    <Header>
      <TopBar />
    </Header>

    <section className="page pages--memories-list">
      <header>
        <Silhouette variation="blue-2" className="variation-blue-2" />
        <h1 className="title">
          <FormattedMessage
            id="page--memories-list.title"
            defaultMessage="Veja todas as homenagens"
          />
        </h1>
        <h2 className="subtitle">
          <FormattedMessage
            id="page--memories-list.subtitle"
            defaultMessage="Mural com todas as vítimas de homicídios na América Latina."
          />
        </h2>
      </header>

      <article className="columns is-multiline">
        {!loading && allMemories.length && allMemories.map(memory => (
          <div className="column is-tablet is-one-third">
            <MemorySummary
              name={memory.victimName}
              owner={memory.ownerFirstName}
              birthYear={memory.victimBornAt}
              deathYear={memory.victimDeadAt}
              description={memory.victimHistory}
              image={`${process.env.SERVER_DOMAIN}${memory.victimPhoto}`}
              imageWidth="220px"
              imageHeight="180px"
              imageAlignmentLeft={0}
              distanceY="100px"
              distanceX="30%"
              width="63%"
            />
            <Quote>
              {memory.victimRememberText}
            </Quote>
            <div className="container--button">
              <ButtonOutline
                TagName={Link}
                href={paths.memory(string.slugify(memory.victimName))}
              >
                <FormattedMessage
                  id="page--memories-list.see-memory"
                  defaultMessage="Ver homenagem"
                />
              </ButtonOutline>
            </div>
          </div>
        ))}
      </article>

      <footer>
        <Silhouette variation="1" className="variation-1 is-hidden-mobile" />
        {allMemories.length < totalCount && (
          <ButtonPrimary onClick={() => { nextPage() }}>
            <FormattedMessage
              id="page--memories-list.see-more-memories"
              defaultMessage="Ver mais homenagens"
            />
          </ButtonPrimary>
        )}
      </footer>
    </section>
  </LayoutDefault>
)
