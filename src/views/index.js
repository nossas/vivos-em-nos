import { h } from 'preact' /** @jsx h */
import { Router } from 'preact-router'
import { Provider } from 'preact-redux'
import { ApolloProvider } from 'react-apollo'

import store, { client } from '../store'
import Home from './pages/home'
import Error404 from './pages/errors/404'
import { Memory, MemoryCreate } from '../memories/pages'

// track pages on route change
const onChange = ({ url }) => {
  // eslint-disable-next-line
  window.ga && ga('send', 'pageview', url)
  window.scrollTo(0, 0)
}

export default (
  <Provider store={store}>
    <ApolloProvider store={store} client={client}>
      <Router onChange={onChange}>
        <Home path="/" />
        <Memory path="/memory/:id" />
        <MemoryCreate path="/memory" />
        <Error404 default />
      </Router>
    </ApolloProvider>
  </Provider>
)
