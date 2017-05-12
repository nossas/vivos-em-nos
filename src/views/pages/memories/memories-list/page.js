import { h } from 'preact' /** @jsx h */
import { Header, LayoutDefault } from '~src/views/layout/layout'
import {
  ButtonOutline,
  MemorySummary,
  Quote,
  Silhouette,
  TopBar,
} from '~src/views/components'
import * as detect from '~src/utils/detect'
// import * as string from '~src/utils/string'

// const memoryShareURL = (intl, memory) => `${intl.formatMessage({
//   id: 'global--home.vivos-em-nos.link.site',
//   defaultMessage: 'https://vivosemnos.org',
// })}/${string.slugify(memory.victimName)}`

// const memoryShareText = (intl, memory) => intl.formatMessage({
//   id: 'global--share.default.text',
//   defaultMessage:
//     '{victimName} e tantos outros seguem #VivosEmNós e essa página ' +
//     'é em sua homenagem. Veja aqui',
// }, {
//   victimName: memory.victimName,
// })

export default ({ memory, loading }) => (
  <LayoutDefault>
    <Header>
      <TopBar />
    </Header>

    {loading ? <div /> : (
      <div className="page pages--memories-list">
        <div className="columns is-multiline">
          {Array(5).fill('').map(() => (
            <div className="column is-tablet is-one-third">
              <MemorySummary
                name={'Marina'}
                owner={'Gabriel'}
                birthYear={'1990'}
                deathYear={'2015'}
                description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ergo in iis adolescenti'}
                image={`${process.env.SERVER_DOMAIN}${'/s3/uploads/adventure-time.gif'}`}
                imageWidth="220px"
                imageHeight="180px"
                imageAlignmentLeft={0}
                distanceY="100px"
                distanceX="30%"
                width="63%"
              />
              <Quote>
                <div className="header--victim-remember-text">
                  Quando eu penso em {'memory.victimName'} eu lembro de...
                </div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ergo in iis adolescentibus bonam spem esse dicemus et magnam indolem, quos suis commodis inservituros et quicquid ipsis expediat facturos arbitrabimur? Ergo ita: non posse honeste vivi, nisi honeste vivatur? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ergo in iis adolescentibus bonam spem esse dicemus et magnam indolem, quos suis commodis inservituros et quicquid ipsis expediat facturos arbitrabimur? Ergo ita: non posse honest
              </Quote>
              <div className="container--button">
                <ButtonOutline>Ver homenagem</ButtonOutline>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </LayoutDefault>
)
