import { h } from 'preact' /** @jsx h */
import { Link } from 'preact-router'
import { Header, LayoutDefault } from '~src/views/layout/layout'
import {
  ButtonPrimary,
  ButtonOutline,
  MemorySummary,
  Quote,
  // Silhouette,
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
        <h1 className="title">
          VEJA TODAS AS HOMENAGENS!
        </h1>
        <h2 className="subtitle">
          Mural com todas as vítimas de homicídios na América Latina.
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
              <div className="header--victim-remember-text">
                Quando eu penso em {memory.victimName} eu lembro de...
              </div>
              {memory.victimRememberText}
            </Quote>
            <div className="container--button">
              <ButtonOutline
                TagName={Link}
                href={paths.memory(string.slugify(memory.victimName))}
              >
                Ver homenagem
              </ButtonOutline>
            </div>
          </div>
        ))}
      </article>

      {allMemories.length < totalCount && (
        <footer>
          <ButtonPrimary onClick={() => { nextPage() }}>
            Ver mais homenagens
          </ButtonPrimary>
        </footer>
      )}
    </section>
  </LayoutDefault>
)
