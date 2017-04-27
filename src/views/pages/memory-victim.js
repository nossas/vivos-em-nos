import { h } from 'preact' /** @jsx h */
import { Header, LayoutDefault } from '../tags/layout'
import { TopBar } from '../components'

export default () => (
  <LayoutDefault>
    <Header>
      <TopBar />
    </Header>
    <div className='page pages--memory-victim'>
      victim memory page
    </div>
  </LayoutDefault>
)
