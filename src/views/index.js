import { h } from 'preact' /** @jsx h */
import { IntlProvider, addLocaleData } from 'react-intl'
import { Router } from 'preact-router'
import { Provider } from 'preact-redux'
import { ApolloProvider } from 'react-apollo'
import pt from 'react-intl/locale-data/pt'
import es from 'react-intl/locale-data/es'
import en from 'react-intl/locale-data/en'

import * as locales from '~src/intl/locale-data'
import { scrollStrategy } from '~src/utils/navigation'
import store, { client } from '../store'
import Home from './pages/home'
import Error404 from './pages/errors/404'
import { Memory, MemoryCreate } from '../memories/pages'

addLocaleData([...pt, ...es, ...en])

// Define user's language. Different browsers have the user locale defined
// on different fields on the `navigator` object, so we make sure to account
// for these different by checking all of them
const language = window.defaultLanguage

// Split locales with a region code
const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0]

// Try full locale, fallback to locale without region code, fallback to en
const messages = (
  locales[languageWithoutRegionCode] ||
  locales[language] ||
  locales.default
)

// track pages on route change
const onChange = ({ url }) => {
  // eslint-disable-next-line
  window.ga && ga('send', 'pageview', url)
  scrollStrategy()
}

export default (
  <IntlProvider locale={language} messages={messages}>
    <Provider store={store}>
      <ApolloProvider store={store} client={client}>
        <Router onChange={onChange}>
          <Home path="/" />
          <MemoryCreate path="/memory" />
          <Memory path="/:slug" />
          <Error404 path="/404" />
          <Error404 default />
        </Router>
      </ApolloProvider>
    </Provider>
  </IntlProvider>
)
