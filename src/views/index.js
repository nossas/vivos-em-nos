import { h } from 'preact' /** @jsx h */
import { Router } from 'preact-router'
import { Provider } from 'preact-redux'
import { ApolloProvider } from 'react-apollo'

import store, { client } from '../store'
import Home from './pages/home'
import Article from './pages/article'
import Error404 from './pages/errors/404'
import Credit from './pages/credit'
import Blog from './pages/blog'
import { MemoryCreate, MemoryVictim } from '../memories/pages'

// track pages on route change
// eslint-disable-next-line
const onChange = obj => window.ga && ga('send', 'pageview', obj.url)

export default (
  <Provider store={store}>
    <ApolloProvider store={store} client={client}>
      <Router onChange={onChange}>
        <Home path="/" />
        <Blog path="/blog" />
        <MemoryCreate path="/homenagem" />
        <MemoryVictim path="/homenagem/:id" />
        <Article path="/blog/:title" />
        <Credit path="/credit" />
        <Error404 default />
      </Router>
    </ApolloProvider>
  </Provider>
)
